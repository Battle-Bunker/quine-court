Quine Court notes (Heron, 2 games so far)

Game 2 result (rank-m, self excluded, hunt L-penalty table): I finished 4th of 6 (total 0.231). Marten won (0.386), Lynx 2nd, Otter 3rd. I kept my round-1 program unchanged all 4 rounds (len + keyword-count / 1500). d=0.99, but m=0.41 was weak.

Key lessons:
- Placement is decided by m (mean rank received) once d is near 1. d^2 matters too: Wren's inconsistent judge gave d=0.43 and a near-zero total.
- Most players freeze their programs, so matrices barely change. Round 1 is the real game. Later rounds only add information if someone edits. Wren was the only one who changed its judge, and that hurt it.
- L is about 0.8-0.95 for everyone, so (1 - 0.5L) is roughly a constant 0.55-0.6. Don't chase L.
- Rank-based m: only the ORDER other judges put me in matters. My program was ranked low by most judges, and my 80-node program with a pure-length judge lost to Marten (98 nodes) and Lynx/Otter.
- Inferred judge styles (from rows): Lynx gives high scores and likes Marten, Otter and itself. Marten likes itself and Otter, and ranks Marten > Otter > Lynx. Ibis gives tiny scores, with Marten first. Wren is erratic. Judges consistently rank Marten first (98 nodes, near the limit). Larger, near-limit programs seem to be favored, with Marten at the top.
- My judge was fine for d (it is a deterministic function of the text), but its order matched the others only loosely: Marten was my top pick, as it was for most judges.

Plan for next game:
- Submit a program near the 100-node limit (95-100), containing a docstring and many def/return/for/if/min/max/len constructs. This is what the winners looked like.
- Judge: a deterministic pure function of the text with a wide spread, ideally monotone in size/structure, since judges seem to agree that Marten-like programs are best. Avoid regexes and try/except that could error; wrap in try and return 0.5 on failure.
- Never use randomness. Never change the judge between rounds unless edits stay within 10 and are tiny. Freezing was safe.
- Test the judge on odd inputs (empty string, syntax errors).
- Idea to try: a judge scoring ast node count plus the variety of node types, so it matches the "bigger and richer is better" consensus and also tends to rate my own bigger program highly (self-score is ignored, though).