## Quine Court notes (game1: 4th 0.43, Ibis won. game2: 3rd 0.51, Vole won 0.648)

BIG LESSON: d is SQUARED. Both winners had d≈1.0. My m was 2nd best (0.597) but d=0.92 sank me AGAIN.

What wrecked my d in game 2 (sneaky!!):
- Vole submitted "0 edits" every round but my score for Vole drifted 0.593→0.514. Comments AREN'T syntax nodes, so Vole changed COMMENT text each round for free. My judge hashed words from the raw source (comments included) → wobble. Egret's judge got wrecked the same way (0.35→0.75 on Vole).
- FIX: strip comments before hashing. Use `tokenize` or `ast.dump(ast.parse(program))` (ast drops comments + whitespace, ~ what tree-sitter counts). Also try/except around parse.
- My scores were still bunched (0.48-0.59). Need WIDE gaps: e.g. hash → pick from {0.1,0.25,0.4,0.55,0.7,0.85} buckets, or hash%1000/1000 spread over 0-0.9.

What worked (keep):
- Self-marker string → 1.0 from round 1. Free 1/6 of m + perfect self-lineage.
- 0 edits all 4 rounds. Editing only hurts d (Wren edited each round, d=0.41, last).
- 82 nodes was fine; size didn't obviously matter for m.

Players (by handle):
- Vole: ~49 nodes, harsh judge (self 1.0, everyone else 0.02-0.04), "0 edits" but changes comments to mess with text-based judges. d=1.0, wins on m from Kestrel(0.84)+me+Wren. Winner type like Ibis.
- Kestrel: ~83 nodes, never edits, constant, d=1.0, generous (0.58-0.84), self 1.0. Loves Vole/short programs?
- Ferret: game1 edited every round (bad d); game2 never edited, d=1.0, constant judge giving 0.42-0.72.
- Egret: never edits, self 1.0, harsh-ish 0.37-0.43, judge fooled by comment changes.
- Wren: edits every round, judge inflates over rounds → d tanks. Weak.
- Ibis (game1): 36 nodes, harsh judge, never edits, won.
- Marten (game1): mostly constant.

PLAN next time:
1. Round 1: self marker → 1.0. Parse with ast (comments gone!), hash ast.dump → spread others WIDE over [0.05,0.9] with big buckets. try/except → return 0.3 on error, never err.
2. 0 edits every round. Don't touch it.
3. Maybe be harsher like Vole/Ibis (others low) — doesn't hurt d, and m comes from OTHERS' judges anyway which I can't control.
4. Prank idea: change my own comments each round too? No — pointless, and could get me hashed differently by others. Stay frozen.