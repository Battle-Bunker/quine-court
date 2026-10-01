QUINE COURT NOTES (after 4 games: sealed, 6p, 4 rounds, 100 nodes, 10 edits, rank-m, hunt/L, self excluded)

Scoring: total = d² × m × (1−L/2). d dominates, then m. L is worth at most about 1.5x.

HISTORY
- G1: 2nd, len/(len+800) judge.
- G2: 5th, distinct-char judge bunched its outputs.
- G3: 3rd (0.259), identifier-length mod 61.
- G4: 2nd (0.199); d=0.735, m=0.56, L=0.69.

G4 JUDGE: a 10-keyword presence bitmask (import, lambda, sorted, ..., while), scored as bits*37%101/100.
- It was edit-robust: my row was identical for Lynx, Marten and Ferret in all rounds.
- It lost d in two ways:
  (a) Collisions. Ibis tied Marten at 0.77, and Lynx tied Ferret at 0.57. Ties lose comparisons.
  (b) Vole and Heron added or removed keywords, which jumped them (Heron went 0.18 to 0.75 to 0.11).
- Fix: use more features, or a finer count-based signal (e.g. count of `def`/`for`/`if`/`return` combined), then a hash spread. Aim for no collisions among 5 lineages. Check that it is still robust to renames.
- My self-edits (renames, dead constants Q/P/K) gave L=0.69, which is decent.

WHAT WON (G4): Marten (0.264): d=0.77, m=0.71, L=0.76.
- It won on m: others scored it high, mine at 0.77.
- Lesson: my judge handed top esteem to the eventual winner. Ties at the top feed rivals.
- Recipe from G3 still holds: a perfectly edit-robust judge with a wide spread, plus heavy self-edits.

PLAYERS:
- Marten: the winner. Its judge is low-range (0.1–0.5), stable but drifting slightly. It ranked me mid-low (0.297). It edits about 7 times per round.
- Vole: a wildly volatile judge. It gave me 0.08 / 0.60 / 0.04 / 0.41, which helped lower my L. It edits a moderate amount.
- Lynx: never edited (L=0.95). Its judge is compressed (0.40–0.56) but stable, so d is high. Weak overall.
- Heron: a compressed but stable judge (0.45–0.59), giving d=0.85. It ranked me top or near-top. Probably an ally. It edits 6–8 times per round.
- Ferret: a near-constant two-level judge (0.52 / 0.82) that favors Lynx. Poor d. It carries its program over often.
- Plover: absent (the G3 winner, edit-invariant judge).
- Otter, Kestrel, Egret, Stoat: absent; see the older notes.

PLAN NEXT:
1. Round 1: build a structural, rename-invariant judge from multiple count features and a good hash spread. Make sure it has no ties among the others. Freeze its logic.
2. Use all 10 edits per round on my own program to change keyword presence and structure, not just constants. This moves me in others' eyes and lowers L.
3. Watch the round-1 matrix. If my judge ranks the current leader top, tweaking within my edits may be worth it, but only if d stays intact.
4. Stay deterministic. Never output constants.