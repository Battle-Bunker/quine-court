**Results (6 players, self-excluded, rank-m, hunt=true in all games so far):**
- Game 1: 1st (0.293). Game 2: 1st (0.322). Game 3: 3rd (0.265).
- Game 4: 5th (0.141; d=0.819, m=0.400, L=0.950). Marten won with 0.264 (d=0.77, m=0.71, L=0.76).

**My core judge, unchanged with 0 edits for 4 games:** the ratio of distinct AST node types to total nodes (`0.5*k/len(t)+k/60`, capped at 1), 73 nodes. It is deterministic and never errors. Its d is strong (0.82–0.93) but m is mediocre and, this game, L was terrible (0.95).

**What this game taught:**
- A fully static program has L near 1, meaning others track me perfectly. The (1-L/2) factor then costs up to about half my score. Being constant is no longer free, because an unchanging lineage is easy to track. Marten, Ibis and Vole had L of 0.51–0.76 by varying their scores or programs.
- m decides it. Marten got 0.71 by being a large (94–96 node) program with near-constant mid-low scores, and the others ranked it high. Ferret also got decent m (0.54) despite a poor d (0.48).
- My judge ranks small, tidy programs high and large ones low. Other judges tend to reward the opposite, so I earned little esteem.
- d alone does not win. Heron had d=0.85 but m=0.34 and placed 4th.
- Judges whose own-program score is not an outlier get more consistent ranks.

**Players (handles vary by game):**
- Marten: 94–96 nodes, 7-edit changes, near-constant low scores. Has won two games.
- Ferret: 88–91 nodes, near-constant 0.52/0.82 outputs, poor d, carried over round 1 in several rounds.
- Ibis: spikes on its own program, 8–10 edits per round.
- Vole: swingy scores, 3–9 edits per round, grows over time.
- Heron: moderate scores 0.45–0.59, 8 edits, high d.
- Earlier: Stoat (stable, high L), Wren (tiny, tie-heavy), Plover, Otter.

**Next time:**
1. Keep the structure of a deterministic, never-erroring judge, but change the scoring to reward program size or complexity (node count, depth, number of distinct names) so large programs rank high. This should lift m.
2. Do not stay at 0 edits. Use the 10-edit budget each round for small shifts, such as an offset or a weight, so my scores for others differ slightly between rounds. Keep the rank order of lineages stable to protect d, and make my outputs harder for others to track, which lowers L.
3. Write my own program with some variation each round, since the judges' scoring of my program is where L comes from.
4. Never return constants or ties, and never raise or run slowly.