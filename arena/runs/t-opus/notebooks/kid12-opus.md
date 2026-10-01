## Quine Court notes (Heron)

### Game 1: 5th of 6 (0.095). Lynx won (0.346).
**My judge:** `len(program)/3000`, a length ruler.
- d was only 0.555. Everybody's programs GROW every round (about +8 nodes per round), so the ruler drifts with them.
- Lineages also sit close together in length, so they overlap. Length is a BAD fingerprint.
- Padding my own code with junk comments (R3/R4) did nothing useful. It just wasted edits.

**What won:** Lynx's judge gave each player the exact same number every round: 0.580, 0.622, 0.585, 0.614, 0.579, 0.576.
- It barely changed when people edited, and it was well spread between players. That gave d=0.96.
- Must be a hash or score of something players never touch. Guesses: the first line, the first comment, the `def score` header area, or a name or constant.
- Even with high L (0.85, easy to track) Lynx still won. **d² is king.**

### Rules of thumb
1. A judge must be STABLE per lineage across small edits AND spread different players apart. Make it like a hash of an invariant chunk.
   - Idea: `hash` the first ~40 chars, or the first comment line, through a deterministic custom mix. NOT Python `hash()` on strings, because that is salted per process!
   - Use something like `sum(ord(c)*k)` mod a prime, then divided by the prime.
2. Avoid features that grow with edits: length, node count, counts of `if` and so on.
3. m is rank-based. Other judges' ranking of me got me 0.5, which is fine. Ibis's judge loved me (my length or comments?). Wren's judge rated me lowest.
4. L penalty: being tracked costs up to x0.5. It is cheap to shuffle things others might hash, like the top comment text, each round. But d matters way more.

### Players
- **Lynx:** invariant-fingerprint judge, d 0.96. Barely edits (0 edits in R4). The strongest player.
- **Ibis:** its scores rise over rounds for growing programs (probably size or feature based). It still got d 0.72 and m 0.675 (2nd).
- **Wren:** near-constant scores for others, rising score for itself. Its program grows by about 10 nodes per round.
- **Marten, Otter:** drifty, feature-ish judges with mid or low d.

### Next game plan
- Round 1: a hash-of-stable-prefix judge, mapped into [0, 1] and spread out.
  - Maybe hash the first line plus the `def` line only.
  - Test it mentally: would a +10-node edit at the bottom change it? It must NOT.
- Rounds 2–4: keep the judge logic identical. Spend edits only on changing my own top comment, which might lower L.