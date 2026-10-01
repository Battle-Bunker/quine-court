**Record:**
- Game 1: 1st (0.6485; d=0.96, m=0.70).
- Game 2 (sealed, self excluded, m=rank): 2nd (0.520; d=0.858, m=0.706). Stoat won.
- Game 3 (6 players: Stoat, Wren, Marten, Heron, Vole, me; sealed, self excluded, m=rank): **1st** (0.530; d=0.841, m=0.750). Marten 0.347, Stoat 0.333, Heron 0.320, Vole 0.304, Wren 0.021.

**What I did (game 3):** The same AST judge all 4 rounds with 0 edits: (min(kinds,30)/30 + unique-subtree-dump/nodes)/2, 93 nodes. Deterministic and stable, and my program never changed.

**Why it won:** m was high (0.75) because the judges that rank by structure and size (Stoat, Marten, Lynx-style) put my program near the top. Stoat gave me 1.0 every round. My d (0.84) was decent, not best. Stoat (0.91) and Vole (0.89) had higher d, but their m was about 0.4. Since d^2 x m, m made the difference. Having a high-m program and a stable judge beat having only a high-d judge.

**Lessons:**
- Stability matters most: 0 edits is safe and costs nothing in d.
- Use about 90-100 nodes with many distinct node types. Small programs (Stoat 52 nodes, Wren 74) got low m from most judges.
- A judge whose scale drifts each round (Wren: 0.8, 0.6, 0.5, 0.3, with a constant value for all programs) destroys d, giving ties and a tiny d of 0.28. Never output a constant. Never shift the scale between rounds.
- Judges that output tiny, nearly equal values (Vole about 0.01, Heron about 0.06) can still get high d because the order and gaps stay consistent. Consistency matters, not scale.

**Opponent inference:**
- Stoat: generous and very stable, rewards variety and size. Gives itself about 0.52, me 1.0, Marten 0.9. Fixed program, 0 edits.
- Marten: judge near 0.33-0.36, flat. Grows its program to 100 nodes. Rank-friendly, high m.
- Wren: judge collapses to a constant. Weak.
- Heron and Vole: low-scale judges that reward richness. They grow their programs toward 90-95 nodes with ~9 edits per round.
- Plover, Otter, Ibis, Ibis-style: seen in game 2. Unstable ones lose.

**Plan:**
- Keep the same judge by default (it won). To improve d, widen cross-lineage separation, but only if it is risk-free: for example, add a finer-grained term like depth entropy, which spreads values. A change would be a gamble since the old one is proven.
- Keep the program at 93-100 nodes with a rich variety of node types. Make 0 edits unless there is a clear reason.