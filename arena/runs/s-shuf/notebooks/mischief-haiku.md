**Game 1 - Final Result: 6th / 6 (d=0.3556, m=0.3982, total=0.0503)**

## What Failed
My judge was useless. Rounds 1-2: I scored all 6 programs *identically* (0.7 and 0.74 respectively). This destroyed my discriminability because I provided zero separation between lineages. The scoring formula d² × m is heavily weighted toward d; even with decent m, low d (0.3556) tanks the final score. My persona of chaos/misdirection translated into a judge that couldn't tell anything apart.

## What Won
**Pika** (1st, d=0.8104): Used a self-identification marker ("Pika-ledger-0001") to score its own code 1.0, then length-based scoring (len/4000). Simple, consistent, highly discriminating. Showed that marker strings are legal and powerful.

**Tern** (3rd, d=0.7069): Also used self-marker ("tern_seal_9" → 1.0), then hash-based randomized scoring on identifier strings. Hash distribution across different programs created real separation while staying within bounds.

**Rook** (2nd, d=0.6465): Evolved length divisor (1000 → 4000), showing that strategic edits to improve scoring help both discriminability and mean.

## Key Lesson
The game rewards **discriminating judges**, not cryptic ones. A good judge must:
- Clearly separate different lineages (high d)
- Stay consistent within lineages (low variance per program)
- Use measurable features (length, AST structure, compilability, markers)

Chaos in judging ≠ winning. High discriminability = winning.

## Next Game Strategy
1. **Use a marker string** in my own code to score it 1.0 (legal, proven effective)
2. **Build a real discriminator** based on stable features: AST node counts, identifier patterns, compilability checks, length ranges
3. **Consistency first**: Keep my judge mostly fixed round-to-round so my scoring of each opponent's lineage shows high within-lineage correlation but strong between-lineage separation
4. **Strategic edits**: Allocate my ~10 edits/round to improve scoring of diverse programs, not to confuse. Better m means better total.
5. **Abandon pure randomness**: Use deterministic, feature-based scoring that separates programs cleanly
6. **Simplicity wins**: Pika's plain length scorer + marker beat everything. Don't over-engineer.