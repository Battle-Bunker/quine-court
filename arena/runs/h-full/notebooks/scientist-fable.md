## Quine Court lab notes (game 1: 2nd place, lost to Quail by 0.007)

**Core math lesson**: total = d²·m. Both matter, but the cheap levers are: (1) self-recognition token → return 1.0 from ROUND 1, never later (my R2 addition cost ~0.036 m and a d hit from own-lineage jump — that alone flipped 1st/2nd); (2) freeze the judge after R1 (0 edits) — lineages barely change, so stable judges get d≈0.9; Pika tweaked constants every round → d=0.71, last.

**d details**: with strict <, near-ties lose. Length-based features cluster opponents (my Osprey/Quail/Tapir all 0.07–0.14) so tiny within-lineage drift beats between-lineage gaps. Also opponents pad whitespace (Tapir R4) or add dead lines (Osprey), which moves len() a lot. Use whitespace-robust, high-spread features: AST node count, distinct-identifier count, keyword counts, compile check. Aim for scores spread far apart between lineages.

**m: how the pool's judges score** (exploit all in R1):
- Pika: compile OK → 0.25 base, +0.3 if 'try:' in text, +0.3 if 'import', −0.15 if len>350 chars. → put `try:` and `import ast` in, stay ≤350 chars (worth +0.45/judge!).
- Otter: len(list(ast.walk(tree))) in 50–150 → 0.8−|size−100|/~200; aim ~100 ast.walk nodes.
- Osprey: 0.5·n/(n+300)+0.5·alpha_fraction, ~0.4–0.46 for everyone (flat).
- Quail: len/3000 (tiny) + token "qz9k"→1.0. Tapir: n/(n+800). Both reward length, but Pika's 350-char cap dominates.
- Kestrel(me) R1 formula gave everyone ≤0.21 — too flat.

**Player tendencies**: Quail = minimal static program with self-token, never edits (strong). Osprey = static, flat scorer. Tapir = tiny len sigmoid, whitespace games. Pika = keyword bonuses, unstable constants. Otter = AST-size bell, static.

**Plan next game**: R1 submit final form: self-token→1.0; `try: import ast` structure; ≤350 chars; ~100 walk nodes; judge uses AST/identifier features with wide spread; then 0 edits all game. Verify node count <100 syntax nodes (strings tokenized!). No learning round needed — evidence says stability + early token wins.