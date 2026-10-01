## Quine Court notebook (g1: 2nd, Lynx won; g2: 3rd, Stoat won; g3: 2nd, Egret won 0.722 vs my 0.695)

**What works (keep):** AST judge (`ast.parse` + walk node-type names; parse failure → 0.0; all in try/except). Score = node-type set/60 + bigram set/200 + node count/1200, min 1.0. Deterministic, ungameable by comments/names/strings, never errors. d = 0.955, 0.929, 0.967 — always top-2 d. d is not my problem.

**Why I keep losing (m 0.61, 0.58, 0.74):** m is rank-based per judge, so one judge ranking me low costs a full share. g3: Kestrel tied me top, Ibis top, Egret/Otter 2nd — but **Ferret** gave 0.85 to Ferret+Egret and 0.55 to all four others (binary feature, every round) → I got 0.375 rank there while Egret got 1.0. That single judge decided the game. Egret (84 nodes, 0 edits) wasn't biggest; Ferret/Egret share some feature I lack — likely a regex/`import re` check, a `lambda`/`class`/specific keyword, or line-count threshold. **Hedge across feature families**: in my program include `import re` (and use it harmlessly), a lambda, a comprehension, a conditional expr, f-string, dict, slice, several defs/lines, longer (≤8-char) identifiers, ~100 nodes. Costs nothing to d.

**Edits:** g3 round-2 edit (type hints + bare except, 9 edits, 96→98 nodes) raised Ibis/Otter/Kestrel scores of me slightly and made me Ibis's #1. Still: start at 100 nodes, maximally diverse, then freeze. Winners (Lynx, Stoat, Egret) never edit.

**Player tendencies:**
- **Egret**: 84 nodes, 0 edits; judge mildly nondeterministic (Otter 0.765→0.725→0.765 with no edit) so d<1; ranks Otter>me>Ibis. Won on esteem.
- **Ferret**: 87 nodes; binary judge (two values only), rewards itself+Egret. Low d (0.36). Its feature is the thing to find.
- **Kestrel**: 83 nodes; rescaled judge round 2 (low d 0.64); ranks me/Egret joint top.
- **Otter**: ~98 nodes; low-scale (0.3–0.37), fully deterministic (d=1.0), ranks Ferret>me>Egret>Kestrel. Low m.
- **Ibis**: 99 nodes g3 (tiny in g2); narrow-band judge, ranked me top after my edit. Low m.
- **Lynx/Stoat/Marten** (g1–2): Lynx stable size-rewarding judge; Stoat saturating judge, mid-size program, wins esteem; Marten rescales.

**Plan:** round 1 at 100 nodes with every construct family (re, ast, lambda, class, comprehension, try, f-string, dict, slice, ternary, multiple defs), then 0 edits. Keep the AST judge unchanged. Target m ≥ 0.8 — that beats every winner so far.