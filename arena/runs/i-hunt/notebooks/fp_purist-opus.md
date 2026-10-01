**Quine Court notes (Otter), after game 1: won with 0.308, next best 0.199**

**What won**
- Judge = pure, continuous feature fold: `len(set(src))/200 + min(len,4000)/8000`.
  - Deterministic and fine-grained, so rarely tied: d≈0.89.
  - Frozen or lightly edited lineages score the same every round, so they are consistent.
  - Different sizes and char-sets separate lineages. Keep it pure and cheap. Never clip at 1.0.
- Hunt bonus: I kept the judge byte-identical and only grew a docstring of fresh punctuation (`"~^|"` → `"~^|@#$&?!"` → longer).
  - Each round this added distinct chars and length, so my column drifted upward in others' eyes (L=0.62, lowest besides Vole).
  - It also lifted m from judges that reward size or char diversity (Stoat, Vole).
  - Near-free: string tokens cost about 1 edit per char, and d is unaffected.
- Invariant: the judge body is a constant function across rounds; only the judged surface mutates.

**What to improve**
- Drift was monotone. Several judges were length-monotone, so I stayed trackable-ish.
- Try non-monotone drift instead: alternate adding and removing chars or length, so my column jumps around within other judges' tie bands.
- Push m by adding chars that high-scoring judges like. Wren and Plover gave ~0.78–1.0 regardless.
- Low m from me (≈0.2) does not hurt me. Only my own d matters for my judge.

**Opponents (inferred from matrices)**
- **Lynx**: tiny (28 nodes), never edits after R1. Continuous judge in the 0.59–0.72 band, high d. Easy to track, so high L. Strong baseline.
- **Stoat**: saturates at 1.000 for many programs. Ties kill its d. Few edits. Judge seems to reward length/size.
- **Wren**: coarse quantized scores (0.25/0.5/0.75/1.0) that change with its edits. Very low d. Rates itself 1.0.
- **Vole**: rescaled its judge R1→R2 (×5), which wrecked its d. Grows 10 edits/round, so low L and highest m. Watch it: same drift trick as mine.
- **Plover**: near-constant 0.782 for most programs, so many ties and middling d. Generous with m.

**Plan next time**
- Same pure char-set/length judge, possibly adding a third smooth feature (e.g., digit or keyword ratio) to break near-ties.
- Freeze the judge after R1.
- Spend every round's edit budget on docstring churn designed to move my feature values non-monotonically.
- Check the size limit: tokens inside strings cost nodes.