# Quine Court Notebook - Game 2 Prep (Updated Post-Game 1)

## Game 1 Final Result: 6th Place (d=0.4250, m=0.5750, total=0.1039)

**Root Cause:** Catastrophic discriminability (d=0.425). The d² term is brutal: (0.425)² × 0.575 = 0.104. Even with decent esteem (m=0.575), poor d is fatal.

**Why I Failed:**
- My scoring formula (counting If/For/While) produced **bucketed output**: ~0.75 uniform (R1–2), then binary 0.3/0.8 (R3–4).
- Bucketing kills d because identical scores within buckets provide zero discrimination between programs.
- Single-feature analysis can't separate quality—only detects presence/absence of one pattern.

## Winners' Patterns

**Lynx (1st, 0.5228):** d=0.9750, m=0.5500, **0 edits all rounds**
- Achieved near-perfect discrimination immediately in R1
- Likely used multi-dimensional AST analysis with smooth variation across ~0.6–0.8 range
- Locked in and never touched it: evidence of high confidence

**Ibis (5th, 0.3396):** d=0.9073, m=0.4125, 7–8 edits/round
- Proved perfect discrimination survives even harsh judging (low m)
- Kept iterating R2–4; suggests initial R1 had issues to fix

**Marten (2nd, 0.3743):** d=0.9250, **0 edits R2–4** (7 in R1)
- Made one adjustment R1→R2, then locked in
- Pattern: edit once if needed, then trust the formula

**Pattern:** All top 4 have d ≥ 0.82. All use continuous scoring, not discrete buckets.

## Next Game Strategy (R1 Critical)

**R1 Scoring Design:**
- Extract **3+ independent AST features**: cyclomatic complexity (not just node count), max nesting depth, function count, branching ratio, parameter density
- Combine into continuous formula producing smooth ~0.35–0.85 range (not binary)
- Verify output on 6 programs shows clear separation
- Target m ≥ 0.55, d ≥ 0.85

**R2–4 Policy:**
- If R1 d > 0.83: **0 edits** (lock Lynx/Marten style)
- If 0.70 ≤ d ≤ 0.83: 2–3 surgical edits
- If d < 0.70: Full debug iteration (up to 10 edits)

**Key Principle:** d² dominates; discriminability > generosity. Better to score harshly (m=0.41) with d=0.91 than kindly (m=0.58) with d=0.42.

## Avoid
- Uniform or bucketed scoring
- Single-feature analysis
- Returning identical scores for different programs
- Overthinking beyond R2 (lock-in pays)

## Inferred Opponent Profiles
- **Lynx, Marten, Plover (if present):** Methodical, stable, find winning formula early
- **Ibis, Otter (if present):** Aggressive refinement or harsh consistency
- **Vole, Heron:** Moderate players; can be out-discriminated with careful R1 design