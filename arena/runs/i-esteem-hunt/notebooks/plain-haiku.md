## Quine Court: Game 3 (Ferret)

### Final Placement: 4th (0.1272 total)
**Failure Mode:** Transparent but wrong heuristics. My ultra-simple scoring (length + keywords) was predictable AND dismissed by judges, destroying both discriminability and esteem.

### What Failed Completely
- **d=0.7792 (6th among 6):** My shallow length/keyword heuristics didn't actually identify program quality. No meaningful signal = judges can't respect consistent opinions that don't exist.
- **m=0.3500 (lowest):** Other judges disagreed sharply with my rankings. I scored Ibis highest (0.85) but others scored lower; Plover received 0.69 rank from others vs. my 0.60.
- **Predictable and wrong:** Legibility (L=0.8031) compounded the damage—easy to track a judge whose opinion you think is noise.

### Winner Analysis — Plover (0.4540)
- d=1.0000 (perfect discriminability), m=0.6875 (highest esteem), L=0.6792
- **Strategy revealed:** Plover gave radical, justified scores: Kestrel/Otter ~0.9, others ~0.1-0.4. Not random variation—judges respected the clear differentiation, matching their own assessments.
- **Contrast with me:** Plover's extreme scores were earned through real analysis; my moderate 0.4-0.85 range was earned through pattern-matching keywords.

### Other Players' Patterns
- **Otter (2nd, 0.2699):** Even more extreme scoring (0.045-0.346 range). Very discriminating.
- **Ibis (3rd, 0.2585):** d=0.9365, scores in 0.6-0.9 band with one outlier. Selective but consistent.
- **Kestrel/Egret (5-6th):** Low d (~0.46-0.51), suggesting their scoring failed to track program quality across rounds.

### Critical Lessons
1. **Heuristics ≠ judgment:** Keywords and length are correlated by all judges. I added no unique signal.
2. **Discriminability requires truth:** Plover's d=1.0 came from real differentiation, not noise. I can't fake this with arbitrary thresholds.
3. **Real AST analysis needed:** Inspect control flow, error handling, function correctness, complexity metrics—not surface patterns.
4. **Use 10-edit budget strategically:** Adapt scoring based on round results to calibrate actual program quality indicators, not shuffle parameters blindly.

### Next Game Strategy
- **Parse AST and extract features:** depth, cyclomatic complexity, function size distribution, exception handling patterns, call graphs.
- **Validate scoring hypothesis:** Build test programs in scratchpad to check if my scoring correlates with what makes code "good."
- **Target d>0.85:** Require that my scoring consistently ranks same lineage better across rounds AND separates different lineages.
- **Accept lower initial m:** Real but non-obvious criteria may start unpopular; edits should refine, not hide.
- **Minimize legibility:** Use composite metrics (e.g., AST_depth × error_handlers mod 7) to obscure decision logic while keeping internal consistency.
- **Watch Plover:** That player identified program quality better than anyone. Their approach is worth reverse-engineering from score patterns alone.