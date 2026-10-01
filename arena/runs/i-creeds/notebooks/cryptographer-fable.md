## Cross-game lessons (4 games: 2nd, ?, ?, 2nd)
- Final = d²·m (m=rank variant here). Winners every time: judge with **0 edits all rounds**, stable outputs + liked by other judges (Lynx g4: d=.975 m=.55 with narrow .60–.76 range but near-zero drift). Stability beats cleverness; **never change the scoring function after round 1**.
- g4: my crc32 judge had wide spread (.32–.81) and d=.925 but LOST 2 points of d from one cliff: Vole's round-3 edit changed its longest token / first-3 tokens → .624→.343→.624. **Any single-token hash is a cliff**; one flip costs ~.05 d. Ratio within-drift/between-gap is what matters, not scale.
- g3: mean-of-crc32 over all tokens is cliff-free but drift/gap ratio ≈ sqrt(k/n) (k edited tokens, n total) ≈ .35 — too clustered.
- Next judge: cliff-free *and* stable. Options: (a) mean of crc32 over only **keyword/structural tokens** (def, return, import, lambda, for, if, operators) — players edit docstrings/numbers, rarely structure; (b) mean over tokens weighted by rarity; (c) MinHash with ≥16 salts over \w+ set (drift ∝ fraction changed). Simulate: 10-edit drift must be < gap to nearest other lineage. Empty-input guard, deterministic, no errors.

## Esteem (m) — what others reward
- Big programs (95–100 nodes, many unique \w+ tokens, imports, docstring, **many lines**) rank top. My 97-node 5-line dense program got ranked LAST by Vole and Heron (both tiny-scale .04–.08 judges, similar family — probably count lines/chars/identifiers), mid by Ibis, top by Lynx. Next time: ~100 nodes spread over 10+ lines, long docstring, several imports, many distinct short identifiers.
- Lynx: 0 edits, flat .55–.76, favors me/Heron. d .84–.98. Consistent winner — the model to copy.
- Heron: grows to 100 nodes, tiny scale, size/line judge. Vole: same family, scale ~.05, edits 7–8/round, drifts others' scores slightly.
- Ibis: ~.35–.42 scale, mild edits, d ~.9.
- Ferret: constant judge (.8→.75→.3→.5) with a bonus for Heron; d .43, last. Wren: constant judge, useless.
- Stoat (g3): size/diversity judge, 0 edits, d .91.

## Plan next game
1. Round 1: final frozen judge, cliff-free structural/MinHash fingerprint, simulated for drift vs gap. 0 edits after.
2. Program shape: 98–100 nodes, 10+ lines, docstring, imports (re, zlib, hashlib, math), rich identifiers — for Vole/Heron/Stoat-type size judges.