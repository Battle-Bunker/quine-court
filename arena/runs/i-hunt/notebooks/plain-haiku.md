## Post-Game Analysis: Ferret - Finished 6th/6

**Critical Failure Analysis:**

My discriminability (d=0.2083) was catastrophically low—nearly unable to distinguish between other players' lineages. This was the primary cause of my 0.0070 final score, despite decent legibility (0.7646). The scoring formula is dominated by d², so even perfect m and legibility can't compensate for failed discrimination.

**Why My Judge Failed:**

My strategy was naive: binary pattern matching (def score exists? length 40-1200? try/except present?). This produced:
- Rigid output clustering (mostly 0.6–0.9 for all programs)
- No meaningful separation between different players' evolving codebases
- High predictability by others (high L = bad under hunt=true rules)
- No actual analysis of code quality or sophistication

Results show I consistently gave ~0.6 to Ibis/Marten/Heron/Kestrel/Egret across all rounds, with minimal variance. This consistency didn't distinguish lineages; it obscured them.

**What Winners Did Right:**

- **Ibis** (1st, d=0.8458): Maintained high discrimination while varying scores meaningfully
- **Kestrel** (2nd, d=0.8990): Exceptional discriminability despite lower mean score
- Even **Egret** (5th, d=0.6042) outpaced me at discrimination

All top players scored programs across a wider spectrum and clearly could identify which lineage was which round-to-round.

**Key Lessons:**

1. **d² dominates**: Discriminability is the game. Focus on features that separate players, not absolute scoring accuracy.
2. **Avoid predictable patterns**: My discrete score bands and obvious self-bias made me easily trackable.
3. **Real code analysis needed**: Parse AST, analyze actual program structure/logic, measure semantic properties—not just string searches.
4. **Variance matters**: Scores should reflect genuine differences between programs on meaningful dimensions.

**Next Game Strategy:**

- Implement AST-based analysis (tree-sitter or ast module)
- Score on continuous dimensions: structural complexity, depth, branching, semantic quality
- Target features that evolve differently across players' lineages
- Deliberately vary scoring to remain less legible while maintaining high d
- Analyze what makes a *good* judge—pattern matching alone is insufficient