# PEPPUDEX · LAUNCH-WEEK DISTRIBUTION

Operator-run, hand-posted distribution plan for the week of 2026-06-01. Reddit · HackerNews · ProductHunt · IndieHackers. ZERO paid ads (Meta / Google / TikTok ban peptide content · paid attempts torch ad accounts immediately).

> **Why hand-posted:** all four platforms detect and penalize automation. Mod teams ban suspected bot patterns within 24h. Operator posts from their own warmed account using a brand-aligned identity, NEVER the real operator name.
> **Cadence rule:** spread launch across the full week. Front-loading one day looks coordinated and flags spam-detection on every platform.

---

## HARD RULES (READ FIRST · APPLY EVERY POST)

1. **Reddit anti-spam:** never post the same link in 2 subs within 24h. Reddit's auto-mod cross-references URLs. Same-day double-post = shadowban risk.
2. **9-to-1 rule:** if you've posted < 9 comments on a sub for every 1 of your own link posts, expect mod removal. Build comment karma in target subs in the 14 days BEFORE launch.
3. **One link per post:** never paste 2 URLs in the body. Mods read this as spam.
4. **Identity:** brand handle `Peppu` only. NEVER use the operator's real name in usernames, bios, signatures, or screenshots. NEVER mention `I'm deaf` or any operator personal detail (per the no-disclosure rule).
5. **Disclosure:** if a sub requires self-promotion tagging, comply. `Disclosure: I built this` is fine. NEVER hide the build relationship · honesty survives mod review, dishonesty doesn't.
6. **Screenshots:** strip metadata before uploading. Use a clean OS profile without browser-stored real-name autofills visible.
7. **No paid ads. Anywhere. Ever.** Meta / Google / TikTok all ban peptide ads. ANY paid attempt risks the entire ad-account network.
8. **Mod outreach first:** for r/Peptides + r/biohackers, message the mod team 48-72h BEFORE posting to ask permission. This is the difference between a sticky and a removal.

---

## TIMELINE

| Day | Date | Channel | Asset |
|---|---|---|---|
| T-14 to T-1 | 2026-05-18 to 2026-05-31 | Reddit · warm-up only | comments + sub-rules study |
| T-2 | 2026-05-30 | Mod modmails | r/Peptides + r/biohackers permission asks |
| T-0 | 2026-06-01 (Mon · launch) | Reddit · r/Peptides | `/calculator` post |
| T+1 | 2026-06-02 (Tue) | Reddit · r/PeptideGuide | `/calculator` (different framing) |
| T+1 | 2026-06-02 (Tue) | HackerNews | Show HN |
| T+2 | 2026-06-03 (Wed) | Reddit · r/biohackers | `/tools/stack-builder` |
| T+3 | 2026-06-04 (Thu) | Reddit · r/biohackers (DIFFERENT day) | `/tools/half-life-chart` |
| T+3 | 2026-06-04 (Thu) | ProductHunt | full launch (12:01am PT) |
| T+4 | 2026-06-05 (Fri) | Reddit · r/Peptides | `/tools/half-life-chart` |
| T+4 | 2026-06-05 (Fri) | IndieHackers | "built peppudex" post |
| T+5 | 2026-06-06 (Sat) | Reddit · r/Nootropics | `/reports/regulatory-status-matrix` |

> **Spacing rule check:** no sub gets two posts within 48h. r/Peptides posts are T+0 + T+4 (4 days apart, safe). r/biohackers is T+2 + T+3 with DIFFERENT URLs (still risky · if mod flags, skip T+3 and shift to r/StackAdvice).

---

## REDDIT · WARM-UP (T-14 to T-1)

Before any post, the posting account needs comment karma in each target sub. Operator-run · ~10 min/day.

1. Read each target sub's rules + "wiki" link. Some subs require minimum account age (90 days) or karma threshold (500+).
2. Post 5-10 genuine comments per sub over 14 days. Genuine = helpful, on-topic, NOT mentioning peppudex.com.
3. Track comment karma per sub in a simple spreadsheet so you know which subs you're "ready" for at launch.
4. If a sub auto-removes your comments, the sub has an account-age / karma filter. Either wait or accept that sub won't accept the launch post.

**Target subs to warm up:**
- r/Peptides
- r/PeptideGuide
- r/biohackers
- r/Nootropics
- r/StackAdvice (verify still active before relying on it)
- r/longevity (bonus · long-tail)

---

## REDDIT POSTS · COPY TEMPLATES

Each template is a starting point. **DO NOT post verbatim across multiple subs · vary 30%+ of the wording each time or auto-mod flags duplicates.**

### Post 1 · r/Peptides · T+0 (Mon 2026-06-01)

**Title:** Built a reconstitution calculator with shareable URLs (for tracking BAC + dosage math)

**Body:**
```
Got tired of redoing the same syringe math every time I switched a research compound · ended up building a small calculator that handles BAC volume, target dose, and unit display, then encodes everything into a shareable URL so I can ping a friend with the exact setup.

