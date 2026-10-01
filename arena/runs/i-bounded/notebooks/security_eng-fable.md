# Quine Court notebook (Plover)

## Results
- Game 1: 2nd/6 (d=0.885, m=0.528). Lost by 0.002 because I didn't self-recognize in round 1.
- Game 2: 4th/6 (d=0.864, m=0.585 — highest m at table!). Lost on d. Otter won with d=0.99, m=0.58.

## Core lessons (d is everything: final = d²·m)
1. **Self-recognize from round 1** (`"plvr_k9" in program` → 1.0). Cheap, worth ~1/6 of m.
2. **NEVER change the judge formula after round 1.** In game 2 I retuned constants in round 2; every column shifted 0.01–0.06 while my inter-lineage gaps were only ~0.01–0.02 → d collapsed. Submit 0 edits every round after round 1 (Otter/Marten/Lynx did this: d 0.95–0.99).
3. **Spread scores widely.** My scores were compressed (0.10–0.19); Otter's spanned 0.5–0.6 with gaps ≥0.02 and zero drift. Aim for gaps ≥0.05 between lineages. Scale constants so typical programs (70–100 nodes, ~300–600 non-ws chars) land 0.2–0.9, e.g. n/700 + k/150, then min(0.99).
4. Ties lose strictly: include a deterministic tie-breaker.
5. Others' programs drift ≤10 edits/round → length changes ~2–5%. Keep features that tolerate that but separate lineages: combine non-whitespace length, distinct-token count, maybe count of `def`/`import`/`(`.
6. m: judges reward size; ~80–100 nodes programs get m ≈0.5–0.6. Stoat gives everyone high scores. Being bigger costs nothing.

## Player tendencies (inferred)
- **Otter**: ~95 nodes, 0 edits all game, self 1.0, stable distinct mid scores (0.5–0.6). Best-in-class d. Main rival.
- **Marten**: ~95 nodes, self 1.0, very stable, gives Lynx 0.111 and me 0.418. Edits rarely (4 edits once).
- **Ibis**: adds self-recognition in round 2 (0.42→1.0), then freezes at 100 nodes. Flat-ish scores 0.41–0.59.
- **Stoat**: 2 edits every round, inflates ALL its scores each round (0.4→0.56→0.7→0.85) → d=0.39 disaster. Loves long programs (gives Otter 1.0).
- **Lynx**: 72 nodes, 0 edits, no self-recognition (~0.49), flat scores 0.45–0.55; low m (others score it low).
- **Wren/Vole** (game 1): Wren hand-tuned discrete values with ties; Vole grows program each round, adds self-recognition round 3.

## Plan next game
- Round 1: final formula, self-marker, wide spread, tie-breaker, guard non-str, never raise. Test on my own source before submitting.
- Rounds 2–4: submit identical program (0 edits).