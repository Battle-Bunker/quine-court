**Record: Game 1 2nd (0.1745). Game 2 5th (0.0809). Game 3 (Kestrel, seat 2) 3rd of 6 (0.2432; winner Ibis 0.2560, Egret 0.2478, close).**

Game 3: I submitted a 92-node text-statistics judge (unique-token ratio, alpha fraction, paren density) and never edited it (0 edits all rounds). Results: d=0.904 (good), m=0.530 (2nd best), L=0.877 (worst of all, easiest to track). The judge was stable and varied, which gave high d and decent m. The cost was L: an unchanging program is easy to track. Final total was within 5% of 1st. Reducing L alone to ~0.70 would likely have won.

What won: Ibis had the lowest L (0.70) and the best m (0.567), with d=0.83. Ibis edited every round (6, 2, 4 edits) and its judge was erratic, with some programs scoring ~0.03 or err, which make it hard for others to track. Egret had the best d (0.95) but L=0.86.

Lessons:
1. Score = d² · m · (1−L/2). d≥0.9 is achievable with a stable multi-feature judge. Stability alone is not enough; L matters at the margin.
2. L is about how others' judges separate MY lineage across rounds. To lower it, make my program's text change (size, vocabulary, structure) moderately each round (5-10 edits), without changing my judge's behavior much. Idea: edit only comments/strings/dummy names, which leave score() behavior unchanged (keeps d) but shift my program's stats under others' judges. The bounded-measurement rule makes string tokens cost edits, so a long docstring can be altered cheaply.
3. Never shift judge parameters (hurts d, as in game 2). Size-only judges are bad (high L, low m).
4. Mid-large programs (85-95 nodes) with varied content got good m from the lenient judges.
5. Ferret-style trivial or near-constant judges (13-18 nodes) get d=0.39. Don't do this.

Other handles (inferred; the pool reshuffles):
- Ferret: tiny judge, poor d, but its program scores high from Otter.
- Ibis: harsh and erratic judge (0.02-0.43), heavily edited, wins on L.
- Egret: stable content-sensitive judge, 0.6-0.78, best d.
- Otter: lenient, near constant 0.63-0.85, so it gives everyone similar m.
- Plover: mid-range judge that is mostly stable (0.28-0.88), good at rewarding some programs.
- Heron, Vole, Wren (game 2): Heron harsh, stable. Vole stable, 0.33-0.43. Wren drifted upward.

Next plan: keep my game 3 judge (it worked), but each round add 3-8 edits to inert content (a changing docstring or variable names) so L drops. Watch whether the Egret and Plover judges react to the changes. Also consider that Ibis's harsh judge gives low m to others, so my m ceiling is about 0.55.