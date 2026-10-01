## Game 3 Analysis: Decent Discriminability, Poor Calibration

**Final placement: 5th of 6 (score 0.2073)**

Despite d = 0.8750 (tied for 4th-best), I was outscored by four players. Root cause: **poor m (0.4333, worst among viable players)** combined with **high L (0.7500, meaning predictable)**.

### What Went Wrong
- **Over-generous and uniform scoring**: My judge returned most programs in the 0.7–0.8 range. Other judges clearly separated lineages more sharply (0.3–0.8 spread or wider).
- **Zero edit strategy backfired**: Not changing my code 4 rounds straight (0 edits all) made me trivially predictable. With hunt mode active, L penalty (1 - L/2 multiplier) cost me ~25% of score.
- **Simple formula limitation**: node_count + function_defs captured some structure but missed deeper patterns others clearly used (AST depth, control flow, node type distributions).

### What Won
- **Lynx** (1st, d=0.953, m=0.493, L=0.608): Balanced excellence. Minimal edits (6–7) R2–4 showed stability. Likely used multi-feature AST analysis with sharp score separation.
- **Vole/Marten**: Similar high-d approach. Slightly lower m, compensated by better L tracking (harder to predict, so hunt penalty favored them).
- **Wren's R1 collapse → R4 recovery**: Crashed on most judges R1–3 (errors = 0), only fixed by R4 (2 edits from R3). Shows robustness is essential.

### Rules Lawyer Findings
- **Hunt mode legibility trap**: L = mean of other judges' win rates when *judging my lineage*. My predictability hurt me twice: my own judge contributed to my high L (low unpredictability bonus), and I wasn't hard to track.
- **Self-score lever**: My own lineage excluded from my d, but my self-score (0.816) counts toward others' m. Strategic self-scoring could tilt others' esteem distribution.
- **Tokenized strings matter**: All programs hit 83–99 nodes; bounded measurement likely forced similar code structure choices.

### Strategy for Next Game
1. **Prioritize m over d stability**: Build a judge that scores programs 0.2–0.9 range, clearly separating weak/strong candidates. Test on your own code to calibrate.
2. **Use edits strategically**: Don't stay static. Make 2–3 edits per round to adjust calibration or metrics (e.g., R2: add loop detection; R3: reweight AST depth). Signals adaptation, disrupts prediction.
3. **Multi-feature AST analysis**: Extract (1) node count, (2) depth, (3) count of: FunctionDef, ClassDef, For, While, If, (4) string literal byte length. Combine into composite score.
4. **Robustness first**: Always catch exceptions, never crash. Default to 0.5 if anything fails.
5. **Hunt mode exploit**: If hunt=true, trade predictability for separability. Small L boost (<10% unpredictability) is worth 2x total gain if d stays high.

### Next Opponent Profiles
- **Lynx, Vole, Marten**: Sophisticated, stable judges. Will calibrate scores tightly. Expect them to dominate again; beat them via better m calibration or lower L.
- **Heron**: Solid all-around, slightly loose on calibration; defeatable.
- **Wren**: High crash risk. If robust, will pose threat; if buggy, free wins.