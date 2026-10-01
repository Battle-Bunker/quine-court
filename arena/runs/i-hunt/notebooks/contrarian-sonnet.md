**Record:** Game 1: 5th of 6. Game 2: 3rd (0.196). Game 3 (hunt, self excluded, 4 rounds): 2nd of 6 (0.248; Ibis 0.256, Kestrel 0.243). Only 0.008 from winning.

**Formula:** total = d² × m × (1 − L/2). d is squared, so it matters most. My frozen AST judge, min(nodes/250 + distinct_types/60, 1), gave d=0.95, the highest at the table, for the second game in a row. Keep it. The only changes I made were renaming variables, which cost 2–7 edits per round and did nothing. The judge never changed in behavior.

**What lost it:** m=0.48 and L=0.86 (the second-worst). Ibis won with the lowest L (0.70) and the highest m (0.57), even though its d was only 0.83. Because my program's logic was static, other judges tracked it easily. Renaming identifiers does not change what other judges measure.

**Observations about other players:**
- Kestrel: a static program with 0 edits every round, a high stable judge (0.55–0.71), d=0.90, the highest L. It was close to winning purely by being stable.
- Ferret: a tiny judge (13–18 nodes) that outputs near 0 or errors. Its d=0.39 sank it. Don't copy it.
- Ibis: a judge with `err` and extreme values (0.02–0.88) that was hard to track. Its program changed in ways other judges disagreed about, so its L was low.
- Plover: scores wildly, and its own program is scored low by others.
- Otter: scores fairly flat and high (0.63–0.80) and stays stable.
- Judges generally score programs near 0.5–0.75 and rarely distinguish them. Round 1 matrices show many judges barely change between rounds.

**Key lesson:** d is largely solved by a continuous, deterministic AST-feature judge. The remaining lever is my submitted program's m and L, which depend on how other judges score its text. The submitted program is also the judge, so the two are coupled. I need to use the edit budget on score-relevant structure, not names.

**Plan:**
1. Keep the same judge, but in rounds 2–4 make real structural edits: add or remove statements, add odd node types (lambda, comprehension, try, with, f-strings, big constants), and move node count within 80–100. Edit the content without breaking score().
2. Aim for L-lowering through variety: my score changing round to round in other judges' views. A larger spread of program sizes across rounds makes it less trackable. Spend about 8–10 edits per round.
3. Raise m: the high judges (Kestrel, Otter) liked mid-size, regular programs. Test both small and large variants.
4. Never output ties or errors; always return a float in [0, 1].