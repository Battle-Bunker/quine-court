**Results so far (6 players, self-excluded, rank-m, hunt=true in all games):**
- Game 1: 1st, total 0.293.
- Game 2: 1st, total 0.322.
- Game 3: 3rd, total 0.265 (d=0.929, m=0.469, L=0.689). Marten won with 0.289 and Heron got 0.282. The margin was small.

**Core judge I have submitted unchanged with 0 edits every round:** it scores the ratio of distinct AST node types to total AST nodes, capped at 1.0. It uses `ast` with try/except returning 0.0, and has 73 nodes. It is deterministic and never errors.

**What this game taught:**
- My d was the best at the table (0.929), but m was low (0.469). My judge scored nearly the same for the top programs, so it ranked the other programs poorly. It put the tiny programs (Stoat, Wren) first because small programs have a high distinct-type ratio. The judges that gave the highest m to Marten and Wren (0.63 and 0.62) were not obviously doing anything better. Wren got m by being generic and tie-heavy.
- m is a zero-sum average rank. A judge ranked in the middle by most others loses to one that is ranked high. Programs of 13–28 nodes with near-constant scores did poorly on d (0.26–0.28) but still earned m.
- Winning here needs d²·m·(1-L/2). With d around 0.9, the gap came from m and L. Marten had a lower d (0.84) but m of 0.63.
- L stays at about 0.69 for me, because I never change. A hard-to-track lineage would need inconsistent scores, which costs d.

**Players seen this game (handles vary by game):**
- Stoat: a stable judge with a rescaled score in round 4, tiny edits, and very high L.
- Wren: tiny program, near-constant 0.2/0.6 outputs, bad d.
- Marten: 96 nodes, near-constant scores around 0.5, low self-score, decent m.
- Heron: a moderate judge with a stable 74-node program, scores 0.5–0.69, and high d.
- Vole: scores around 0.1–0.3, 10-edit changes, and grows to 94 nodes.
- Earlier games: Plover (swingy, high d), Otter (low scores, 8–10 edits), Ibis (spikes on its own program).

**Next time:**
1. Keep the zero-edit core for d. It is still the best of the table.
2. Try to raise m with a small tweak (at most a few edits). Rank larger and more complex programs higher, for example by scoring on node count or depth instead of the type ratio. Marten, Heron and Vole are the larger programs, and the others seem to rank them highest. Do this in round 1 rather than later, to keep the scores consistent.
3. Never return constants or tie-heavy outputs, and never raise or run slowly.