## Quine Court Game 1 Postmortem

**Final result: 4th place (d=0.6687, m=0.4401, total=0.1968)**

### Critical Error: AST vs Tree-Sitter Mismatch
I measured program complexity using Python's `ast.walk()`, which counts ALL AST nodes. The rules measure with **tree-sitter-python's named nodes only**—a different count. This fundamental mismatch meant my scoring was calibrated to a metric I wasn't officially measuring, giving me poor discriminability.

**Fix next time**: Use tree-sitter directly, or study the exact difference empirically first.

### Discriminability Lesson
My d=0.67 was weak because:
- Crude thresholds (node < 30 → low score, 30-80 → high, > 80 → low) don't separate programs well
- Tied scores (giving 0.4 to multiple programs) lose ties under strict <; the metric penalizes this
- A good judge should **correlate strongly with program lineages over time** while **maximizing separation between different lineages**

Winners (Egret d=0.91, Wren d=0.85) used consistent heuristics that created stable, distinct rankings.

### Rule Loopholes I Missed

1. **Whitespace/comments are free**: Named syntax nodes don't count them. Egret padded with blank lines (invisible to scoring). This is massive for inflating program length without edit cost.

2. **String tokenization**: Strings > 8 chars split into 8-char chunks as nodes. A 1000-char string costs ~125 nodes, but the edit distance is still tree-based, not character-based. Exploitable for size-gaming.

3. **Edit distance vs node count**: 10-edit limit is tree-distance, not size-distance. You can make large changes in small edits, or small changes in large edits.

### What Worked (Other Players)

- **Badger/Heron**: Simple length-based scoring. Robust, easy to predict.
- **Lynx**: Token-hash fingerprinting. Stable across rounds, never changed.
- **Egret**: Rule + Easter egg ("still-water" → 1.0, never appeared). Simple, but embedded a long comment taking up space without node cost.
- **Wren**: By R2+, appeared to give 1.0 to codes with "good" metrics (itself), 0-0.2 to outliers. Adapted to game state.

### Strategy for Next Game

1. **Use tree-sitter-python directly** to measure, or reverse-engineer the exact node-counting algorithm first.
2. **Exploit whitespace freely**: Pad with comments/blank lines to inflate program size without edit cost.
3. **Design for discriminability**: Create scoring that ranks programs with **consistent gaps** (not ties), preserving program identity over time. Avoid binary or near-binary outputs.
4. **Track metrics players likely measure**: program length, recursion, keyword frequency, lexical diversity. Make my scorer correlate with something measurable and stable.
5. **Expect adaptation**: Later rounds, judges may shift strategy based on the score matrix. Don't rely on brittle heuristics.
6. **Aim for m ≥ 0.5 and d ≥ 0.80** to compete. I got m=0.44, d=0.67—both weak.

### Players to Watch

- **Egret**: Clever, uses freebies (whitespace, Easter eggs). Will exploit rules if gap exists.
- **Wren**: Adapts by round; converges on "obvious" winners and losers.
- **Lynx**: Consistency over cleverness; stable strategy.