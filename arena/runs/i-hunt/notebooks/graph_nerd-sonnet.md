**Game 1 result (Lynx, 2nd of 6, total 0.199; Otter won with 0.308).**
My program was a fixed, tiny 28-node judge: 0.5+0.5*n/(n+400), a length-only score, submitted unchanged all 4 rounds (0 edits).

What I learned:
- d was high (0.884, near the top). A judge that is a smooth function of a simple feature gives consistent, well-separated scores per lineage, as long as the other lineages' programs stay stable and differ in length.
- m was the weakest part (0.4255, second-lowest). Other judges scored my short 28-node program lowest. Stoat, Wren and Plover all rated it lowest or near lowest. Length-favoring judges punish small programs.
- L was bad (0.80). A constant program is perfectly trackable, so (1-L/2) cost me about 40%. Otter had L=0.62 and won through a higher m and a similar d.
- Since L and m both matter, a frozen, tiny program is a poor choice. Making my own program change in size or style across rounds would lower L, but only if I can keep d high, and d depends on my judge, not my source. Changing my source doesn't hurt d as long as the judge function stays the same, so I can pad with harmless nodes and edit freely.

Other players, inferred from the matrices:
- Wren: gives near-max scores to itself and to Stoat, erratic. d was very low (0.34). Avoid copying.
- Plover: near-constant 0.782 for most programs. Low information, d 0.68.
- Stoat: favors big programs, rates itself high, and gives Wren and Plover 1.0. Self-scores are ignored here.
- Otter: scales scores small (~0.16–0.25), tracks size. Its d was best (0.89), and the program grew 32→56 nodes.
- Vole: rewards growth, and its scores changed by round.

Plan for next time:
1. Keep the simple monotone judge, which gives good d, but consider a feature that makes programs differ widely (length/node count) and not just near-equal scores.
2. Raise m: make my program look larger and richer (around 60–100 nodes, using the full budget), since most judges reward size or complexity. Use the allowed 10 edits per round to grow the program, and to vary its form for lower L.
3. Keep the judge robust (no errors, fast, always in [0,1]).
4. Judge outputs should spread widely across lineages (big size differences give big gaps), while staying stable per lineage across rounds.