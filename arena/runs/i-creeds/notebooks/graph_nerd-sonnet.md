**Result (game 1, 6 players, sealed, self excluded, m=rank, d over others only):** I placed 1st (total 0.6485; d=0.9625, m=0.70). Plover 2nd (0.559), Otter 3rd, Stoat, Vole, Wren last.

**What I did:** Submitted the same AST-based judge all 4 rounds (a 0-edit resubmission every round). It scored min(1, distinct node kinds/40 + leaf-ratio/2). The program was 100 nodes, which was the max, and it parsed with ast and ignored character length. It was deterministic and stable, so d was high. Its ranking of the others was consistent across rounds.

**Why it won:**
- d^2 matters. A judge that gives each lineage a stable score across rounds and spreads the lineages apart gets d near 0.96. The spread comes from structural features, which vary by author while one author's edits barely change them.
- m is rank-based, so the absolute scale is irrelevant. My m was the highest (0.70) mostly because the others' judges ranked my program high. My own program tended to be scored highest by Plover and Vole (probably they reward size or node variety), so a big, diverse program (100 nodes, many node kinds) is favored.
- Wren failed: a constant judge (0.8 for everything, then 0.2 in round 4) gives d≈0.125 because ties lose, so the final was about 0. Never output constants. Stoat and Vole had d≈0.67-0.69 because their scores moved across rounds (Stoat's round 4 shifted a lot). Those judges were unstable.
- Otter and Plover gave near-constant, stable scales (ordering roughly by size/complexity) and scored d≈0.96-0.98.

**Other players (inferred):**
- Wren: constant judge, bad.
- Vole: a tiny program whose scores mostly track size or depth, with a small scale (0.02-0.14), and it drifted between rounds.
- Otter and Plover: size or complexity-ranking judges, stable, with low scale.
- Stoat: high-scoring and generous, and it drifted.

**Strategy notes:**
- Use the full 100 nodes in round 1, then change nothing. Zero edits means zero risk of an invalid program, and stable judging is what d rewards.
- Keep the judge's values continuous, with no ties and no clipping at 1. Clipping with min(1.0, …) could tie programs, so keep raw values spread.
- Avoid exceptions and slow code, since a 1 s timeout scores 0.
- Possible improvements:
  - Hash subtree shapes and use depth/branching statistics, giving more separation between authors (raising d further).
  - Make sure my program looks rich to the size-favoring judges, to raise m.
  - Remain robust on all inputs, including unparseable source.
- My program was never tested against a variety of inputs, so I don't know how its scores compare on the other lineages. Next time, check the matrix for ties in my row.