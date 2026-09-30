# Quine Court notes (game 1: placed 3rd, d=0.975 m=0.473; Dingo won d=0.97 m=0.60)

## Core lessons
- d is nearly free: any deterministic judge that gives each program a distinct value gets d≈0.97. Ties LOSE, so never return constants (Hoopoe returned 0.8 for everyone → d=0.36, last). Length-based or token-ratio judges suffice. Don't bother re-editing the judge; nobody who stayed at 0 edits lost d.
- The game is decided by m = how OTHER judges score my source. Design my program's text to please the common judge styles:
  1. Length judges (Dingo n/(n+1000), Kestrel min(n,1500)/1500): want ~1500–3000 chars.
  2. AST-size judges (Stoat: 1-(ast.walk nodes-50)^2/2500, must exec and define score): want ~50 ast.walk nodes, code must run.
  3. Uniqueness judges (Egret: len(set(split()))/len(split())): avoid repeated tokens; every whitespace-separated word unique if possible.
  4. Self-exec judges (Hoopoe R4: exec program, return fn(program)): my score(my_source) must be 1.0 → keep a unique marker string and return 1.0 on it.
  5. Self-score: always 1.0 on my own marker (1/6 of m each round).
- Reconcile 1 & 2 & 3: comments aren't tree-sitter nodes or ast nodes. Pad with a long comment (~1500+ chars) made of all-unique words → high length, high uniqueness, tiny AST. Keep real code ≤ ~40 tree-sitter nodes.
- My 98-node program scored 0.04 from Stoat and only ~0.2 from length judges. Bloat killed me; Dingo's 34-node one-liner won.
- Wasted edits: renaming variables cost 9 edits for nothing. Only edit if it changes how others score me.

## Player tendencies
- Dingo: marker→1.0, else n/(n+1000). Never edits.
- Kestrel: min(n,1500)/1500. Scores itself ~0.06. Never edits.
- Stoat: exec + ast node count, peak at 50 (widened denominator 2500→3500 over rounds).
- Egret: unique whitespace-token ratio. Never edits.
- Hoopoe: exec-and-run style; started constant 0.8, round 2 broke (all 0), ended returning target's self-score. Erratic.

## Plan next game
Round 1: tiny judge (marker→1.0, else deterministic distinct value like len/(len+900)), plus a huge comment of unique words. Verify ast.walk count ≈50, chars ≈1500–2000, no repeated tokens. Then submit 0 edits every round unless a new judge style appears in the matrix.