Link: https://peppudex.com/calculator

A few things I tried to get right:
· defaults to mcg/mg/IU based on the compound family
· math is shown step by step so you can sanity check
· URL params persist so you can bookmark a setup

It's part of a larger Pokedex-style reference I'm building (peppudex.com) covering ~24 research peptides · half-lives, mechanisms, citations, comparisons. The calculator works standalone though.

Feedback welcome · what would you want a tool like this to do that this one doesn't?

Disclosure: I built it. No payment, no email gate, no upsell.
```

**Expected outcome:** if it lands, 30-80 upvotes + 5-15 comments in first 24h. Engage with EVERY comment. Don't drop the link again in replies.

---

### Post 2 · r/PeptideGuide · T+1 (Tue 2026-06-02)

**Title:** Reconstitution calculator (open source math, sharable URLs)

**Body:**
```
Sharing a small tool I built for tracking BAC + dosage when switching between research compounds: https://peppudex.com/calculator

What it does:
· you enter target dose + total mg + BAC volume
· it returns syringe units (insulin pin friendly · 50u, 100u markings)
· it builds a shareable URL so you can save a setup

Why I'm posting here: a few people in this sub were asking last month about a way to share recon setups across friends without screenshots · this scratches that itch.

Built by Peppu Studio (a small WY LLC I run · research-info focus, no product pitch in the calc itself).

Open to feedback on the math or the UX.
```

---

### Post 3 · r/biohackers · T+2 (Wed 2026-06-03)

**Title:** Stack builder for research peptides (visual half-life + mechanism overlap)

**Body:**
```
Spent the last couple months researching mechanism overlap between common research peptides (BPC-157 + TB-500, GHK-Cu + collagen pathway, IPA + CJC-1295 + tesamorelin on the GH axis, etc) · turned the notes into a stack builder so you can pick 2-4 compounds and see:
· half-life overlay (visual timing chart)
· mechanism Venn (where they hit the same pathway vs different ones)
· flagged interactions
· dosing reference per compound

Link: https://peppudex.com/tools/stack-builder

Built as part of peppudex.com (Pokedex-style peptide reference · 24 compounds, comparisons, mechanism hubs). The stack builder is standalone though, no signup or paywall.

Open to feedback · especially curious if there's a stack I'm missing that you'd want pre-built.

Disclosure: I built this.
```

---

### Post 4 · r/biohackers · T+3 (Thu 2026-06-04)

> **RISK FLAG:** posting in r/biohackers two days in a row. If T+2 got mod-removed or downvoted hard, SKIP this and shift to r/StackAdvice or r/longevity.

**Title:** Half-life chart for 24 research peptides (visual reference)

**Body:**
```
Pulled half-life data for every research peptide in my reference set (BPC-157, TB-500, GHK-Cu, MOTS-c, GLP-1 family, etc) and built a visual chart you can sort + filter: https://peppudex.com/tools/half-life-chart

You can:
· sort ascending / descending
· filter by mechanism family
· click a compound to jump to its full reference page (mechanisms, citations, FAQ)

