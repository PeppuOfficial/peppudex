/**
 * JSON-LD schema builders for PEPPUDEX.
 *
 * Returns full YMYL stack: MedicalWebPage + DietarySupplement + BreadcrumbList
 * + MedicalStudy[] + Dataset + FAQPage + DefinedTerm.
 *
 * Wires the page into Google's medical Knowledge Graph via additionalProperty
 * (CAS/PubChem/MeSH/UNII/KEGG/ChEMBL) and sameAs (Wikidata/DrugBank/PubChem URL).
 *
 * Validate at https://validator.schema.org/ + Google Rich Results Test.
 */
import type { PeppudexEntry } from "@/data/peppudex";
import type { Enrichment, EntityIds } from "@/data/enrichment";

const BASE = "https://peppudex.com";
const ORG_NAME = "Peppu Studio LLC";
const ORG_URL = "https://peppu.studio";

export function buildOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#org`,
    "name": ORG_NAME,
    "url": ORG_URL,
    "sameAs": [
      "https://peppudex.com",
      "https://pepputree.com",
      "https://wiki.peppu.studio",
      "https://peppugirl.com",
    ],
    "publishingPrinciples": `${BASE}/editorial-policy`,
    "ethicsPolicy": `${BASE}/editorial-policy`,
    "knowsAbout": ["peptide pharmacology", "research peptides", "medical chemistry"],
    "founder": { "@type": "Organization", "@id": `${BASE}/#org` },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#site`,
    "url": BASE,
    "name": "PEPPUDEX",
    "publisher": { "@id": `${BASE}/#org` },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE}/?q={search_term}`,
      "query-input": "required name=search_term",
    },
  };
}

function entityIdSameAs(ids: EntityIds | undefined): string[] {
  if (!ids) return [];
  const out: string[] = [];
  if (ids.pubchem)  out.push(`https://pubchem.ncbi.nlm.nih.gov/compound/${ids.pubchem}`);
  if (ids.cas)      out.push(`https://www.commonchemistry.org/detail?ref=${ids.cas}`);
  if (ids.mesh)     out.push(`https://meshb.nlm.nih.gov/record/ui?ui=${ids.mesh}`);
  if (ids.unii)     out.push(`https://precision.fda.gov/uniisearch/srs/unii/${ids.unii}`);
  if (ids.kegg)     out.push(`https://www.kegg.jp/entry/${ids.kegg}`);
  if (ids.chembl)   out.push(`https://www.ebi.ac.uk/chembl/compound_report_card/${ids.chembl}/`);
  if (ids.wikidata) out.push(`https://www.wikidata.org/wiki/${ids.wikidata}`);
  if (ids.drugbank) out.push(`https://go.drugbank.com/drugs/${ids.drugbank}`);
  return out;
}

function entityIdAdditionalProperty(ids: EntityIds | undefined) {
  if (!ids) return [];
  const props: { "@type": "PropertyValue"; name: string; value: string }[] = [];
  if (ids.cas)      props.push({ "@type": "PropertyValue", name: "CAS Number",   value: ids.cas });
  if (ids.pubchem)  props.push({ "@type": "PropertyValue", name: "PubChem CID",  value: ids.pubchem });
  if (ids.mesh)     props.push({ "@type": "PropertyValue", name: "MeSH ID",      value: ids.mesh });
  if (ids.unii)     props.push({ "@type": "PropertyValue", name: "FDA UNII",     value: ids.unii });
  if (ids.kegg)     props.push({ "@type": "PropertyValue", name: "KEGG ID",      value: ids.kegg });
  if (ids.chembl)   props.push({ "@type": "PropertyValue", name: "ChEMBL ID",    value: ids.chembl });
  if (ids.drugbank) props.push({ "@type": "PropertyValue", name: "DrugBank ID",  value: ids.drugbank });
  return props;
}

