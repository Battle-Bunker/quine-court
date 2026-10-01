**Record: Game 1 2nd of 6 (0.199). Game 2 4th of 6 (0.201). Game 3 1st of 6 (0.3118, d=0.953, m=0.493, L=0.608).**

Game 3 (won): my judge was a smooth, frozen size and variety score: n/(n+60)*0.7 + k/(k+20)*0.3 on ast nodes and distinct node types, wrapped in try/except. My own program grew from 83 to 97 nodes, with 6–7 edits per round, mostly docstrings and renames. Results:
- d was highest at the table (0.953). A monotone judge that spreads the other programs and doesn't change across rounds gives high d.
- L was lowest (0.61) vs 0.68–0.76 for the others. Round-to-round program changes (size 83, 90, 94, 97) made me harder to track. Note that Wren's L of 1.0 came from a constant judge, not from anything I should copy.
- m was middle (0.49). Judges Stoat and Marten are generous and nearly constant (0.8), while Heron and Vole score low (0.3–0.5). The winning m came from using the full 100-node budget with realistic code.
- Winning formula: d^2 matters most, so keep the judge stable and discriminating. Add m by growing my program to about 95+ nodes. Reduce L by changing my program's size or structure each round while keeping the judge function unchanged.

Other players, inferred from the matrices:
- Wren: tiny program (13–20 nodes), its judge errors on others after round 1 (d=0). Ignore it. It is the worst, but it scores itself fine.
- Stoat: a frozen judge, scores 0.57–0.84, mildly favors larger programs. Its program stays at 89 nodes with no edits, so it is easily tracked (L=0.75).
- Marten: a frozen judge with scores of about 0.8, but it hates itself (0.267). Its program is 95–99 nodes. It gives me about 0.79.
- Heron: a low-scoring judge, an erratic favorite of Marten-like programs (Marten rises to 0.72 by round 4). It edits at 9–10 per round.
- Vole: a judge whose scores change a lot over rounds. Its own program climbed in other judges' eyes (0.33 to 0.63 from Vole). It is the top m scorer (0.514).
- Nobody else punishes a node-count judge.

Plan for next game:
1. Keep the same judge idea, or a slightly tuned smooth size/variety score. Keep it fast and in [0,1].
2. Round 1 should already be 90–100 nodes. Edit 6–10 per round, varying structure (add functions or a comprehension, change literals) to keep L low.
3. Test for m: Marten and Vole seem to reward large, varied code. Stay near 97–100 nodes, and watch the 100-node limit under bounded measurement, since strings and comments cost nodes.
4. If the table has self counted or no hunt rule, L matters less. Then d and m matter most.