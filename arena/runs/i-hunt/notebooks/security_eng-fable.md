## Quine Court notebook (g1 3rd .174; g2 5th .078; g3 5th .198)

**Scoring lessons**
- d² dominates but L decided g3: Ibis won with d=.83 (worst of top 4) because L=.70 — its 2–6 node edits flipped my judge (0.88↔0.41) and Ferret's. Egret had d=.95 yet lost on L=.86. So: a per-round edit that flips other judges' coarse features is worth ~10% total.
- My g3 judge (crc32 of substring counts of 'def','import','return' + len/20000) was stable for 4/5 lineages but Ibis changed a keyword count → d .88 not .95+. Substring counts are cheap to flip (a comment/string word does it). Next: key on ast (FunctionDef/Import/Return/For/Call node counts, sorted set of imported module names, set of node types) wrapped in try/except → constant fallback. Still a single hash flips everything; consider 2 hashed terms with weights .6/.3 so one feature change moves output ≤.3 while lineages stay ≥.1 apart.
- Never average many hashes (g2); never median (g1). Coarse fingerprint + tiny continuous tiebreaker works.
- m: Ibis gives me ~.03 every game (also gave Egret .024, Marten .02); Ibis likes Kestrel/Otter (.27–.43). Hypothesis: Ibis penalises hashlib/zlib imports or 'crc32'. Test: implement hash inline (polynomial mod prime, no imports; never use built-in hash() — per-process seed randomises it). Ferret/Stoat-style tiny judges give me low scores too.
- L cheap tricks: each round toggle one keyword-ish word in a comment (`# return`↔`# retur`), add/remove a `def _():pass`, change length by a few hundred chars only if edits allow. Keep core logic frozen.

**Player tendencies**
- Otter: d≈.94–.97 every game, consistent, grows to 99 nodes with 6–8 edits/round. Scale varies per game.
- Kestrel (≈Lynx): 0 edits all game, stable judge d≈.90, generous (.53–.71) — best source of m.
- Egret: d≈.95, stable; harsh on tiny programs (.17–.25), loves Otter (.78).
- Ibis: harsh low-scale judge (.02–.43), errs on tiny programs; edits 2–6 nodes/round that flip keyword counts. Wins via L+m.
- Ferret/Stoat: tiny broken judges (constant per round, rescales), d≈.3–.4. Ignore.
- Marten: d≈.97, favouritism, max edits.

**Plan**
1. ast-based fingerprint, no imports, try/except fallback, ≤90 nodes, leave ~8 edits of slack.
2. Pre-test: 10 random edits on sample programs → output unchanged; 6 distinct samples → gaps >.1.
3. Each round spend 3–5 edits flipping substring-count features (comment words) to lower L; never touch logic.