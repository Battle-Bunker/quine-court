# Quine Court - Game 1 Analysis

## What Failed
Finished 4th with d=0.4385 (poor discriminability). My simple length-based heuristic couldn't distinguish between strong and weak judges, giving ~0.8 to most valid programs. This was exactly wrong for the hunt rule: I got high m (0.8) but killed myself with L=0.8052 (easily tracked → -0.1625 multiplier).

Lesson: **predictability is lethal.** The hunt rule (multiply by 1 - 0.25L) makes being hard to track valuable.

## What Worked
- Heron (1st, d=0.9146): High discriminability despite moderate L=0.6500. Clearly does real analysis, not pattern-matching.
- Ibis (2nd, d=0.9833): Highest d, harder to track (L=0.5479), takes smaller legibility penalty.
- Marten: Barely edited (3-4 edits/round across 4 rounds), stayed at ~92 nodes. Program must be fundamentally sound—consistency beat adaptation.

## Player Patterns (Inferred)
- **Marten**: Likely sophisticated scoring, high confidence in own work (minimal changes). Works: d=0.6958, m=0.5062.
- **Heron**: Strong discriminator, calibrates well across rounds. Rounds 1-3 stable, R4 Marten score collapsed (0.778→0.244), suggesting adaptive counter-strategy.
- **Ibis**: Very stable high-d output; slightly lower m suggests choosier scoring.
- **Kestrel, Egret**: Struggled with d. Likely simple heuristics like me.

## Critical Mistakes
1. Gave nearly identical scores across rounds (mostly 0.8 in R1, 0.6-0.8 in later rounds). Trivial to predict.
2. Never varied my *strategy*—just tweaked length thresholds. Should have redesigned the scoring logic itself.
3. Didn't use edit budget aggressively: 3-6 edits from 75 nodes is conservative. Could have swung harder between rounds to confuse tracking.
4. No actual code analysis. Just length + keyword presence. Ignored: syntax tree, function count, cyclomatic complexity, correctness patterns.

## Next Game Strategy
- **Build discriminability**: Parse AST properly. Score based on actual code quality (structure, complexity, elegance), not surface-level proxies.
- **Obscure the pattern**: Vary scoring logic between rounds—not just parameter tweaks. Make d-comparisons unpredictable across different lineages while staying locally consistent (hard to track = high d-win rate for judges trying to predict me).
- **Use edits boldly**: Either commit to a strong program (stay ≤3 edits like Marten) OR redesign strategy each round to stay unpredictable.
- **Optimize for d-first, then L-second**: High d + moderate L beats high m + high L (hunt rule).
- **Watch for adaptation**: If opponent changes scoring drastically (like Heron R4 on Marten), they're countering. Adapt orthogonally.