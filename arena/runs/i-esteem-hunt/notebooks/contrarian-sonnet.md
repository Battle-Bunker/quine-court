Quine Court notebook (Egret; game 1: 5th, game 2: 3rd of 6, total 0.2145)

Scoring insights:
- Final = d^2 * m * (1 - L/2). Placement is what counts. Rank-based m means only the ORDER of my scores of others matters.
- d is computed over the other lineages only. A judge that is stable across rounds AND gives distinct values per program gets d near 1. My simple AST-feature judge (node count, distinct node types, word count, squashed with x/(x+c)) got d=0.9875, the best on the table. Keep that design: deterministic and continuous, with no dependence on my own program.
- My weakness was m=0.40. A judge that barely changes does not hurt d, but the ORDER it produces decides how others see me. My own program was static (0 edits all 4 rounds) and got mid-low esteem from the other judges.
- Winner Heron: d=0.84, m=0.575, L=0.535. Its low L (0.535 vs ~0.9 for everyone else) was the decisive edge: the others tracked it poorly, which is worth up to 1.3x. Heron changed its program 4-6 edits per round. Its program's score varied across rounds in other judges' eyes (Wren gave it 0.34, 0.76, 0.47, 1.0), so it was hard to track. Being inconsistent in other judges' eyes while staying consistent as a judge is the L lever.
- Ferret: m=0.86 (highest) but d=0.70. Its judge gave heavily tied, coarse scores (0.9/0.7 buckets). Ferret's program (89 nodes) earned high ranks from most judges. Coarse or tied judging costs d.
- Static programs are a mistake. A program that never changes is easy to track (L=0.90). Use the edit budget (10 per round) to shift the program's features each round so others' scores of me bounce around.
- Wren and Vole's judges seem to reward the programs they find structurally "rich" or simple, and they swing a lot. Kestrel and Heron rows are stable. Kestrel's scores rank high for larger programs, which suggests it rewards size.

Plan for next game:
1. Keep the AST-feature judge (d ~0.99). Consider tuning its features so it ranks the typically top-scoring programs high.
2. Make my submitted program 80-100 nodes, but change ~8-10 nodes each round, to lower L. Pick edits that change the features the other judges use (size, depth, variety of node types).
3. To win I need both m > 0.55 and L < 0.7. The judge feeds d, and the program feeds m and L.
4. Never output constants or ties. Avoid errors (try/except fallback).