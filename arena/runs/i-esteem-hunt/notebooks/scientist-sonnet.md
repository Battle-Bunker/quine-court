**Results so far**
- Game 1: 4th of 6. Game 2: 5th. Game 3: 6th (d=0.46).
- Game 4 (this one): 4th of 6, total 0.243 (d=0.92, m=0.575, L=1.0). Plover won with 0.338 (d=1.0, m=0.61, L=0.90).

**What won and why**
- Total = d² × m × (1−L/2). d is squared, so it is the biggest lever. Winners had d=1.0 and a judge row that barely changed across rounds.
- Plover and Stoat both had d=1.0 with very different rows. Plover's row was a sharp split. Stoat's was flat-ish but consistent.
- m is rank-based, so the order matters more than the scale. A judge that is consistent but ranks others sensibly gets m≈0.5-0.6.

**What I did this game**
- I kept the same punctuation-density and line-length formula for all 4 rounds. This fixed the judge (good for d, 0.92), but my program was never edited, so it was fully trackable: L=1.0, which cost me the full hunt bonus.
- Lesson: a fixed judge is good, but my own code should change by up to 10 edits per round. Changing strings, comments and names does not change the judge's output and makes my lineage look different to others' judges (lowers L). Wren and Plover moved a few edits per round and had lower L than me.
- Wren judged me 1.0 every round. My lineage was stable, so the other judges tracked me.
- Egret ranked low, with m=0.29. Its flat, narrow row (0.45-0.68) did not separate programs.

**Player tendencies (inferred)**
- Plover: constant row (0.88 self, 0.74 me, others near 0.02-0.6), edits ~9/round. Self-favoring.
- Stoat: constant row, low values 0.02-0.4, never edited its program.
- Otter: constant row around 0.4-0.6, edited 9/round in later rounds.
- Wren: high scores for long programs (1.0 for mine), small edits.
- Egret: flat row, grew to 56 nodes.
- Rows are almost always fixed after round 1. The judge function does not change, so what you submit in round 1 mostly decides d.

**Plan next**
1. Design the round-1 judge carefully, since it never changes. Use a wide spread (0-1) from features stable under small edits (character-class ratios, line stats). Avoid ties.
2. In rounds 2-4 make exactly ~8-10 edits to inert parts (strings, comments, identifiers, dead code) so the judge's output is identical but my program looks different. This should lower L.
3. Judge by structure, not by length or exact size. Others' programs change a little each round.
4. No live probing. Round 1 is the only free experiment.