Citations are inline · primarily PubChem + ChEMBL + published studies. If you spot a half-life number that's wrong, please yell at me in the comments so I can fix it.

This is part of peppudex.com (research peptide knowledge base I built · WY LLC).
```

---

### Post 5 · r/Peptides · T+4 (Fri 2026-06-05)

**Title:** Visual half-life reference for 24 research peptides

**Body:**
```
Built a sortable half-life chart for the 24 research peptides I track most often: https://peppudex.com/tools/half-life-chart

· each compound links to its full reference (mechanisms, citations, comparisons)
· data sources cited inline
· filter by mechanism family

It's the half-life view I wished existed when I started · sharing in case it's useful. Genuinely happy to fix any numbers that look wrong to people who've been deeper in the literature.

Built by Peppu Studio. No paywall, no email gate.
```

---

### Post 6 · r/Nootropics · T+5 (Sat 2026-06-06)

**Title:** Regulatory status matrix for research peptides (US / EU / UK / AU)

**Body:**
```
Compiled a regulatory status matrix for ~24 research peptides across US, EU, UK, AU jurisdictions · including FDA approval status (where any), clinical trial phase, scheduled-substance flags, and customs notes: https://peppudex.com/reports/regulatory-status-matrix

Why I built it: kept getting the same DM from people confused about why a compound was legal to research but not to import, or approved for one indication but not another.

Sources cited inline. Updated as of mid-2026. Will refresh quarterly as approvals shift.

