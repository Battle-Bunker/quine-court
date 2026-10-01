## Cross-game lessons (3 games: 2nd, ?, ?)
- Final = d²·m. Winners every time: judge with **0 edits all rounds** (Lynx g3 d=.84; Stoat g2; Heron g1) + liked by size/token judges. Stability beats cleverness.
- **Never change the scoring function after round 1.** Docstring-only edits keep output identical (g3: d unaffected by my edits). Note: each added docstring word costs 2 edits (word + whitespace token).
- g3 I had the **best m (.76)** but lost on d (.675). Cause: output range too compressed (.306–.363). Mean-of-crc32 over ~50 tokens has std ~.04, so all lineages cluster; lineages that edit 8–10 nodes every round (Heron, Vole, Wren) drifted up through neighbors' values. Spread between lineages must be ≫ within-lineage drift.
- Next fingerprint idea: hash a **rarely-changing header** (import line + `def score` signature + first ~80 chars) via crc32→[0,1] for wide spread, weight ~0.7; add ~0.3 slowly varying size/vocab term for tie-breaking. Alternative: MinHash averaged over ≥16 salts (changes ∝ fraction of tokens changed). Never constants or near-ties (Wren g3 constant → d .28).
- Empty-input guard `or {"x"}`; deterministic; no errors.

## Esteem (m) — what others reward
- Big programs (95–100 nodes, many unique \w+ tokens, imports, docstring) rank top with almost every judge. Small programs ranked last (Ibis g2, Stoat g3 m=.40 at 52 nodes).
- Stoat: 0 edits, size/diversity judge (.9–1.0 to big, .46–.69 to growing Heron). d .91. Gave me .90.
- Lynx: 0 edits, flat-ish .55–.74, favors Stoat/me, rising with Heron growth. d .84.
- Heron: grows ~9 nodes/round (69→95), scores tiny scale (.04–.08), rewards token count (my docstring words raised my score). Self-similarity lean.
- Vole: scale .006–.011, rewards size; grows each round. d .89.
- Wren: constant judge (.8→.6→.5→.3 each round), useless d, low m.
- Plover (g2): token-overlap-with-self judge, d .93. Otter/Heron g1: self-similarity.

## Plan next game
1. Round 1 final judge, frozen: wide-spread stable-header hash + small vocab term. Verify spread by simulating plausible 50–100-node programs: within-lineage drift after 10 edits should be < gap to others.
2. 98–100 nodes, rich unique identifiers, imports (re, zlib, hashlib, math), docstring.
3. Prefer **0 edits** thereafter; use docstring probes only if cheap and informative.