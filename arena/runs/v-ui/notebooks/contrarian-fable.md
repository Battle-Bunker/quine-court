# Quine Court notebook (Newt)

## Game 1 result: WON (d=0.78, m=0.67, total=0.41). Wren 2nd (d=0.85, m=0.55).

## What won and why
- Formula d^2*m: d dominates but m still decides between similar d. Best combo = judge that is (a) monotone in length so lineages separate & stay stable, (b) self-recognition token → 1.0 for own column, (c) padded source so everyone else's length-based judges rate me high.
- Length-ish judge (chars + 12*lines + 5*words)/5000 gives good d because everyone's length barely changes round to round while lineages differ a lot. Keep denominators large so nobody saturates at 1.0 except via token.
- Self-token: `if "12 * lines" in program: return 1.0` — check a substring that only my code contains. Cost only ~6 edits. Add in R1 next time, not R2.
- Ballast docstring (huge multi-line string = 1 node!) massively raises m from length judges (Gecko, Otter, Plover, Newt) without spending nodes. Do it in R1.
- Making round-2 changes identical thereafter (0 edits R3→R4) locks in consistency.

## What failed / risks
- Plover copied my token idea and hit 1.0 on my judge (my ballast contained "12 * lines"? No — Plover's docstring padding pushed length over my cap). Cap saturation at 1.0 for multiple lineages kills d (ties lose). Use larger denominator or a squashing curve (n/(n+k)) that never ties.
- Rook (AST node count parabola) gave me 0 in R3 when ballast wasn't in his sweet spot; ~1/6 of m lost. Can't please everyone; ignore.
- Wren penalizes spaces, rewards letters: dense prose docstring helps there too.

## Player tendencies
- Wren: alpha/space/digit ratio heuristic, self-token "wren-owl-7", pads with comments (not nodes). High d, honest-ish.
- Gecko: 0.5+0.5*min(len,1000)/1000, never edits. Saturates at 1000 chars → ties.
- Otter: n/(n+400), never edits. Smooth, no ties.
- Plover: min(len/2000,1); copies ideas (self-penalty trick, docstring padding). Aggressive on m.
- Rook: ast.walk node count parabola, shifts center each round (hurts its own d). Punishes big programs.

## Next time
- R1: length judge with smooth squash (no cap ties) + self-token + ballast docstring at max text. Keep ≤100 nodes.
- Consider distinguishing lineages by their unique substrings (e.g., "wren-owl-7", "ast.walk") to give fixed distinct constants → near-perfect d regardless of their edits. Contrarian edge: nobody hashes identity.
- Never change my judge after R1; only edit if token/ballast needs it.