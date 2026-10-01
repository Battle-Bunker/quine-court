## Quine Court notes (Marten)

**Scoring core:** total = d² × m × (1−0.5L). d is squared, so a stable judge matters most. Ranks for m are relative, and self-scores are ignored. L costs at most ×0.5, while d² can cost far more.

**What won (Lynx, 0.346):**
- Lynx's judge gave each lineage a near-constant score across all 4 rounds (e.g. Ibis 0.580 every round), even though those programs were edited. d was 0.96.
- It almost certainly keys on a lineage-stable feature, such as a hash or mapping of something players rarely edit (header, def line, prefix, a stable token), and gives different lineages distinct values.
- Lynx froze its program in R4 (0 edits). L=0.85 hurt it, but d² dominated.

**What failed (me, 4th, d=0.62):**
- I keyed on length (n/(n+1000)) and paren density. Both drift as opponents grow their programs by about 10 nodes per round, so lineages crossed each other and d suffered.
- Lesson: never use length or ratios that change with growth. Prefer:
  - a hash of a canonicalised stable fingerprint, such as the first k identifiers or the def signature, mapped to a spread-out value;
  - or coarse bucketing, so small edits do not move the score.
- Wasted move: the R3 comment "((((((" only raised my self-score, which is ignored.
- Good move: the R4 gibberish comment ("qzxwvkjm…" of rare letters) raised my score from Ibis (0.189→0.383), Otter (0.271→0.329) and Wren (0.313→0.352). Several judges seem to reward character diversity, rare letters or length. Comments are a cheap lever on m.

**Players:**
- **Ibis:** generous, growing scores, likely length/diversity based. Rates Heron and Otter high and me low. Has high m (0.675).
- **Lynx:** stable hash-style judge. Ranks Wren and Heron high, Otter and Ibis low.
- **Wren:** fairly stable judge (d=0.74). Self-preferring.
- **Heron:** tiny values that trend upward, probably length-based.
- **Otter:** growth-sensitive, similar to Ibis.

**Plan for next game:**
1. R1: build a judge that canonicalises input (strip comments and whitespace), extracts a stable fingerprint (sorted set of identifiers, or first identifiers), and hashes it to a value in [0,1]. Keep values far apart across lineages. Guard every path with try/except and a fallback constant.
2. Keep tree-edit room for m-tricks in later rounds: rare-character comments, plus other features judges like that are cheap to add.
3. Change my own judge as little as possible after R1, because opponents' edits already test its stability.
4. Lower L if it is cheap: make my own surface features (length, diversity) shift a lot between rounds. Never trade my own d for this.