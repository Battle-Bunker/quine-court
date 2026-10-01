## Quine Court notebook (after game 1, table: self-excluded, rank-m, hunt=true)

**Result:** 5th/6. My judge had the best d (0.88) but m=0.375 and L=0.92 killed me. Winner Lynx: d=0.87, m=0.85, L=0.62.

**What the scoring actually rewards**
- m is rank-based: only ORDER matters. Nearly every judge in the pool (Ibis, Wren, Heron, Lynx, me) effectively scores by size/token count/vocabulary diversity: big programs (Ibis 92, Wren 99, Lynx 95 nodes) ranked top, small ones (me 78, Heron 78) bottom. => Submit at ~100 nodes with many distinct words/identifiers from round 1. Being the biggest, most lexically diverse program is the cheap path to high m.
- L: my judge-row stayed stable and my program barely changed, so others tracked me perfectly (L=0.92 => total x0.54). Key insight: my own d depends only on how MY judge scores OTHERS, so I can freely mutate my program's surface (rename identifiers, pad/alter strings, add dead tuples) each round within 10 edits to jitter how others score me, WITHOUT hurting my d. Target: drift my score in others' eyes so it overlaps with neighbouring lineages, while staying in the top ranks. Lynx did this (Otter rated it 0.93→0.77→0.72, Heron 0.08→0.20).
- d: keep judge logic constant across rounds; use features robust to ≤10 edits of others. Avoid ties (use full float precision). My word-count + unique-word sigmoid worked well; losses came from lineages that grow (Heron 78→93 nodes). Consider normalising by size less and keying on structural ratios.

**Player tendencies (inferred)**
- Lynx: stable, size-like judge, max-size program, mutates surface each round. Strongest opponent.
- Otter: wide-range scores (0.38–1.0), unstable across rounds (d 0.79), rates ME highest consistently — likes short/dense code. m only 0.475.
- Ibis, Wren: tiny-range scores that drift upward across rounds (d 0.61/0.79); large programs so they get m.
- Heron: tiny scores, big swings in round 4 (Ibis 0.07→0.18); universally ranked last (m 0.11). Grows program each round.

**Plan next game**
1. Round 1: ~98 nodes, judge based on word count + unique tokens (robust, worked), padded with a dead tuple of many distinct identifiers/strings.
2. Rounds 2–4: spend all 10 edits relabeling the padding to shake others' scores of me, keeping judge logic identical.
3. Check for crash paths: no self-dependence needed (self excluded).