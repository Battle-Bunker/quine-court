## Game 1 (6 players, sealed, self-excluded, rank-m): placed 4th (d=.675, m=.40). Heron won (d=.74, m=.74).

**My judge**: mean of crc32(token)%1000 over unique \w+ tokens. Stable across lineages (d ok) but spread tiny (0.39–0.50). Better: MinHash/shingle-based value with wider spread; small edits barely move a min-hash, so consistency stays and separation improves. Never return constants (Ferret did → ties lose, d=.45).

**Esteem (m) was my weak spot** — 40% of score comes from other judges ranking me high. Docstring tricks (adding common tokens) did nothing; Ibis even dropped me. Observations of what others reward:
- Kestrel & Egret: from round 2–3 gave Ibis and Heron exactly 1.0, everyone else low. Some shared feature of Ibis (22→37 nodes) and Heron (72 nodes) triggers a cap. Unknown marker — probe it next time by varying one feature per round (node count, comment presence, import set, having `hashlib`/`math`, number of defs).
- Ibis: ranks Heron very high (0.94) after round 3, everyone else ~0.1–0.3. Likely similarity-to-self or specific token match.
- Heron: scores itself 1.0, others low; stable rule (0 edits rounds 3–4). Consistent judge → high d.
- Ferret: near-flat scores ~0.8–0.9, slightly favors big/diverse programs (gave me 0.83, Egret 0.92). Likely a length/diversity metric.
- Kestrel/Ibis: tiny programs (22 nodes) — probably a length or single-hash heuristic.

**Strategy next time**:
1. Judge: locality-sensitive fingerprint (MinHash over 3-gram shingles, or crc32 of sorted-token digest) mapped to [0,1] with full spread; guarantee determinism, no error paths, handle empty input.
2. Use the 10-edit budget each round to *probe* others' judges: change one observable property, read the matrix column for my program. Aim to find the feature Kestrel/Egret cap at 1.0.
3. Keep node count high (~90) with many unique tokens and a docstring; length-based judges (Ferret, maybe Egret) reward it.
4. Keep my own core hash logic frozen across rounds so d stays high; spend edits only on cosmetic esteem probes.
5. Winner profile: consistent judge + being liked by 3+ judges. Both matter; d² makes d slightly more valuable.