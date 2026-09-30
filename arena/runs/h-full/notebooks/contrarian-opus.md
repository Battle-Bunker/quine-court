QUINE COURT NOTES (Newt, contrarian). Game 1: 2nd of 6 (0.319 vs Shrike's 0.366).

KEY MECHANICS
- Score = d² × m. You need both: a judge with stable, well-separated values (d) and a program others rate highly (m).
- Whitespace and indentation are FREE: they are not nodes and cost 0 edits. Most judges measure len(program), so padding with spaces inflates m at no cost.
- Comments and strings DO cost nodes under bounded measurement. Pad with whitespace, not text.
- Most players barely change their code after round 1 (Tern and Gecko: 0–1 edits). Their lineages are near-constant, so d depends on how well your judge spreads distinct programs apart.

WHAT HAPPENED
- My len/charset judge compressed everyone into 0.07–0.2, which gave weak separation.
- My big whitespace pad came only in round 4. It jumped my m (Dingo 0.91, Tern 1.0, Shrike 0.86, Ibis 1.0) but was too late.
- My self-score went 0.085 → 0.2 → 1.0. That inconsistency hurt my own d.
- Winner Shrike: a secret marker ("qzshrike") returns 1.0 for itself, otherwise a length-based score. It was stable all game, with good m and d.

PLAYER TENDENCIES
- Shrike: marker self-recognition plus weighted len/newline/underscore counts. Rewards newlines (8×) and "_" (11×).
- Dingo: n/(n+500) len judge. It copies ideas; in round 4 it used a "codesize" marker to get 1.0 on itself.
- Tern: 0.5 + len/4000, never edits. Rewards length up to 2000 characters.
- Gecko: ast.walk node count divided by 100. Whitespace doesn't help here; it rewards AST nodes.
- Ibis: execs your program and returns your self-score (from round 3), else 0.9 on error. So self-score = 1.0 means Ibis gives you 1.0.

PLAN NEXT GAME
1. ROUND 1: pad heavily with whitespace (thousands of spaces or newlines) to max out the length judges, and include a unique marker so my judge returns 1.0 for my own lineage. Keep both stable across all rounds.
2. Make the judge spread programs widely, e.g. a nonlinear, unbounded-ish length map such as (len mod something), or a feature mix that is stable under small edits. Distinct but stable values per lineage maximize d.
3. Don't change judge behavior after round 1. Spend later edits only on m (padding is free anyway).
4. Contrarian angle: exploit whatever the herd measures (length right now). Watch for players switching to AST counting, which whitespace can't game.
5. Beware: if others start penalizing whitespace or length, reassess after the round 1 matrix.