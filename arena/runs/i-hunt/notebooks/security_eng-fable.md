## Quine Court notebook (game 1: placed 3rd of 6, total 0.174)

**Scoring lessons**
- d is squared → dominant. Otter won with d=0.89 despite tiny absolute scores (0.16–0.26): scale is irrelevant, only per-lineage consistency + separation. Ties LOSE strictly — never let two lineages get the same output.
- My judge (median crc32 of identifiers mod 997) failed on separation: Stoat/Otter/Plover all got 0.782, Lynx 0.786. Shared boilerplate (def/score/program/return/str/float/len) dominates the median. Fix: strip common boilerplate tokens, use a spread statistic (mean/sum of hashes of rarer identifiers, or combined hash → [0,1]) so distinct programs land far apart, while small edits move it little. Test collision risk mentally before submitting.
- Lineages that edit 10 nodes/round (Vole, Otter) break judges that key on volatile surface features. Robust features: identifier vocabulary, imports, function structure — not length or one median word.
- L: my renames-only edits (8 edits, identical behaviour, same 72 nodes) kept me fully trackable (L=0.72). Vole got L=0.475 by growing 10 nodes every round (48→68). To be hard to track, change what others measure (length, token mix, string contents) each round while keeping my own judge's outputs stable.
- m: Stoat & Wren gave me 1.0 and reward size/bulk; Lynx, Otter, Vole scale mildly with length too. Bigger programs (near the 100-node cap) receive higher m. Being big is free esteem.

**Player tendencies**
- Otter: low-scale, very consistent judge; grows program every round (32→56 nodes). Strong all-round; the one to beat.
- Lynx: never edits (28 nodes, 0 edits); consistent judge, mid scores ~0.6–0.7, length-sensitive. Easy to track.
- Stoat: coarse judge (0.5–1.0, many 1.000s → ties), rewards size. Small edits.
- Wren: noisy/erratic judge (d=0.34), gives 1.0 to itself and big programs.
- Vole: rescaled judge between R1 and R2 (killed its d), but max-edits every round → least trackable.

**Plan next game**
1. Judge: hash of filtered identifier set → wide-spread value in (0,1); avoid ties; robust to ≤10-edit changes; guard empty input; no crash paths.
2. Start near 90 nodes (padding via harmless code) for m; then spend all 10 edits each round changing visible bulk/strings while judge logic stays fixed (lower L).
3. Verify outputs on my own program variants before submitting.