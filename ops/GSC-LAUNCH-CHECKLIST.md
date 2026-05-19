# PEPPUDEX · GSC LAUNCH CHECKLIST

Operator-run, pre-launch Google Search Console + Bing Webmaster setup for `peppudex.com`. Target completion: before 2026-06-01 public launch.

> **Surface:** peppudex.com (Pokedex-style research peptide encyclopedia, 24 compound pages + category / mechanism / comparison / stack hubs)
> **DNS:** Porkbun (some Peppu zones use Cloudflare NS, peppudex.com is currently on Porkbun nameservers, double-check before adding records)
> **Owner:** Peppu Studio LLC (Wyoming)
> **Verification method:** DNS TXT (root) for both apex + www. UI-clicks. No API keys needed for verification itself.

---

## STEP 0 · PRE-FLIGHT

1. Confirm peppudex.com resolves (`curl -I https://peppudex.com` returns 200, not a parked page).
2. Confirm robots.ts is NOT blocking Googlebot. `curl https://peppudex.com/robots.txt` should show `User-agent: Googlebot` with NO blanket `Disallow: /`.
3. Confirm all 6 sitemap routes return 200:
   - `https://peppudex.com/sitemap.xml`
   - `https://peppudex.com/sitemap-compounds.xml`
   - `https://peppudex.com/sitemap-categories.xml`
   - `https://peppudex.com/sitemap-comparisons.xml`
   - `https://peppudex.com/sitemap-studies.xml`
   - `https://peppudex.com/sitemap-guides.xml`
4. Open Porkbun dashboard. Log into the peppuofficials Porkbun account (creds in vault).
5. Have a second tab open with the GSC console: https://search.google.com/search-console

**Expected outcome:** all 4 preflight checks green before touching GSC.

---

## STEP 1 · VERIFY APEX PROPERTY (https://peppudex.com)

**Method:** UI-clicks · DNS TXT · ~5-10 min propagation.

1. GSC → **Add property** → choose **URL prefix** (NOT Domain · we want separate www / apex tracking).
2. Enter `https://peppudex.com` and click **Continue**.
3. GSC will show 6 verification methods. Pick **DNS TXT record** (most durable, survives platform moves).
4. Copy the value Google gives you. It looks like `google-site-verification=AbC123xyz...` (no quotes).
5. Open Porkbun → Domains → peppudex.com → **DNS Records**.
6. Click **Add Record**:
   - Type: `TXT`
   - Host: leave blank (this means root / apex)
   - Answer: paste the full `google-site-verification=...` value
   - TTL: `600` (10 min)
7. Save. Wait ~5 min.
8. Verify propagation: `nslookup -type=TXT peppudex.com 8.8.8.8` (PowerShell: `Resolve-DnsName peppudex.com -Type TXT -Server 8.8.8.8`). You should see the verification string in the output.
9. Back in GSC, click **Verify**.

**Expected outcome:** GSC shows "Ownership verified" with a green check.

**HARD-BLOCK:** Do NOT delete the TXT record after verification. Google re-checks periodically. Leave it forever.

---

## STEP 2 · VERIFY WWW PROPERTY (https://www.peppudex.com)

We track apex and www as separate URL-prefix properties so we catch any www-served traffic and can monitor 301 health.

1. GSC → **Add property** → **URL prefix** → `https://www.peppudex.com`.
2. DNS TXT method again. Google issues a DIFFERENT token for www.
3. Porkbun → DNS Records → Add Record:
   - Type: `TXT`
   - Host: `www`
   - Answer: paste the new `google-site-verification=...` token
   - TTL: `600`
4. Save, wait 5 min, verify.

**Expected outcome:** both `https://peppudex.com` and `https://www.peppudex.com` show as verified properties in your GSC property dropdown.

---

## STEP 3 · SET PREFERRED CANONICAL (non-www)

Peppudex canonical is `https://peppudex.com` (no www). All internal links + canonicals + sitemaps must agree.

