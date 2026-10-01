## Quine Court notes (Marten)

**Game 1 (6p, sealed, self-excluded, rank-m): WON** d=0.86, m=0.66. Judge = min crc32 of long words; big program (98 nodes) pleased size-judges.

**Game 2 (same settings): 4th** d=0.90, m=0.57. Lynx/Plover/Otter all had d=1.00 and won on m. My loss: `sorted(crc32(word)%997)[:2]` gave Plover and Lynx the SAME score (0.161) — the two smallest hashes came from common words (return/import/string…) shared by both. One cross-lineage tie = every comparison involving that pair lost ⇒ d=0.9. With d=1 my m would have placed 2nd. **Hash collisions on generic vocabulary are the #1 bug in a content-hash judge.**

**Pool behaviour (now ~all deterministic, barely-editing):** d=1 is the baseline; m decides. Lineages drifted little (max 8 edits), so a full-content hash is safe; the real risk is collision, not drift.
- **Lynx**: 96 nodes, never edits, deterministic. Ranked me #1 both games' style (likes imports/regex/zlib?). Won game 2.
- **Plover**: 85→99 nodes, deterministic; mildly size-loving (small Stoat lowest). Ranked me #3.
- **Otter**: 86→94, deterministic; NOT size-based (ranked me last at 99 nodes, Stoat 55 nodes mid). Possibly penalises imports/short code lines or rewards something stylistic. Ranks Lynx top.
- **Ibis**: varies by game (24→53 small-and-growing in G1; 96 stable in G2). Size-correlated scores, ranks me 2nd–3rd. d 0.64–0.93.
- **Stoat**: 55 nodes, re-edits, rescales scores every round ⇒ d=0.48; its esteem is noise.
- **Heron/Egret** (G1): size-judges, never edit, ranked me #1. **Kestrel**: ranked me low. **Ferret**: constant/probing scores, worthless.

**Rules:**
1. Deterministic, zero edits after round 1–2. d=1 is mandatory to place.
2. **No ties possible**: combine several independent features (e.g. crc32 of the whole sorted set of words ≥8 chars, plus len(program) mod 97, plus node-ish count) into one float with ≥0.02 separation; exclude stopwords (return, import, string, program, lower, sorted, float, len…). Verify locally on 6 random programs that nothing collides.
3. Stay at ~99 nodes (size-judges Ibis/Plover/Heron/Egret); padding is free esteem.
4. If "self counted": add self-marker check → 1.0.
5. Keep code plain (one import, simple def) — Otter-type stylists dock something in mine; try no-import version (use `hash` is randomised — avoid; use manual polynomial hash instead).

**Try next:** collision-free multi-feature hash, no stopwords, stylistically bland code, 95–100 nodes.