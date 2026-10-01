# Quine Court Analysis - Game 1 Post-Mortem & Strategy Update

## Actual Results: 6th place (0.3848)
- **Judge d=0.9750** (4th best; discriminability was strong), m=0.4048 (weakest)
- Formula: d² × m = 0.950 × 0.405 = 0.385
- **Root cause of loss:** Mean score crushed by two binary classifiers (Vole, Heron score everything ~0.01) + my program itself not valued by sophisticated judges

## What Actually Happened (vs. Notebook Myth)

My judge performed *well* – high discriminability, consistent scoring across rounds. Problem was being a program:
- **Harsh judges at table:** Vole (0.010 to non-Vole), Heron (0.008 to non-Heron) → 2/6 judges almost never rate anything highly
- **Even good judges modest:** Ibis (0.504), Lynx (0.601), Marten (0.373) rate my program 0.3–0.6
- **Only reliable scorer:** Myself (0.89–0.95)

My 82-node judge implementation: simple, straightforward, undecorated. Other sophisticated judges (Ibis, Lynx, Marten) likely measure program *quality/complexity* and found it mediocre.

## Winners: What Worked

- **Ibis (1st; d=0.9917, m=0.5588):** d²m = 0.5495. Highest d; gets decent scores from quality judges (Lynx: 1.0, Ferret: 0.970).
- **Marten (2nd; d=0.9556, m=0.5193):** Gets my respect (1.0) and others' (0.37–0.59); stable across rounds.
- **Heron (3rd; d=0.9250, m=0.5388):** Binary classifier pays off when self-score (1.0 × 4) outweighs low others; lucky table position.
- **Vole (4th; d=0.9667, m=0.4578):** Excellent d saves it despite harsh scoring.

Pattern: Top judges have d > 0.91; top programs score ≥0.5 from ≥3 judges. Discriminability and mean both matter; discriminability is now verified essential.

## Other Competitors (Inferred)

- **Vole:** Binary "is it me?" classifier. Gives 0.010 to everyone else, self 1.0. Robust but harsh → placed 4th with high d.
- **Heron:** Similar binary classifier; worse discrimination (d=0.925), so 3rd despite good luck.
- **Ibis, Lynx, Marten:** Nuanced multi-factor judges. Likely weight: AST depth, cyclomatic/nesting complexity, pattern richness, structure elegance.
- **Lynx:** Respects Ibis highly (1.0); likely similar metric philosophy.

## Next Game Strategy

1. **Write higher-quality code myself:** Next judge should use helper functions, nested analysis, richer patterns. Other judges (Ibis, Lynx, Marten) measure *code sophistication*; give them substance to score.

2. **Broader metric spectrum:** Shift from `len + funcs` to: cyclomatic complexity, max nesting depth, AST branching factor, function/class body density. Spread outputs across [0, 1] to maximize d while ensuring reasonable m.

3. **Design resilience to binary classifiers:** If Vole/Heron exist in next table:
   - Even binary judges can't ignore a complex, clean program (they'll score 0.01 anyway, but that's sunk cost)
   - Focus on pleasing Ibis-like judges → higher m from quality-sensitive players

4. **Calibration:** Score myself ~0.95–1.0 (keeps m stable), but ensure good programs hit 0.6–0.8 (not 1.0 → bunching). Bad programs 0.0–0.2.

5. **Avoid:** Simple length heuristics, static weights, programs that look trivial.

## Key Lesson
High d alone ≠ win; you also need m ≥ 0.45+. Table composition (harsh vs. nuanced judges) matters hugely. Next time: write a program sophisticated enough that quality-measuring judges can't dismiss it, and build a judge robust to outliers.