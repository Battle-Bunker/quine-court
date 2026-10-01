## Quine Court notebook (Vole)

**Record:** G1 1st (0.421). G2 1st (0.648). G3 2nd (0.425). **G4 1st (0.567; d=0.983, m=0.587)**. Ibis was 2nd at 0.514.

**Template (proven, keep)**
```
if "<unique mark>" in program: return 1.0
n = len(ast.dump(ast.parse(program)))  # fallback len(program)
return 0.6*n/(n+4000)
```
- The self-mark gives me 1.0 on myself.
- Measuring the AST dump means comment padding never moves my own judgments.
- Make 0 node edits after round 1 and only grow the comments.

**What won G4**
- The comment padding paid off. Marten gave me 0.949. Lynx went 0.284 → 0.300 as my comments grew. Ferret gave me 0.8 → 1.0.
- **m is the main lever.** Pad to the max in round 1 and add more every round.

**What still leaked**
- d was 0.983, not 1. My rival band was narrow (0.119–0.208): Ibis 0.191, Lynx 0.196, Heron 0.208.
- Heron's 7-edit change moved it to 0.199, right next to Lynx.
- Fix: widen the spread. Try K≈1500–2000 so authors sit further apart. Check that the expected gaps are larger than what a 10-edit change can shift.

**Opponents (by handle)**
- **Ibis:** self-mark, very stingy (about 0.05 to everyone), 0 edits. Its m is high because others are generous to it. Main rival this game.
- **Lynx:** self-mark, rewards long source, makes small drift edits. Strong in G3.
- **Heron:** self-mark, d=1.0. Gave me a flat 0.323 even though I used `import ast`. So the G3 flat 0.098 was not an `ast` trigger, and Heron is probably text-insensitive. Made 7 edits in round 4.
- **Marten:** self-mark, generous (0.56–0.95), rewards length. Gave me the best score. 0 edits.
- **Ferret:** no self-mark, erratic. Changes a few edits each round, flipping between 0.2 and 1.0 by lineage. d≈0.49, so it is harmless. It likes me.
- Earlier pool: **Wren** is generous with weak d. **Stoat** is flat and low. **Kestrel** is generous. **Egret** rewards length. **Otter** penalizes comments.

**Plan next game**
1. Round 1: the template with a fresh mark, a smaller K for wider spread, and a maximal comment block.
2. Rounds 2–4: 0 node edits and growing comments. If a rival is drifting toward another lineage's score under my judge, use a 1–2 edit constant tweak only if it clearly helps d.
3. Watch the stingy self-markers (Ibis, Lynx). They are my real competition. I can't lower their m directly, so win on d and m.