1. Confirm Vercel project for peppudex has BOTH `peppudex.com` and `www.peppudex.com` attached, with `www` set to redirect to apex (301).
2. Test: `curl -I https://www.peppudex.com` should return `301` with `Location: https://peppudex.com/`.
3. In GSC, on each property, GSC will auto-detect canonical from `<link rel="canonical">`. No manual "preferred domain" toggle exists anymore (Google retired it 2019). The 301 + canonical tag does the work.
4. Spot-check 3 pages: view-source on `https://peppudex.com/bpc-157` and confirm `<link rel="canonical" href="https://peppudex.com/bpc-157" />`.

**Expected outcome:** www property eventually shows ~0 impressions (everything funnels to apex). This is what we want.

---

## STEP 4 · SUBMIT SITEMAPS

**Property:** use the apex property (`https://peppudex.com`) for all sitemap submissions. UI-clicks.

1. GSC → left sidebar → **Sitemaps**.
2. Under "Add a new sitemap", paste each of these one by one and click **Submit**:
   1. `sitemap.xml`
   2. `sitemap-compounds.xml`
   3. `sitemap-categories.xml`
   4. `sitemap-comparisons.xml`
   5. `sitemap-studies.xml`
   6. `sitemap-guides.xml`
3. Each should show **Success** with a discovered-URLs count within 60 seconds. If status stays **Couldn't fetch**, the sitemap route is broken (re-check Step 0 #3).
4. Save a screenshot of the Sitemaps panel for the launch postmortem.

**Expected outcome:** 6 sitemaps listed as Success with total discovered URLs ≥ 60 (24 compounds + 5 stacks + 6 mechanisms + 21 conditions + 7 comparisons + 2 reports + 2 tools + static).

---

## STEP 5 · MANUAL INDEXING REQUESTS

GSC throttles to ~10-12 `Request Indexing` clicks per 24h. Spread these across launch week. **Operator must do this by hand · NO API for indexing requests at the URL-Inspection level (Indexing API is restricted to JobPosting + BroadcastEvent and using it on regular pages risks an account flag).**

### Wave 1 · Launch day (2026-06-01) · 10 URLs

Paste each URL into the top "Inspect any URL" bar, wait for the report, click **Request Indexing**.

1. `https://peppudex.com/`
2. `https://peppudex.com/calculator`
3. `https://peppudex.com/tools/half-life-chart`
4. `https://peppudex.com/tools/stack-builder`
5. `https://peppudex.com/conditions/body-composition`
6. `https://peppudex.com/conditions/tendon-ligament`
7. `https://peppudex.com/conditions/skin-aging`
8. `https://peppudex.com/conditions/cognition-research`
9. `https://peppudex.com/conditions/aging`
10. `https://peppudex.com/mechanisms/incretin-axis`

### Wave 2 · Launch day + 1 (2026-06-02) · 10 URLs

11. `https://peppudex.com/mechanisms/tissue-repair`
12. `https://peppudex.com/mechanisms/longevity`
13. `https://peppudex.com/mechanisms/nootropic`
14. `https://peppudex.com/retatrutide`
15. `https://peppudex.com/tirzepatide`
16. `https://peppudex.com/bpc-157`
17. `https://peppudex.com/ghk-cu`
18. `https://peppudex.com/nad-plus`
19. `https://peppudex.com/tb-500`
20. `https://peppudex.com/tesamorelin`

### Wave 3 · Launch day + 2 (2026-06-03) · 10 URLs

21. `https://peppudex.com/ipa-cjc1295`
22. `https://peppudex.com/mots-c`
23. `https://peppudex.com/selank`
24. `https://peppudex.com/semax`
25. `https://peppudex.com/ss-31`
26. `https://peppudex.com/5-amino-1mq`
27. `https://peppudex.com/igf-1-lr3`
28. `https://peppudex.com/pt-141`
29. `https://peppudex.com/epitalon`
30. `https://peppudex.com/aod-9604`

### Wave 4 · Launch day + 3 (2026-06-04) · 6 URLs (reports + remaining hubs)

