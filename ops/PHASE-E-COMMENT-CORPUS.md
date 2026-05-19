# PHASE E · Comment Corpus Pull · BLOCKED

The plan calls for using `tiktok_research` + `instagram_research` MCP tools to pull comment corpora across 4 niches (peptides, gym, looksmaxx, girl-glow) and synthesize them into scriptwriter voice sheets.

**Status: BLOCKED.** The `tiktok_research` and `instagram_research` MCP servers are not currently connected to this Claude Code instance. They appear in the master plan but are not in the live MCP server list.

---

## To unblock

Operator action: configure the MCP servers in `~/.claude.json` (or equivalent).

```jsonc
{
  "mcpServers": {
    "tiktok-research": {
      "command": "...",
      "args": [...]
    },
    "instagram-research": {
      "command": "...",
      "args": [...]
    }
  }
}
```

Vendor research: which MCP server packages expose TikTok + IG search + comment fetching. As of 2026-05-19 the strongest candidates are the Apify MCP wrappers around `apify/tiktok-scraper` and `apify/instagram-comment-scraper`.

Alternative path: scrape directly via Apify actors triggered from `agentic-automation` toolkit, write to `comment-corpus/` JSON files, then feed back into Claude in a follow-up session for pattern extraction.

---

## Once unblocked · execution checklist

1. Pull corpus per niche × query (28 total queries × 50 posts × ~50 comments per post = ~70K rows).
2. Save under `C:/_Forge/Compounds/Peppu/comment-corpus/<niche>/<query>.json`.
3. Aggregate into voice sheets at `~/.claude/projects/C---Forge-Compounds-Peppu/memory/reference_scriptwriter_voice_sheets.md`:
   - educator voice (peptides + gym bridge)
   - peppumaxxing voice (looksmaxx + identity-coded)
   - shitpost voice (cultural-remix-absurdist)
4. Per voice extract: vocabulary list, format patterns, banned phrases, viral hooks, recurring objections.
5. Feed the voice sheets back into Phase F script generation.

---

## Why this matters

Scripts written from imagination rank low. Scripts written from tribal vocabulary the audience already uses rank high. The corpus IS the script — it dictates word choice, format, and hook style. Skipping E and writing F from imagination wastes the F phase.

The 90 scripts in `scripts-30day/` shipped this round are **template-only** — they ship the structure and hook patterns, but the vocabulary tuning depends on Phase E corpus extraction.
