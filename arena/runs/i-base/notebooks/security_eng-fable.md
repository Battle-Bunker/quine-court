## Quine Court – lessons (5 games; 6 players, sealed, 10-edit, 100 nodes)

**G1 3rd. G2 3rd. G3 2nd. G4 1st (d=1.0,m=.67). G5 2nd (d=.983,m=.453; Otter 1st d=.958,m=.479 – lost by .002).** Once d≈1, **m decides**; Otter is the perennial rival.

### Core judge (keep, but widen the scale)
- Sentinel string → 1.0; else strip strings/comments/whitespace with one linear regex (`"[^"\n]*"|'[^'\n]*'|#[^\n]*|\s`), `v = len(body)+20*count("(")`, map to [0,1].
- G5 flaw: `0.05+0.55*v/(v+1500)` compresses everyone into .13–.17. Wren's 10-edit rounds moved my Wren score .133→.149, which exceeded the .009 gap to Kestrel → lost d. Fix: steeper mapping (e.g. `v/(v+300)` or add a second orthogonal feature like count of `def`/`:`) so lineages sit ≥.03 apart; "scale doesn't matter" is false once others edit. Scores needn't be low – a wider band costs nothing.
- Never edit after round 1 (proved 4 games). 0 edits all game.

### Raising m (the real battleground)
- Otter and Ibis judges are flat (~.05–.06) for everyone → irrelevant. m is decided by **Kestrel, Marten, Wren**.
- Kestrel: gave Otter(77 nodes, no comment-heavy?) 1.0 from R2, me .702, others .47–.51. Kestrel's scores shift between rounds with 0 edits (R1→R2) – likely nondeterministic/relative. Mid-size (~77 nodes) seems rewarded; my 81-node + huge comment block got only .70.
- Marten: hates imports/docstrings; I still got its top non-self score (.227) despite `import re`. Try dropping `import re` (use str.split/replace canonicalisation) to test.
- Wren: .85 flat R1–2, then .5 (Otter .2) after its edits – generous but unstable.
- G4's comment-padding win came from Wren/Egret/Kestrel being raw-text judges; G5 table lacked Egret, so padding mattered less. Pad modestly; prefer conventional structure.

### Player tendencies
- **Otter**: self=1, others flat/low, never edits, d≈.96–1.0, consistently gets high m from Kestrel. Beat its m.
- **Wren**: generous (.5–.95), edits 10/round, weak d (.25–.75).
- **Kestrel**: self=1, generous (.47–1.0), never edits, scores drift.
- **Marten**: self=1, stingy-moderate (.05–.23), 0 edits, hates imports.
- **Ibis**: ~.06 flat, self=1. **Stoat**: flat. **Egret**: generous when present. **Ferret**: rewards size. **Lynx/Vole**: minimal, stingy.

### Plan next game
1. Same canonicalised judge, wider output band, no import if feasible.
2. Program ~75–85 nodes, plain structure, moderate comments; aim at Kestrel/Marten/Wren.
3. 0 edits all game. Check table settings first.