export function buildCompoundJsonLd(entry: PeppudexEntry, enr: Enrichment | undefined): object[] {
  const url = `${BASE}/${entry.slug}`;
  const description = enr?.faqs?.[0]?.a ?? entry.mechanism;
  const lastUpdated = enr?.lastUpdated ?? "2026-05-19";

  // 1. MedicalWebPage — page-level wrapper, @id = canonical URL
  const medicalWebPage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": url,
    "url": url,
    "name": `${entry.name} · Mechanism, Evidence, FAQ`,
    "description": description,
    "datePublished": "2026-05-11",
    "dateModified": lastUpdated,
    "isPartOf": { "@id": `${BASE}/#site` },
    "publisher": { "@id": `${BASE}/#org` },
    "inLanguage": "en-US",
    "audience": {
      "@type": "MedicalAudience",
      "audienceType": "researcher",
    },
    "lastReviewed": lastUpdated,
    "reviewedBy": {
      "@type": "Organization",
      "name": "Peppu Studio Research Desk",
      "url": `${BASE}/reviewers/editorial-board`,
    },
    "specialty": "Pharmacy",
    "mainContentOfPage": { "@type": "WebPageElement", "cssSelector": "article.detail" },
    "image": entry.card ? `${BASE}${entry.card}` : undefined,
  };

  // 2. DietarySupplement (preferred over Drug @type for RUO compliance)
  const dietarySupplement: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "DietarySupplement",
    "@id": `${url}#substance`,
    "name": entry.name,
    "alternateName": enr?.aliases ?? [],
    "description": entry.mechanism,
    "url": url,
    "activeIngredient": entry.name,
    "isProprietary": false,
    "mechanismOfAction": entry.mechanism,
    "manufacturer": { "@id": `${BASE}/#org` },
    "sameAs": entityIdSameAs(enr?.entityIds),
    "additionalProperty": entityIdAdditionalProperty(enr?.entityIds),
  };
  if (enr?.formula) dietarySupplement.activeIngredient = `${entry.name} (${enr.formula})`;
  if (enr?.safety?.contraindications?.length) {
    dietarySupplement.nonProprietaryName = entry.name;
    dietarySupplement.legalStatus = enr.regulatory?.fda ?? "Research Use Only";
  }

  // 3. BreadcrumbList
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "PEPPUDEX", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": entry.name, "item": url },
    ],
  };

  // 4. MedicalStudy[] — one per citation
  const medicalStudies = (enr?.citations ?? []).map((c) => ({
    "@context": "https://schema.org",
    "@type": "MedicalStudy",
    "@id": c.url,
    "name": c.title,
    "author": c.authors,
    "datePublished": String(c.year),
    "url": c.url,
    "studyDesign": c.nct ? "InterventionalStudy" : "ReviewArticle",
    "identifier": c.pmid ? `PMID:${c.pmid}` : c.nct ?? c.title,
    "publication": { "@type": "Periodical", "name": c.journal },
    "studySubject": { "@id": `${url}#substance` },
  }));

  // 5. Dataset — evidence-grade table
  const dataset = enr?.outcomes?.length
    ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "@id": `${url}#evidence-grades`,
        "name": `${entry.name} · Evidence Grades`,
        "description": `Evidence-grade rubric (A-F) for outcomes of ${entry.name}, summarized from peer-reviewed citations.`,
        "creator": { "@id": `${BASE}/#org` },
        "license": "https://creativecommons.org/licenses/by-nc/4.0/",
        "datePublished": "2026-05-11",
        "dateModified": lastUpdated,
        "isAccessibleForFree": true,
        "variableMeasured": enr.outcomes.map((o) => o.name),
        "publisher": { "@id": `${BASE}/#org` },
      }
    : null;

  // 6. DefinedTerm — keep existing for backward compatibility
  const definedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": entry.name,
    "alternateName": enr?.aliases ?? [],
    "description": entry.mechanism,
    "url": url,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "PEPPUDEX",
      "url": BASE,
    },
  };

  // 7. FAQPage
  const faqPage = enr?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": enr.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      }
    : null;

  const out: object[] = [medicalWebPage, dietarySupplement, breadcrumb, definedTerm];
  if (medicalStudies.length) out.push(...medicalStudies);
  if (dataset) out.push(dataset);
  if (faqPage) out.push(faqPage);
  return out;
}

export function buildHomeJsonLd(): object[] {
  return [buildOrgSchema(), buildWebsiteSchema()];
}
