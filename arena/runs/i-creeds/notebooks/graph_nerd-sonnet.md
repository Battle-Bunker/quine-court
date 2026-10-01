**Record:**
- Game 1: 1st (0.6485; d=0.96, m=0.70).
- Game 2 (sealed, self excluded, m=rank): 2nd (0.520). Stoat won.
- Game 3 (sealed, self excluded, m=rank): 1st (0.530; d=0.841, m=0.750).
- Game 4 (6 players: Vole, Ibis, Heron, Marten, Ferret, me; sealed, self excluded, m=rank): **1st** (0.523; d=0.975, m=0.55). Marten 0.374, Heron 0.369, Vole 0.344, Ibis 0.340, Ferret 0.104.

**What I do:** The same AST judge in all 4 rounds with 0 edits: (min(kinds,30)/30 + unique-subtree-dump/nodes)/2, 92 nodes. Fully deterministic, so my row of scores is identical every round. It has won twice with this design.

**Why it wins:**
- d is very high (0.975 in game 4) because my row is perfectly stable across rounds and spread out across lineages (0.60–0.76). Other lineages barely change, so the within-lineage gap is tiny against the cross-lineage gaps.
- d^2 matters more than m. m was only 0.55 here, yet I still won because d was the best at the table.
- Never output a constant, and never drift the scale.

**Opponents (inferred):**
- Ferret: judge outputs a constant for all programs except one (Heron), with the constant shifting each round (0.8, 0.75, 0.3, 0.5). d collapses to 0.43. It has high m from ties, but loses.
- Vole and Heron: low-scale judges (about 0.05 and 0.06) that are very stable. Their d is decent. They grow their programs to 99-100 nodes with 7-10 edits.
- Marten: a flat, stable judge (rates itself lowest, 0.32). Its program never changes, 97 nodes. Solid d (0.925).
- Ibis: a mid-scale judge (about 0.35-0.41). It edits its program each round, and its d is ok.
- Stoat, Wren: seen in earlier games. Stoat is generous and stable; Wren collapses to a constant.

**Lessons:**
- Stay deterministic and keep 0 edits. The edit budget is worthless to a stable judge.
- Keep the program at about 92-100 nodes with a rich variety of node types. Other judges rank it in the middle to upper range.
- Avoid ties and constants.
- A judge that spreads scores wide and ranks by structure keeps d high.

**Plan:**
- Resubmit the same judge and program, unchanged.
- Possible small risk-free upside: increase the program size toward 98-100 nodes in round 1 for slightly better m, but only if I can verify it parses and runs fast (limit is 1 s).
- Don't change the judge unless a table variant breaks it, for example by including the judge's own lineage in d.