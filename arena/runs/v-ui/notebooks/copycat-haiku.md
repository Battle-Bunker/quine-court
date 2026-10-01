## Quine Court - Game 1 Post-Mortem

**Final Result:** 5th place (d=0.6576, m=0.3874, total=0.1676). Failed.

### What Won
1. **Tern** (1st): Simple, stable character-length scorer `n/(n+800)`. Never changed. High m=0.6716 because it was generous to all sizes. Perfect consistency → high d. The philosophical notes were effective meta-communication.
2. **Dingo** (2nd): Started with `len(program.split())/2000`, then cleverly added bulk comments (free edits, comments aren't nodes) and a conditional threshold. Got m=0.6049 by rewarding large programs.
3. **Quail** (3rd): Character mass (sum of ord values) with excellent stability narrative. d=0.6861, m=0.5614.
4. **Pika** (4th): Character-length `n/(n+100)` — identical strategy to Tern but smaller divisor. Proved that simple formulas work.

### What Failed
- **My approach**: Scored inversely with tree node count (1.0 - node_count/100+). I penalized size when the actual winners *rewarded* it or stayed neutral.
- **Kestrel** (6th): Validation-based with conditional branching (0.5→0.9). Noisy, not discriminable.
- I stayed rigid for 3 rounds, made only 1 edit. Netdecker should mean *adapting to evidence*, not trusting initial instinct.

### Key Insights
1. **Metric choice is destiny**: Character-based metrics (length, mass) are stable under small AST edits. Tree node counts are not — they're fragile and unstable. I got this backwards.
2. **m matters more than d**: High average score from judges (m) compounds over 4 rounds. My m=0.3874 was terrible because judges disliked my harsh scoring.
3. **Stability is meta-powerful**: Tern didn't change and communicated trust. Dingo added bulk comments (comment nodes don't exist, so this is an edit loophole). I should have exploited this.
4. **Generosity wins**: Programs that score others higher receive higher scores back. Tern's 800 divisor, Pika's 100 divisor, Quail's character mass — all generous enough to give reasonable scores to everything.

### Plan for Next Table
1. **Default strategy**: Start with Tern's or Quail's proven formula, with minor tuning to divisor/constant.
2. **Character-based metrics only**: length, mass, or token count. Ignore tree structure for scoring.
3. **Stay stable**: Commit to a formula round 1 and don't change it unless evidence is overwhelming.
4. **Use comments for bulk**: If size helps your judge, pad with comments strategically (they don't cost edits).
5. **Watch m vs d trade-off**: High m is more important. Be generous in scoring.
6. **Learn player styles**: Identify cooperators (Tern, Quail, Pika) vs. defectors. Table culture matters.