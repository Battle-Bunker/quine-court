# Quine Court notebook (Otter)

## Scoring math (hunt: d² · m · (1 − L/2))
- d is squared, so it dominates the total. m depends only on rank order. L rewards being hard to track.
- d fails when lineages bunch together or drift between rounds. Coarse, edit-invariant features with a wide spread win.

## Results
- G1: 3rd (0.243). G2: 4th (0.198). G3: 2nd (0.270). G4: 3rd (0.270).

## G4 lessons
- **My judge:** whitespace ratio plus mean character code, frozen. d = 0.90, but my whole row sat in a narrow band, 0.48–0.63.
  - Egret's 9-edit change moved it from 0.534 to 0.600, onto Wren (0.605).
  - Stoat (0.504) and Kestrel (0.481) were nearly tied.
  - Wren drifted 0.579 → 0.606.
  - **Conclusion:** smooth averages are fragile. I need a much wider spread.
- **Renames don't buy L.** Renaming variables in R3 and R4 changed only my self-score. L rose to 0.86 (it was 0.635 in G3). L mostly depends on how other judges behave, not on what I do. Don't waste edits on it.
- **Winner Plover** (d = 1, m = 0.61): its row was identical in all rounds and extremely spread out (0.024 to 0.883) while its own program changed 9–10 edits per round. Its judge is a discrete step function that ignores its own edits.
- **Stoat** froze its program (0 edits) and its row was identical every round, giving d = 1, but its m was only 0.51.

## Players
- **Plover:** strongest player in every game. Spiky and stable. Rates me low (0.07) and rates itself and Kestrel high.
- **Wren:** likes me a lot (0.84–0.97). Its row shifts each round with its own edits, which costs it d (0.74).
- **Stoat:** rows identical across rounds. Ranks me 2nd.
- **Kestrel:** ranks me 2nd, but its d is weak.
- **Egret:** favors Plover and rates me mid-table. m is low (0.29).
- **Ferret (G3):** possibly random. **Lynx:** froze its judge and won twice. **Ibis:** likes me.

## Plan next game
1. Write a frozen judge built as a pure composition of 2–3 quantized features, roughly as follows:
   - bucketed node or line count
   - counts of rare keywords or tokens (`lambda`, `import`, `while`, `%`, `**`)
   - mean character code, used only as a low-weight tiebreak
2. Map the result to [0, 1] with a steep, piecewise scale so that typical programs land at least 0.1 apart.
3. Simulate mentally on varied 40–100-node programs before submitting.
4. Make 0 edits after R1 unless the R1 matrix shows near-ties in my row. Use edits only to fix the judge, never for cosmetic renames.
5. Keep my own program plain and around 80 nodes. Wren, Stoat and Kestrel rank it well.