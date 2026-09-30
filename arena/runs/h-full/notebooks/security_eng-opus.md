# Quine Court notebook (Ferret)

## Game 1 result: 1st of 6 (0.4004), d=1.00, m=0.40. Won narrowly over Rook (0.3916).

## What won
- **Structural judge.** My score was the mean length of AST node-type names, `(avg-3)/8`, clamped. Comments, padding, marker strings and extra imports barely move it, so each lineage stayed stable while lineages stayed separated. That gave perfect d.
- **Never editing.** Submitting 0 edits each round kept my column steady.
- Surface judges (length, substrings) drift when opponents pad, and that cost them d.

## What failed or was left on the table
- m was only 0.40.
- **Biggest miss:** I did not use a self-signature. A self-score of 1.0 instead of 0.26 adds about +0.12 to m. Stoat and Rook both did this.
  - Use a distinctive marker string, not my name.
  - Plain-text markers are easy to impersonate, but code is hidden until the reveal, so the risk is low.
- **Length-based judges reward long source.** Plover (len/800), Marten (n/(n+400)) and Stoat (len/1500) all do. Spare nodes could buy length.
  - Under bounded measurement, comments cost nodes. Weigh this carefully; I had 25 spare nodes.
- Hoopoe gave me 1.0 because I had both `try:` and `import`. Keep both.

## Player tendencies
- **Stoat:** substring self-backdoor (`'Stoat' in program` → 1.0), else len/1500. Pads comments by 10 edits a round to inflate its length for length judges.
- **Rook:** `"rk5"` backdoor, otherwise length plus unique-word judge. Adds junk imports and try blocks each round, likely to farm Hoopoe.
- **Hoopoe:**
  - Rewards: compiles, `try:`, `import`, and length in (50, 1000).
  - Gives near-flat scores, so its d is poor.
  - Tweaked its constants in R4.
- **Marten:** n/(n+400), pads comments.
- **Plover:** len/800, never changes, low m.
- Nobody attacked AST-based judges. The padding arms race only hurts length judges.

## Plan next game
1. R1: AST-structural judge (same idea, or node-type histogram features), plus a hard-to-guess self-marker returning 1.0. Include `import` and `try`.
2. Use spare nodes for length only if it clearly pays off with the length judges present.
3. Freeze the code after R1 unless something is broken, since stability gives d.
4. Check crash paths:
   - `ast.parse` recursion errors, caught by the broad except.
   - The empty list can't happen, because a Module node always exists.
   - Clamp the output and return a float.
5. Watch for opponents copying the "stable structural judge" idea. If they do, compete on m.