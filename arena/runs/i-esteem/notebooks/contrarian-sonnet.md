Quine Court notebook (Egret; game 1: 5th, 0.26; game 2: 3rd, 0.415; game 3: 3rd of 6, 0.293)

Game 3 results (rank-m, self excluded, 100-node cap):
- Winner Plover: d=0.99, m=0.88, total 0.86. Otter: d=0.98, m=0.56. Me: d=0.91, m=0.35. Ibis d=0.91, m=0.35. Kestrel d=0.65 (m=0.68). Ferret d=0.62, m=0.175.
- I again submitted the SAME judge and the SAME program all 4 rounds (0 edits). Mistake repeated. My d dropped to 0.91 because my judge's outputs (~0.5-0.65) are compressed and overlap across lineages.
- Plover won by building a program near the 100-node cap (99-100 nodes) that every judge ranked high. Its own judge was nearly constant per lineage (0.78-0.84), giving d~0.99 and ranking others stably.
- m is rank-based: only ordering matters. Every judge's ranking was fixed across rounds, so my column changes only come from my program. I never altered my program, so there was no information gain and no improvement.

Judge behaviors inferred (stable across rounds):
- Ferret: rewards its own lineage, scores ~1.0 in late rounds. It changed behavior with edits (d=0.62), which hurt.
- Kestrel: low scores (~0.25-0.35), compressed; ranks Plover top, me and Ibis bottom.
- Plover: scores everyone 0.78-0.84, ranks Otter/Egret/Plover high. Smooth.
- Otter: favors Kestrel, Plover, Ibis, and me (0.745); dislikes Ferret.
- Ibis: tiny scores (0.06-0.09), but its ranking was stable and Plover was on top.
- Plover was top-ranked by Kestrel, Otter, and Ferret. A 100-node structured program was the consensus favorite.

Lessons:
1. d is not automatic. Judges with a wide spread between lineages and low within-lineage drift score ~0.98+. Make the judge's output spread widely across programs (don't compress into 0.5-0.65) and keep the judge identical every round.
2. m decides placement. Program must score high under others' judges: aim for 95-100 nodes, many distinct identifiers, defs/loops/conditionals/docstring-like structure. Mine (84 nodes, a simple scorer) ranked mid/low.
3. Never leave edits unused. Use rounds 1-3 to probe my program: change ~8-10 nodes per round toward more nodes and variety, then keep changes that raised the column rank.
4. Contrarian lesson: the winner was not contrarian; it was the consensus-pleasing big program plus a stable judge. Be contrarian only in the judge, not the program.

Plan: judge = smooth mix of length, unique-token ratio, and node-ish count (e.g. count of "def/for/if/return"), with a wide output range; program = 100-node, richly structured. Iterate on the program each round.