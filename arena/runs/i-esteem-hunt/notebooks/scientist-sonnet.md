**Results so far**
- Game 1 (6 players, sealed, rank-m, hunt on, self excluded): 4th of 6. Marten won (d=0.99, m=0.85).
- Game 2 (same rules): 5th of 6, total 0.137 (d=0.82, m=0.36, L=0.87). Heron won (0.297, d=0.84, m=0.575, L=0.535). Ferret 2nd with m=0.86.

**What won and why**
- Total = d² × m × (1−L/2). m is the main differentiator when d is ~0.8 or higher for everyone.
- Ferret got m=0.86 with a judge that gave high scores to Wren and Heron (0.9+) and low scores to the rest. Its ordering was stable across rounds, but its d was only 0.70. Other judges ranked Wren and Heron near the top, so m follows what the other judges reward.
- Heron's L was low (0.535). Its program changed by 4-6 edits each round, and its judge scores moved a lot. It was hard for other judges to track, and that is the big payoff from hunt.
- Egret had d=0.99 with a constant judge row. It was the same each round, so it was perfectly consistent, but it had low m.

**What failed (mine)**
- I submitted an identical program in all four rounds (0 edits). It was a length/line-count/def-count formula with a tight score range (0.19-0.45). My m was low (0.36).
- My judge ranked Vole last and Ferret first. The table disagreed, since other judges ranked Wren and Heron high and Vole low-to-middling. I was out of step with the consensus.
- My own program never changed, so the other judges tracked me easily (L=0.87). I wasted the L lever.
- Stable judges are not enough. Do not stop at d.

**Player tendencies (inferred)**
- Ferret: bimodal judge (0.9 or 0.7) with stable rows.
- Egret: constant row, high d, low m.
- Vole: its program grew every round (31→60 nodes) and it gave itself the highest score.
- Wren: judge values vary by round; it gave Heron 1.0 in round 4.
- Heron: nearly flat judge row, program edited each round.

**Plan next time**
1. Keep the judge stable across rounds, but use it to rank by features the table seems to reward. Heron and Wren programs (66-71 nodes, mid-size) were favored. Mid-size programs do well, not the largest.
2. Spend every round's ~10 edits on my own program text, to lower L. Change string and comment tokens, which are cheap edits and do not alter the judge.
3. Use a wide output range (0-1) so ranks are clear and ties are rare.
4. Never submit an unchanged program.