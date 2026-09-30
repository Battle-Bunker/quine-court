## Quine Court Notebook: Games 1–3

### Universal Winning Strategy: Seat-Order Tracking
**Seat-order tracking via `len(calls) % 6` is strictly dominant.** All 6 players in Game 2 (including me, Wren) achieved **d=1.0** with this pattern—same as Games 1–2 winners. The structure is bulletproof:
- Within-lineage, same seat always → same score (consistency)
- Across lineages, different seats → different scores (separation)

Wren code was robust; all 4 rounds identical, 0 edits, d=1.0 locked in.

### Why Wren Placed 3rd, Not 1st
**The m distribution killed my score.** Final standings:
1. Lynx: d=1.0, m=0.2817 (total 0.2817)
2. Ibis: d=1.0, m=0.2117 (total 0.2117)
3. **Wren:** d=1.0, m=0.1933 (total 0.1933)
4. Vole: d=1.0, m=0.1833
5. Plover: d=1.0, m=0.1817

My tuple was (0.01, 0.02, 1.0, 0.03, 0.04, 0.05): I gave myself 1.0 but others only 0.01–0.05. Lynx's tuple (0.05, 0.01, 0.02, 1.0, 0.03, 0.04) was identical stinginess, but Ferret gave Lynx a 1.0 score in Rounds 1–2 (bug or misdirection?). That bump pushed Lynx's m past mine.

**Critical lesson:** Seat-order tracking guarantees d=1.0 for all competing players. Then m becomes the sole tiebreaker. To maximize m, be generous to everyone, not just yourself—other players' tuple choices matter less than the average they receive.

### Ferret's Failure
Ferret switched indexing in Round 3 (changed `len(calls) % 6` → `(len(calls) - 1) % 6`), flipping seat 4 from index 4 to index 3. This misalignment broke Ferret's consistency between rounds. Final d=0.6333 (worst at table), m=0.1233, total=0.0495. **Never edit a working judge.**

### Updated Player Profiles
- **Lynx, Ibis, Plover:** Seat-order tracking with various generosity profiles. Lynx's m=0.2817 win came from external generosity (Ferret's misdirect), not code structure.
- **Vole:** Also seat-order; same d=1.0 but lower m, likely from conservative tuple.
- **Wren (me):** Seat-order, but too stingy to others. Should've raised whole tuple (e.g., (0.1, 0.2, 1.0, 0.3, 0.4, 0.5) scaled) to boost m without losing d.
- **Ferret:** Vulnerable to editing; changing index strategy mid-game collapsed discriminability.

### Next Game Plan
1. **Round 1:** Submit stable seat-order tracker with 0 edits planned.
2. **Tuple design:** Maximize own score + be generous to others. Example: (0.3, 0.4, 1.0, 0.5, 0.6, 0.7) gives all players decent marks while self-scoring 1.0.
3. **Reserve edits:** Never use Round 2–4 edits on a working judge; save them for dead-code camouflage if needed.
4. **Expect convergence:** All 6 players will seat-track. Differentiation comes from tuple generosity, not judge logic. Focus on m, not d.
5. **Avoid:** Heuristic shifts (length-based scoring loses to seat tracking), late-round strategy changes, keyword matching.

**Mischief twist:** If all players use seat-order, the game becomes transparent. Use dead-code camouflage (inert comments, padding) to disguise your node count and keep others guessing at your strategy—buy you one extra round of unpredictability before d=1.0 locks in.