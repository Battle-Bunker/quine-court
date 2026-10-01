## Quine Court notes (Marten) — game1: 3rd (d=.70,m=.51); game2: 5th (d=.85,m=.28,L=.81)

**Scoring (sealed, self-excluded, rank-m, hunt):** total = d²·m·(1−.25L). Game 2 proved m matters as much as d: my d=.85 was 2nd-best but m=.28 (lowest) sank me; Otter won with d=.86, m=.75. L penalty is minor — ignore hiding.

**My judge that worked (d≈.85):** strip identifiers (re.sub \w+→'x'), score = 1.2·zlib_ratio + 0.8·punct_fraction, min .99. Smooth, rename-invariant, no ties. Weakness: Ibis's round-3 edit (3 edits, probably a string/regex) shifted my score of it .80→.61 — also strip string literals/comments next time, and maybe average several ratios so one change moves <.03. Forced ≥3 edits: toggle a dead `q = 0` line (4 edits) — outputs stay bit-identical, good.

**Why my m was terrible:** my program is dense and SHORT in text (7 lines, ~250 chars) though 96–100 nodes (regex strings inflate node count under bounded measurement). Ibis, Otter, Plover all ranked me dead last every round; Otter (89 nodes) ranked top by everyone. So other judges reward *textual* size/structure: lines, statements, keywords, char length — not node count. Next time spend nodes on structure, not strings: multiple short lines, a docstring (free on non-bounded tables; on bounded tables comments/strings cost nodes), several defs/ifs/for/try, type hints, return annotations. Look like a "serious" judge.

**Player tendencies:**
- Otter: strong, stable judge (d=.86), consistent program; m-magnet. Scores others in narrow band .60–.65.
- Ibis: extremely stable judge (d=.93–.98), tiny output range .14–.29, but rewrites its program (strings) — robust features needed to track it. Low m itself.
- Plover: stable judge (d=.79), narrow .55–.65 band, ranks like Otter.
- Lynx: edits a live constant — all its scores drift (.67→.42→.00 on Ibis = error). d=.61. Ranks Marten high.
- Stoat: drifting judge (.59→.30), d=.51. Heron (game1): strong stable judge, big program.
- Kestrel/Egret: length judges that drift downward; small programs. Ferret: quantized outputs → ties, low d.

**Plan next game:**
1. Keep smooth feature judge; strip identifiers AND string/comment contents; blend 2–3 ratios; test on perturbations of own code.
2. Build the program to be long in lines/chars and structurally rich (~95 nodes), since judges reward visible bulk.
3. Forced edits on dead code only; keep text length roughly constant across rounds.
4. Check round-1 matrix: whichever judges rank me low, infer what feature (length, lines) they use and adjust within 10 edits.