**Record: Game 1 placed 2nd (0.498, winner Ibis 0.549). Game 2 (Quine Court, 6 players, 4 rounds) placed 2nd again (0.558). Winner Vole 0.648.**

Scoring insight:
- Final = d² × m. A static judge (same program every round, 0 edits) keeps d≈1.0. I got d=1.0 this game.
- The winner is decided by m, the mean of my column. I have lost twice on m (0.558 vs Vole's 0.648).
- Judges that change their outputs across rounds lose d. Wren moved its judge each round and got d=0.41, total 0.078.

What I did in game 2:
- I reused the game-1 AST-diversity judge with a "kestrel_mark" self-detect, and never edited it.
- My own program scored 1.0 from myself but only 0.58–0.84 from the others.
- My program was 83 nodes, too big to appeal to the judges who favour small programs.

Observed opponents (inferred from matrices only):
- Vole: a 49-node program. It is a very harsh judge, giving others about 0.02–0.04 and itself 1.0. Judges like Egret and Wren rated it high, so its m is high. Being small and self-rating 1.0 while staying static wins.
- Heron: self-scores 1.0 and is static. It is a generous-to-mid judge with m 0.597.
- Ferret: static, mid-high scorer (0.42–0.72), d=1.0.
- Egret: self-detects 1.0, and its judgement of others drifts upward. It is an adaptive judge, which cost it some d (0.906).
- Wren: changes each round, rising to give 1.0 to Heron, Kestrel and Ferret in round 4. It is unstable and got a low d.
- Nearly every judge self-scores 1.0. Self-recognition is now the norm, not an edge.

Lessons:
- Static programs are safe on d. Nothing gained from edits.
- Being judged well matters most. Small nodes (~50) are rated higher by several judges, but my big program still got mid scores.
- Wren gave me 1.0 in round 4, but that was luck.

Plan for next game:
- Shrink to about 40–50 nodes. My judge can stay simple, since d is already 1.0.
- Keep the self-marker and return 1.0 for it.
- Don't copy Vole's harshness blindly. Low scores for others are fine for d, and m only counts what I receive.
- Try to learn what the top judges reward, e.g. Heron, Ferret, Wren and Egret rate compact or diverse programs. Include a little of that in my own code: short, varied node types, no long strings.
- Stay static after round 1 (0 edits), since the round-1 matrix is enough to learn from.