31. `https://peppudex.com/reports/peptide-research-publication-trends-2015-2026`
32. `https://peppudex.com/reports/regulatory-status-matrix`
33. `https://peppudex.com/vs/bpc-157-vs-tb-500`
34. `https://peppudex.com/vs/retatrutide-vs-tirzepatide`
35. `https://peppudex.com/about`
36. `https://peppudex.com/editorial-policy`

**Expected outcome per request:** GSC shows "Indexing requested" toast. The URL enters Google's priority queue (typical: indexed within 1-7 days, not guaranteed).

**HARD-BLOCK:** Do NOT click Request Indexing on the same URL twice in 24h. GSC ignores duplicates and may flag the property if you spam.

---

## STEP 6 · BING WEBMASTER · IMPORT FROM GSC

UI-clicks. No separate verification needed if you use the GSC import flow.

1. Open https://www.bing.com/webmasters.
2. Sign in with the same Google account used in Step 1 (Bing supports Google SSO for the import flow).
3. Click **Import** → **Google Search Console**.
4. Authorize Bing to read your GSC properties.
5. Pick `https://peppudex.com` and click **Import**.
6. Bing will copy verification + sitemaps automatically. Confirm both apex + www properties show up.
7. Sitemaps tab → verify all 6 are listed. If any are missing, click **Submit sitemap** and paste manually.
8. Settings → Crawl Control → set crawl rate to **Bing decides** (default).

**Expected outcome:** Bing property dashboard shows both apex + www, all 6 sitemaps, 0 errors.

---

## STEP 7 · POST-VERIFY HARDENING

1. GSC → **Settings** → **Users and permissions** → add a backup email (operator's secondary account) as **Owner**. This survives if the primary Google account gets locked out.
2. GSC → **Settings** → **Crawl stats** → bookmark this page. You'll check it weekly.
3. Enable email alerts: GSC → top-right gear → **Preferences** → confirm email is set + **Send me critical issues** is on.
4. Add peppudex.com to the Aeon analytics dashboard External Analytics card (already wired, just confirm the GSC token in Vercel env is correct).

---

## STEP 8 · T+7 DAYS · POST-LAUNCH QUALITY CHECK

1. GSC → **Pages** (Indexing) → confirm at least 30 URLs are indexed. Anything fewer = something is wrong (check robots.txt + canonicals).
2. GSC → **Sitemaps** → all 6 should still show "Success". Discovered URL counts should match expected.
3. GSC → **Performance** → note Wave-1 URLs are receiving impressions. If a URL shows 0 impressions after 7 days, run URL Inspection on it.
4. GSC → **Enhancements** → check for any structured-data errors (FAQ, MedicalWebPage, DietarySupplement, Dataset, MedicalStudy, BreadcrumbList). Fix any red items same-day.
5. Bing → **Site Explorer** → confirm crawl is happening (look for non-zero "Pages crawled" in last 7 days).

---

## NEVER

- Never use the Google Indexing API on regular content pages (it's for JobPosting / BroadcastEvent only, abuse triggers manual action).
- Never set robots.txt to `Disallow: /` even temporarily on a live property. Use a noindex meta tag if you must block a single page.
- Never delete a TXT verification record after verifying. Google re-checks periodically.
- Never request indexing on the same URL more than once in 24h.
- Never paid-promote any compound page. Meta / Google / TikTok all ban peptide ads · any paid spend torches the ad account.
- Never include the operator's real name in any GSC-linked email, property name, or feedback form. Brand handle `Peppu` only.

---

## STATUS LOG

| Date | Task | Status |
|---|---|---|
| pending | Step 1 · Apex DNS TXT verification | UI |
| pending | Step 2 · WWW DNS TXT verification | UI |
| pending | Step 3 · Canonical / 301 spot-check | UI |
| pending | Step 4 · Submit 6 sitemaps | UI |
| pending | Step 5 · 36-URL manual indexing requests | UI · 4 waves |
| pending | Step 6 · Bing import from GSC | UI |
| pending | Step 7 · Backup owner + alerts | UI |
| pending | Step 8 · T+7 quality check | UI |