Part of peppudex.com (research peptide knowledge base, Peppu Studio LLC). Open to corrections from anyone closer to regulatory work than I am.
```

---

## HACKERNEWS · SHOW HN (T+1 · Tue 2026-06-02)

**Posting time:** 6-8am PT (catches morning US traffic before euro evening fades). Tuesday is statistically the highest-traffic day for Show HN.

**Title (HN char limit ~80):**
```
Show HN: Peppudex – Pokedex-style reference for research peptides
```

**Body (HN limit ~5000 chars):**
```
Hi HN. Peppudex (https://peppudex.com) is a Pokedex-style reference for ~24 research peptides. I built it because every existing peptide-info site is either a sketchy vendor catalog or a forum thread you have to spelunk.

What's in it:
· 24 compound pages with mechanism, half-life, evidence grade, citations, FAQ, and comparison links
· a reconstitution calculator with shareable URLs
· a half-life chart + a stack builder
· a regulatory status matrix across US/EU/UK/AU
· a long-form report on PubMed publication trends 2015-2026
· mechanism / condition / comparison hub pages (incretin axis, tissue repair, longevity, etc)

Tech: Next.js 15 App Router, static-rendered, all schema markup wired (MedicalWebPage, DietarySupplement, MedicalStudy, FAQPage, BreadcrumbList). Sitemaps segmented into 6 buckets. Wikidata Q-item linked in Organization sameAs. Vercel + Porkbun DNS.

Why I bothered: AI search models (Perplexity, ChatGPT search, Gemini) cite citation-rich structured sites at much higher rates than forum threads. I wanted a citation source for peptide info that an LLM could resolve to a structured entity instead of "vague Reddit thread".

What I'd love feedback on:
· half-life numbers for compounds I might have wrong (citations are inline · please push back)
· UX of the calculator vs the stack builder · do they feel like the same product or two different tools
· schema choices · is DietarySupplement the right @type or should I be reaching for something more specific

I'm a solo builder running this through a Wyoming LLC (Peppu Studio). No paid ads · this domain is regulated out of every major ad network so distribution is organic + Show HN-style only.

Happy to answer questions about the stack, the schema strategy, the moderation decisions on which compounds to include, or anything else.
```

**Comment strategy:**
- Answer every top-level comment within an hour while the post is on the front page.
- If someone challenges a half-life or mechanism claim, link the inline citation + thank them.
- Do NOT downvote critics. Mods watch this.

**Expected outcome:** 50-200 points if it gets traction. Even a "middling" Show HN (20-50 points) puts the brand in front of ~10,000 sophisticated readers + builds a permanent indexed comment thread linking to peppudex.com.

---

## PRODUCTHUNT · LAUNCH DAY (T+3 · Thu 2026-06-04)

**Launch time:** 12:01am Pacific Thursday (PH days run 12:01am PT to 11:59pm PT · Thursday gives the best leaderboard exposure window without competing with Monday/Tuesday flood).

### Pre-launch (T-7 to T-1)

1. Create / verify the `peppu` PH account. NEVER use the operator's real name. Bio: "Building Peppu Studio · research peptide knowledge base."
2. Set up a Hunter (yourself) + 2-3 Makers if collaborators exist.
3. Build the listing draft in PH's `Upcoming` section so you can collect followers BEFORE launch day:
   - **Name:** Peppudex
   - **Tagline (60 char):** Pokedex-style reference for research peptides
   - **Description:** see below
   - **Gallery:** 6-8 screenshots (calculator, stack builder, half-life chart, a compound page, the regulatory matrix, the publication trends report)
   - **Topics:** Health, Education, Reference, Open Source (if you open the data)
4. Promote the `Upcoming` page in Telegram + Discord + sister-site newsletters for 1-2 weeks before launch.

### Description copy

```
Peppudex is a Pokedex-style reference for 24 research peptides · mechanism, half-life, citations, comparisons, FAQ. Built because every other peptide-info site is either a vendor catalog or a forum spelunk.

Includes:
· reconstitution calculator with shareable URLs
· half-life chart (sortable, filterable)
· stack builder with mechanism overlap visualization
· regulatory status matrix (US/EU/UK/AU)
· long-form report on PubMed publication trends 2015-2026
· mechanism + condition hub pages

Built by Peppu Studio (Wyoming LLC). Citation-first, no paywall, no email gate.
```

### Launch-day tasks

1. 12:01am PT · post goes live. Verify the listing renders correctly.
2. 12:15am PT · post the launch in PEPPU LABS Telegram + PeppuTree Discord with the PH URL.
3. 6am-10am PT · respond to every comment within 15 minutes. Be in the chat ALL DAY.
4. Note: PH has cracked down on "vote for me" asks. Don't message people directly to upvote · the algorithm penalizes obvious vote rings.
5. End of day · post a thank-you comment summarizing feedback, regardless of placement.

**Expected outcome:** top 10 of day = ~500-1500 referral visits + permanent indexed listing. Top 5 = featured in PH daily email (~50k subscribers).

---

## INDIEHACKERS · COMMUNITY POST (T+4 · Fri 2026-06-05)

IndieHackers responds well to founder-journey framing. Lean into the "solo + Wyoming LLC + organic-only because paid is banned" angle.

**Group:** Main forum + Marketing group.

**Title:** Launched peppudex.com today · what I'd do differently building a knowledge-base SEO play

**Body:**
```
I just launched peppudex.com · a Pokedex-style reference for 24 research peptides. Built solo over ~3 months under Peppu Studio LLC (a small Wyoming LLC I formed earlier this year).

Why this post: I think there are a few non-obvious lessons in the build that might be useful for other indie hackers doing content-heavy SEO plays, especially in regulated niches.

What I'd do differently:

1. Schema first, content second. I built ~24 compound pages then went back to add MedicalWebPage + DietarySupplement + MedicalStudy + FAQPage + BreadcrumbList + DefinedTerm + Dataset markup. Should have been baked in from day one · would have saved a week of refactors.

2. Sitemap segmentation matters more than I thought. Single sitemap.xml is fine for <50 URLs · once you cross that, segment by content type (compounds, comparisons, conditions, mechanisms, etc) so GSC tells you which bucket is failing.

3. Wikidata + ORCID register early. AI search models (Perplexity, ChatGPT, Gemini) cite sites with entity-graph anchors at way higher rates. Creating a Q-item costs 30 min and lifts the entire site's authority signal.

4. Regulated niches force you to be better. Peptide content is banned from every paid ad network · Meta, Google, TikTok all block it. That forced me into a 100% organic distribution + schema + entity-graph play. In retrospect, that's the moat.

5. Three-site setup beats one. I split the brand into peppudex.com (research reference, this post), peppugirl.com (lifestyle, top-of-funnel), and peppu.studio (storefront). No keyword overlap, each ranks for its own intent cluster, internal-link graph is a triangle.

Tech: Next.js 15 App Router, fully static, Vercel hosting, Porkbun DNS. No tracking on peppudex (just self-hosted analytics).

The site: https://peppudex.com

Happy to answer questions about LLC formation in Wyoming, the schema strategy, organic-only distribution in a regulated niche, or anything else.
```

**Expected outcome:** 20-60 upvotes + 5-15 comments from other indie hackers. Less referral traffic than HN but higher quality engagement + occasional collab requests.

---

## CROSS-CHANNEL COORDINATION

### Telegram + Discord (do these EVERY launch-week day)

- Pin the freshly launched post in PEPPU LABS Telegram research community.
- Post in pepputree Discord #announcements.
- Update peppu-link bio with peppudex.com as the top link for launch week.

### Sister sites

- peppugirl.com diary post: "I helped build the peptide encyclopedia my friend made" (frame as lifestyle-side perspective, link to peppudex). Internal-link backbone.
- peppu.studio top-bar notification: "PEPPUDEX is live · peptide reference encyclopedia" linking to peppudex.com for launch week only.

### Outreach DMs

- The 3K-8K micro-influencer DM playbook (in `outreach/OUTREACH-PLAYBOOK.md`) feeds peppu.studio products, NOT peppudex. Don't cross the streams · peppudex is a non-commercial trust asset.
- BUT: if a research-focused account follows back, peppudex is the soft-introduction asset (a "here's free knowledge" link) before any product mention.

---

## METRICS · WHAT TO TRACK

Track these in a single spreadsheet for the launch-week retrospective.

| Channel | Metric | Target (week 1) |
|---|---|---|
| Reddit · all 6 posts | upvotes, comments, removals | 30-80 upvotes per post, 0 removals |
| Reddit | referral traffic from r.reddit.com | ≥500 sessions |
| HackerNews | rank, points, referral sessions | top 30 of day, ≥30 points, ≥1000 sessions |
| ProductHunt | rank, upvotes, comments | top 10 of day, ≥150 upvotes |
| IndieHackers | upvotes, comments | ≥20 upvotes |
| GSC | indexed URLs | ≥40 of ~80 indexed by T+7 |
| GSC | impressions | ≥1000 by T+7 |
| Direct traffic | sessions / day | growing T+1 through T+7 |

---

## NEVER

- Never auto-post. Every word goes through the operator's hands.
- Never post the same URL in 2 subs within 24h.
- Never use the operator's real name in any username, bio, signature, screenshot, or DM.
- Never mention `I'm deaf` or any other personal disclosure (this is a marketing surface, not the chat-form SMS disclaimer).
- Never pay for ads on Meta / Google / TikTok · all three permabann peptide content.
- Never reply to a Reddit critic with another link drop · engage with the substance, not by re-posting the URL.
- Never delete a post to "re-launch later" · Reddit auto-mods see the resubmission and flag it.
- Never use em-dashes in any post body (operator preference · use `.`, `,`, `(...)`, `·` instead).

---

## OPERATOR DECISIONS NEEDED

1. **Reddit account selection:** decide which of the warmed accounts to post from. The account should have at least 90 days of age + 500+ combined karma + comment history in the target sub. If no account meets all three for a given sub, skip that post.
2. **Mod outreach drafts:** the r/Peptides + r/biohackers mod modmails need 2 sentences each · do you want the modmail copy drafted now or improvised by the operator?
3. **PH Hunter:** if no external Hunter is recruited, the brand account self-hunts. This is fine but slightly less rank-boosting than a known Hunter.
4. **Asset prep:** ProductHunt needs 6-8 polished gallery screenshots BEFORE T-1. Confirm operator has time to prep these or schedule a Higgsfield render session.
5. **IndieHackers `founder name`:** IH requires a display name on the profile. Use `Peppu` (brand handle) · IH allows brand-style display names so this should pass moderation.
