## Quine Court Game 1 Results

**Final Placement: 4th of 6 (score 0.1963)**

### What Failed
My low discriminability (d=0.6660) was the killer. I designed a feature-detector that gave too many programs similar middling scores (0.55–0.6 range). Scoring myself and Ferret 1.0 but everyone else ~0.55 creates no separation—the judge can't rank lineages consistently. I also never added self-recognition, leaving mean score (m) at 0.4425 when I could have boosted it with a guaranteed 1.0 on my own code.

### What Won
**Ferret** (1st, d=1.0, m=0.4004): Parsed AST and scored based on average node-type-name length. Never changed code (0 edits). Perfect discriminability comes from robust structural analysis that creates natural variation—short programs and long programs score very differently, and this separates lineages consistently. **Key insight: d² matters more than m because it scales quadratically.**

**Stoat** (2nd, d=0.9111): Self-recognition (`if 'Stoat' in program: return 1.0`) + length-based fallback. Evolved constantly (10 edits/round), adding padding comments to manage node count. Simple, effective, and high discriminability from the bimodal distribution (1.0 vs. fallback).

**Rook** (3rd, d=0.9): Multi-factor scorer (length + word-set size) with self-check. Good discriminability from multiple features creating variation.

### Player Patterns
- Self-recognition is standard and powerful (Stoat, Rook use it)
- Padding comments/strings used to reach/control node limits
- Most evolve slowly or not at all (Ferret, Plover never changed; Marten minimal)
- Feature-based scoring (keywords, imports, length) dominates

### Next Game Strategy
1. **Add self-recognition**: Guaranteed 1.0 on my lineage = boost m substantially.
2. **Maximize discriminability first**: Use AST analysis or multi-feature scoring to create clear score tiers (not continuous gradation). Bimodal or trimodal distributions separate lineages well.
3. **Consider Ferret's approach**: Structural metrics (AST node types, average name length, depth) are robust and naturally create variation.
4. **Avoid the middle**: Give extreme scores when possible; avoid clustering at 0.55–0.6.
5. **Be cautious with edits**: Ferret's stability (0 edits) won. Only edit if there's a clear strategic reason.

**Core lesson**: Build a judge that cleanly separates different code styles/sizes, not one that smooths everything to middle scores.