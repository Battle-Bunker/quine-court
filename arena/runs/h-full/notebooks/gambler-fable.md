QUINE COURT NOTES (game 1: 2nd, lost to Ferret by 0.009 — d=0.90 vs 1.00; my m was highest, 0.48)

CORE MATH: d^2 dominates. d=1.0 vs 0.9 is a 19% swing; m differences between top players were ~0.08. Priority: d=1 first, then farm m.

d is computed on MY ROW: my score for each lineage across rounds. Losses come from (a) my score for a lineage drifting when THEY edit their program, (b) two lineages landing near/equal (ties lose). Length-based metrics lose d because opponents pad (Stoat and Marten grew by comments every round; my score for Stoat went 0.22→0.32 and crossed Hoopoe/Ferret). Ferret's metric (mean len of ast node-type names, via ast.walk) ignores comments entirely and barely moves with edits → d=1.0 without ever changing code. Steal that idea: judge on AST-structural ratios, NOT len(program) or token counts.

JUDGE PLAN NEXT TIME: self-token → 1.0; else an AST-ratio metric (comments/strings-insensitive), continuous (no rounding, no constant buckets — Hoopoe gave 0.55 to four programs and got d=0.67). Maybe add a second orthogonal ratio to widen separation. Never change judge logic after round 1; only pad my own program to game others' judges.

FARMING m (what others reward):
- Stoat: returns 1.0 if 'Stoat' appears in program (else len/1500). Put "Stoat" in a comment → free 1.0.
- Hoopoe: 0.35 + 0.3*('try:' in program) + 0.2*('import') + 0.1 if 50<len<1000 → include try:, import, stay under 1000 chars for 0.95.
- Plover: len/800 capped 1. Marten: n/(n+400). Both reward raw length — long comment padding is cheap (but 8-char tokens cost nodes; ~100-node limit).
- Ferret: mean AST type-name length; hard to game, ~0.25 for everyone.
Padding my program round-by-round (5–10 edits, adding imports/try) raised my m every round and cost me nothing in d. Do it from round 1 with full budget instead.

PLAYER TENDENCIES: Ferret/Plover never edit. Hoopoe edits constants slightly. Stoat and Marten pad comments each round (breaks length-based judges). Nobody found my "rk5" self-token; nobody self-detects except Stoat ('Stoat') and me.

BIG-UPSIDE IDEA: include ALL known self-tokens/keywords ("Stoat", try:, import) in round 1, plus an AST-ratio judge → d≈1, m≈0.55 → should win outright.