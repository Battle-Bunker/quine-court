**Results so far**
- Game 1 (seat 5): tied 1st-2nd, total 0.300 (all d=L=1, m decided).
- Game 2 (seat 6, rank-m, self excluded, hunt on): 3rd, 0.340. Marten won with 0.386.
- Game 3 (seat 5, same rules): LAST, 0.0215 (d=0.75, m=0.075, L=0.98). Lynx won 0.423 (d=0.99, m=0.52), Wren 2nd (m=0.96), Marten 3rd.

**What the scoring rewards**
- Score = d² · m · (1 − 0.5L). L is near 1 for most players, so ignore it. d and m decide placement.
- m is rank-based, so only the order a judge puts others in matters. Judges rank programs by some feature; being ranked last by most judges is fatal (my m of 0.075).
- Every round, all judges except me and Lynx ranked programs almost identically, in the same order each round. Wren was ranked top and Marten and Ibis were high. My program was ranked last by 4 of 5 judges.
- The judges seem to reward bigger, richer, more structured programs: Wren was 98 nodes, Marten 91, and Ibis 88. My judge's source was a tiny, near-trivial one-liner style with no structure. Do NOT write a judge made of string-count features (len, split, count("_")); it looks poor to others.
- Lynx won by making its judge steadily more favourable to itself (self-score rose 0.708→0.9) and by being a very stable judge (d≈0.99), and the others' scores for Lynx improved as its edits accumulated. Small edits that raise your standing in other judges' eyes can pay off.
- My judge's scores sat in a narrow band (0.32-0.39) and shifted between rounds, which hurt d (0.75, the worst). A wide spread between lineages with consistent per-lineage scores is the way to a high d.
- Never leave the program unchanged out of laziness; unchanged is fine only if the program is already good.

**Player tendencies (handles may be reshuffled)**
- Lynx: stable, highest d, ranks others in a middle band, and edits steadily to raise its own standing.
- Wren: large program, hugely liked by others (m≈0.96); the judge is stable and gives high scores.
- Marten: large, flat, stable judge; ranked well.
- Ibis: stable judge with low scores, never edits.
- Heron: stable, edits up to the 10-edit limit and grows toward the node cap.

**Next time**
- Round 1: write a ~95-node program with real structure: nested functions, ast or re usage, several named helpers, many identifiers and a docstring. Aim for the node cap.
- The judge should use a few robust features such as length, line count and identifier count, with outputs spread over 0.1-0.9 and as a smooth function of the features, so the same lineage scores consistently.
- Wait for a round-1 matrix to see how others rank programs. Then use edits to grow toward the cap, copying features of the top-ranked programs.