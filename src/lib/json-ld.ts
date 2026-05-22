/**
 * JSON-LD schema builders for PEPPUDEX.
 *
 * Returns research-reference stack: WebPage + DefinedTerm + BreadcrumbList
 * + ScholarlyArticle[] + Dataset + FAQPage + ImageObject.
 *
 * Wires the compound entity into public identifiers via additionalProperty
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
    ],
    "publishingPrinciples": `${BASE}/editorial-policy`,
    "ethicsPolicy": `${BASE}/editorial-policy`,
    "knowsAbout": ["peptide pharmacology", "research peptides", "biochemical reference compounds"],
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
  const url = `${BASE}/peptides/${entry.slug}`;
  const description = enr?.faqs?.[0]?.a ?? entry.mechanism;
  const lastUpdated = enr?.lastUpdated ?? "2026-05-19";

  // 1. WebPage · page-level wrapper, @id = canonical URL.
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
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
      "@type": "Audience",
      "audienceType": "laboratory researchers",
    },
    "lastReviewed": lastUpdated,
    "reviewedBy": {
      "@type": "Organization",
      "name": "Peppu Studio Research Desk",
      "url": `${BASE}/reviewers/editorial-board`,
    },
    "mainContentOfPage": { "@type": "WebPageElement", "cssSelector": "article.detail" },
    "image": entry.card ? `${BASE}${entry.card}` : undefined,
    // SpeakableSpecification · voice-assistant readout (Google Assistant, Alexa).
    // Targets H1, body paragraphs, and first paragraph after each H2 (mechanism intro).
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".body", "h2:first-of-type + p"],
    },
  };

  // 2. DefinedTerm · canonical compound entity. Peppudex is a research
  // reference, not the storefront, so avoid Product-class schema here.
  // Avoiding DietarySupplement keeps Google from opening supplement-style
  // Product Snippet reports for
  // these pages and expects offer/image fields that belong on peppu.studio.
  const substanceTerm: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${url}#substance`,
    "name": entry.name,
    "alternateName": enr?.aliases ?? [],
    "description": entry.mechanism,
    "url": url,
    "sameAs": entityIdSameAs(enr?.entityIds),
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "PEPPUDEX",
      "url": BASE,
    },
  };
  const identifiers = entityIdAdditionalProperty(enr?.entityIds);
  if (identifiers.length) {
    substanceTerm.identifier = identifiers;
  }
  if (enr?.formula) {
    substanceTerm.termCode = enr.formula;
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

  // 4. ScholarlyArticle[] · one per citation.
  const scholarlyArticles = (enr?.citations ?? []).map((c) => ({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": c.url,
    "name": c.title,
    "author": c.authors,
    "datePublished": String(c.year),
    "url": c.url,
    "identifier": c.pmid ? `PMID:${c.pmid}` : c.nct ?? c.title,
    "isPartOf": { "@type": "Periodical", "name": c.journal },
    "about": { "@id": `${url}#substance` },
  }));

  // 5. Dataset · evidence-grade table. Google Dataset rich-results
  // require: name, description, creator (with @type+name), license,
  // datePublished, isAccessibleForFree, distribution, keywords. The
  // earlier version used @id cross-refs for creator/publisher which
  // Google's parser can fail to resolve across documents · expanded
  // inline so each Dataset is fully self-contained (GSC fix 2026-05-21).
  const dataset = enr?.outcomes?.length
    ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "@id": `${url}#evidence-grades`,
        "name": `${entry.name} · Evidence Grades`,
        "description": `Evidence-grade rubric (A-F) for outcomes of ${entry.name}, summarized from peer-reviewed citations.`,
        "url": `${url}#evidence-grades`,
        "creator": {
          "@type": "Organization",
          "name": ORG_NAME,
          "url": BASE,
        },
        "publisher": {
          "@type": "Organization",
          "name": ORG_NAME,
          "url": BASE,
        },
        "license": "https://creativecommons.org/licenses/by-nc/4.0/",
        "datePublished": "2026-05-11",
        "dateModified": lastUpdated,
        "isAccessibleForFree": true,
        "variableMeasured": enr.outcomes.map((o) => o.name),
        "keywords": [entry.name, "peptide", "evidence grade", "research reference"].concat(enr.aliases ?? []),
        "distribution": [
          {
            "@type": "DataDownload",
            "encodingFormat": "text/html",
            "contentUrl": `${url}#evidence-grades`,
          },
        ],
        "includedInDataCatalog": {
          "@type": "DataCatalog",
          "name": "PEPPUDEX Evidence Grades",
          "url": BASE,
        },
      }
    : null;

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

  // 8. ImageObject · trading-card art licensing + provenance.
  // Auto-emits for every compound that ships a card image. The
  // ImageObject Licensable badge requires acquireLicensePage AND
  // creator-as-inline-Organization (not @id ref). GSC flagged
  // peppudex with "Image Metadata structured data issues" until
  // these were added (2026-05-21).
  const imageObject = entry.card
    ? {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "@id": `${url}#card-image`,
        "contentUrl": `${BASE}${entry.card}`,
        "url": `${BASE}${entry.card}`,
        "caption": `${entry.name} · Peppudex trading card art`,
        "name": `${entry.name} card art`,
        "description": `Original trading-card art for ${entry.name}, illustrated for Peppudex.`,
        "creditText": ORG_NAME,
        "creator": {
          "@type": "Organization",
          "name": ORG_NAME,
          "url": BASE,
        },
        "copyrightHolder": {
          "@type": "Organization",
          "name": ORG_NAME,
          "url": BASE,
        },
        "copyrightNotice": `© 2026 ${ORG_NAME}`,
        "license": "https://creativecommons.org/licenses/by-nc/4.0/",
        "acquireLicensePage": `${BASE}/about`,
        "representativeOfPage": true,
      }
    : null;

  const out: object[] = [webPage, substanceTerm, breadcrumb];
  if (scholarlyArticles.length) out.push(...scholarlyArticles);
  if (dataset) out.push(dataset);
  if (faqPage) out.push(faqPage);
  if (imageObject) out.push(imageObject);
  return out;
}

export function buildHomeJsonLd(): object[] {
  return [buildOrgSchema(), buildWebsiteSchema()];
}
