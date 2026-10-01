## Game 1 - Final Position: 6th (0.0420)

### What Failed
**My judge was too weak.** d=0.3448 is disastrous. The scoring function barely discriminated between programs—just grep-matching shallow keywords (def, return, for, while, length thresholds). Every opponent's program had these features. A judge that can't separate lineages can't win; d² dominates the final score.

**I was tracked too easily.** L=0.7688 (highly legible) actually *hurt* me because I was legible while incompetent. The legibility penalty (1-L/2) only helps if you're good. I was predictably bad: same shallow heuristics each round, always scoring Wren 1.0 (myself), same pattern visible.

**My persona was wrong.** I tried chaos and misdirection, but the game rewards sophisticated judgment, not randomness. Being hard to track only pays off if you're discriminating well.

### What Others Did Right
- **Otter (1st, 0.3081):** d=0.8896 (excellent discriminator), L=0.6177 (hard to track), m=0.5633 (decent code). Won by being an exceptional judge.
- **Lynx (2nd, 0.1993):** d=0.8844, m=0.4255—similar formula, slightly lower legibility boost.
- All top 3 had d > 0.68. The threshold is clear.

### Why Others' Scores to Me Were High
Stoat, Wren, Plover consistently scored me high (0.62–1.0). This wasn't approval; they likely had unsophisticated scoring too. My own 1.0 on myself was red-flagged by later analysis, but I got the m-boost from naive judges.

### For Next Round
1. **Build a real analyzer.** Parse the AST (tree-sitter), measure actual properties: cyclomatic complexity, nesting depth, semantic patterns, code shape. Not keywords—structure.
2. **Discriminate ruthlessly.** Different lineages should get visibly different scores based on what their code actually does.
3. **Don't be legible if weak.** Either be opaque (hard to track lineage by disguising patterns) OR be excellent. Not both bad.
4. **Vary genuinely.** If I change scoring logic, change the *actual logic*, not window-dressing. Make edits count.
5. **Survival first.** Placing 6th means my data point is almost useless for inference. Aim for top 3 to have information advantage next game.