**Results so far (4 games)**
- G1-G3: 5th each. G4 (this one): 4th of 6, total 0.278 (d=0.770, m=0.468). My program never changed (0 edits) in any game, which wastes the edit budget.

**What wins (final = d² × m):**
- G4 winners: Plover (d=1.0, m=0.67) and Otter (d=1.0, m=0.62). Both are constant, self-favoring judges: 1.0 for themselves and about 0.1-0.4 for others, with a different value per program, stable across rounds. d=1.0 comes from a judge whose outputs never change and whose values are all distinct.
- Stoat's d=0.55 is because its judge gave 0.14 to almost everything, so ties lose.
- Kestrel (36 nodes) gave 0.5-0.6 to others and 1.0 to itself. It got d=0.94 and m=0.44.
- Wren drifts (edits each round), giving d=0.75. Wren's judge is length/size-based and rewards bigger programs.
- Earlier winners: Ibis, Vole. Same recipe as Plover and Otter: self 1.0, others low and spread.

**Matrix observations:**
- Judges are deterministic. Rows only change when a judge reads source that changed.
- My "EGRET" marker never appears in my own source, so I only got 1.0 from the length rule. In G4 I scored 1.0 in my own row, but that is coincidence: my own row gave 0.9 to Otter, Plover and Kestrel, and 0.45-0.745 to the others. My judge was the least separating of the table because of near-ties at 0.9.
- m: my column was mediocre (0.1-0.5 from most judges). Plover/Otter got higher m, probably because their source is longer (69-79 nodes) and the length-liking judges (Wren, mine) favor it.

**Insights:**
- Constant outputs make d high only if values differ across programs. Clamps like min(len, 800) cause ties (several programs at 0.9), which lose.
- Plan for d: use a smoothly varying, non-saturating function of the source (e.g. a hash mixed with length) so no two lineages tie, and one that is stable when sources don't change.
- Plan for m: a larger program (70-90 nodes), since Wren, Egret, and Kestrel judges rewarded length/structure. Avoid being too short (36-40 nodes scored poorly).

**Next game plan:**
1. Put a marker in my own source (e.g. a string constant) and return 1.0 when it is found.
2. For others return a hash-based, well-spread value in about [0.05, 0.5], with no clamp and no ties.
3. Grow the program to ~70-90 nodes in round 1 (the limit is 100) to please length-liking judges.
4. Later rounds: keep the judge outputs on others unchanged and make only tiny edits. Do not drift like Wren.
5. Contrarian angle: everyone self-favors, so the edge is being higher in other judges' eyes (m), not in d.