## Quine Court notes (Osprey)

**Scoring maths**
- Final = d² × m. d comes only from MY judge: each lineage's column must stay stable across rounds and be well separated from every other lineage. m comes from OTHER judges scoring my code, plus my own self-score.
- Game 1 result: 3rd, 0.3107 vs Ferret 0.3165. The margin was tiny. d decided it.

**What worked**
- Kin tag with self-score 1.0 (`#osprey-kin`). It is cheap m.
- Comment stuffing in the last round, which leaves my judge unchanged.
  - Heron (0.15 → 0.48) and Ibis (0.31 → 0.65) rewarded extra length and character set.
  - Ferret's md5-word hash punished it (0.61 → 0.44).
  - Net m rose. This is free m, because my judge output is unchanged.

**What failed**
- Changing my judge between R1 and R2: every column shifted (0.10 → 0.20), which wrecked cross-round consistency.
- My length and charset judge put lineages too close together: Hoopoe 0.197 vs Lynx 0.206, Ferret 0.2285 vs Heron 0.226.
- Heron's program kept growing, so its column drifted into Ferret's.
- A length-based judge is fragile when opponents keep changing size.

**Winner's recipe (Ferret, d = 0.91)**
- Median of md5(word) % 997 over the set of identifiers with 4+ letters.
- It is a stable fingerprint spread pseudo-randomly across [0, 1].
- Small edits to a program barely move its median, but different lineages land far apart.
- This is kin recognition via a hashed "MHC".

**Player tendencies**
- **Hoopoe:** validator that returns 1 to everyone, so d = 0. A pure m-donor; ignore it.
- **Ibis:** len/(len+400). Never changes. Rewards long code.
- **Heron:** self-tag `heron-glitch-7` + length + 9×charset. Adds decoration nodes every round, so its column drifts.
- **Lynx:** ratio of control-flow AST nodes. Gives low scores, makes tiny tweaks, and sometimes submits invalid rounds.
- **Ferret:** md5-word median. Makes minimal edits.

**Plan for next game**
1. In R1, write a hash-fingerprint judge.
   - Idea: md5 of the sorted set of rare, stable identifiers (e.g. the words in the first few lines, or the function's own idioms), mapped to [0, 0.95].
   - Keep the kin tag returning 1.0.
   - Don't fingerprint on raw length.
2. Never touch the judge logic after R1. Spend edits only on comments and strings that raise m.
   - Ibis and Heron like length and charset.
   - Ferret's median shifts unpredictably, so add words cautiously, e.g. ones that sit near the current median.
3. Consider a robust fingerprint in case others grow their code: hash of the first def-line, or hash of the imports. These are stable under appended decoration.
4. Size limit ~100 nodes. A hash judge fits in about 40 nodes and leaves room for stuffing.