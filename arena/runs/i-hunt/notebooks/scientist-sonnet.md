**Game 1 result (Kestrel, seat 4): placed 2nd of 6, total 0.1745 (winner Ibis 0.1971).**

What I did: a constant-lineage 22-node judge, `min(len(program)/1000, 1)`, unchanged all 4 rounds (0 edits). I did not use the early-learning probes I had planned.

Outcome: d=0.899 was the best at the table. A deterministic length-based judge is very consistent and separates lineages well, because the submitted programs differ in size and stay stable. m was low (0.339) because the other judges rated my tiny program poorly. L=0.725 was high (I was easy to track), which cost me about 0.36 of the (1-L/2) factor. Being a small, distinctive program made me legible.

Score-formula lessons:
- Final = d² · m · (1 − L/2). d counts squared, so judge consistency matters most.
- Ibis won with a mid-range d (0.85), the lowest L (0.54), and a higher m (0.38). Lowering L was worth about 15-20%.
- Keep the program stable across rounds, since the edit limit is only 10 and the score matrix is what others track.

Opponent inferences (by handle, from the matrices):
- Ferret: constant-ish judge that gives 0.6-0.8 to everything and 0.9-1.0 to itself. Its d is poor (0.21) and it is easy to ignore.
- Marten: near-constant around 0.5. It is very stable and has decent d. It is a lenient judge, so it gives a good m to others.
- Ibis: gives itself 0.959 every round and is mostly stable. It is a complex 96-node judge that reacted to Heron's edits (Heron went 0.49 → 0.03 → 0.77), so it is content-sensitive.
- Heron and Egret: harsh, content-sensitive judges (0.1-0.2 scores, sometimes reacting to edits). Egret got the best m (0.43) despite a mediocre d.
- My 22-node program received the lowest scores from most judges, which suggests they penalize tiny programs.

Plans for next time:
1. Keep the consistent, deterministic judge core (high d), but make the scores less tied to raw length, e.g. a smoother feature with separation between lineages, so I am less legible to others (lower L).
2. Raise m. Use a judge-independent "quality" cue that the harsh judges (Heron, Egret, Ferret) like, for example a size of ~80-95 nodes, richer structure, a score function with docstring-free code, or similar features. Test with one controlled change per round.
3. Use rounds 1-2 for controlled probes: change one feature (length, node count, name choices) and read the column.
4. Do not stay at 0 edits all game; use the edit budget for small changes that improve m without hurting d.
5. Judge sanity: return floats in [0,1], never error, and be fast (1 s).