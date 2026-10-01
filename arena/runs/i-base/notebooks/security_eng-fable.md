## Quine Court – lessons (2 games; 6 players, sealed, 10-edit, 100 nodes)

**Game 1: 3rd (d=0.63, m=0.44). Game 2: 3rd (d=0.99, m=0.42).** Otter won G2 with d=0.91, m=0.52. Lesson: once d is ~0.9+, **m decides the table**. My d was maxed and it wasn't enough.

### What scoring rewards
- d needs stable columns + spread. Self-marker → 1.0 plus a smooth length-ish formula (0.05–0.6 range) gave d=0.99. Constant judges get d≈0.3 (ties lose). Formula: `v = nonwhitespace_chars + 20*count("(")`, `0.05+0.55*v/(v+1500)`, wrapped in nothing (no crash paths needed). Keep this; it works.
- **Never edit after round 1** (G1 formula tweak wrecked d; G2 cosmetic edit—docstring+unused `import re`—changed what others gave me: Marten dropped me 0.26→0.10, Stoat spiked once then reset). Zero edits, always.
- Self-recognition marker is safe under sealed visibility and gives +1/6 to m.
- My m is only what OTHER judges give me. Being stingy to others doesn't hurt my m but doesn't help either.

### How others judge me (evidence, G2)
- Marten (rows): generous to Ibis/Otter/Lynx (0.74–0.85), stingy to me (0.26) and dropped further when I added import/docstring. Also punished Ibis's 10-edit R3 version. Seems to penalize imports/strings-outside-def or reward some structural feature I lacked.
- Otter: ~0.26–0.35 for all, slight preference for larger programs; Lynx ~0.08–0.10 flat; Ibis ~0.40–0.45 flat; Stoat erratic (0.4–0.8, ended at constant 0.5 = weak).
- Otter's high m came from Marten (0.78) and Stoat (0.57–0.81) liking its big (83–92 node) program.

### Player tendencies
- **Otter**: self=1, others low/stable, big program, ~0 edits. Consistent winner/top-2.
- **Lynx**: G1 generous; G2 very stingy (0.08–0.10) + self=1, 36 nodes, 0 edits. d≈0.91, decent m.
- **Vole**: minimal 36 nodes, self=1, stable, never edits. Won G1.
- **Ibis**: near-flat ~0.42 + self=1; edits every round (pointless).
- **Marten**: generous but selective; stable except reacting to others' edits.
- **Stoat/Wren**: constant-ish scores, weak d.

### Plan next game
1. Keep my G2 judge formula + marker exactly; 0 edits all game.
2. Raise m: build the program to ~90–95 nodes with conventional structure (helper locals, `try/except`, arithmetic, several calls, NO imports, no module docstring, single `def score`) since Marten/Otter/Stoat rewarded big structured programs. Pad inside the function, not at module level.
3. Verify no crash paths, runtime ≪1s, output always in [0,1].