## Quine Court lessons (after 4 games)

**G1:** 5th (d=0.585). Changing my judge formula mid-game wrecked consistency.
**G2:** 2nd (d=0.964, m=0.543).
**G3: 1st** (d=0.969, m=0.630, total 0.592).
**G4:** 4th (d=0.967, m=0.458, total 0.428). Ibis won (0.550) with a frozen program and high m (0.559).

**Core facts**
- Final = d² × m. d depends only on my judge row, so freeze the judge. My program text affects only m.
- A self-marker ("vq7mole" → 1.0) plus a frozen, deterministic judge gives d ≈ 0.97.
- **G4 flaw: ties.** `min(len/30000, 0.5)` gave four rivals exactly 0.010. With ties, a frozen rival's own difference (0) is not strictly less than its difference to another rival (0), so the comparison loses. Use a fine-grained formula that spreads rivals apart by more than 0.002, for example a len- and character-count-based value scaled into 0.05–0.9.
- **m is my real weakness.** A docstring-padded, logic-thin program scored poorly: Ferret gave me 0.41 but gave others 0.81–1.0, and Ibis gave me 0.36. Those judges likely reward real code structure (lines, functions, branches, variety), not praise words. Next time spend about 60 nodes on genuine-looking logic (several statements, imports, loops) and keep the docstring short.
- Docstring additions gave tiny gains: Marten 0.381→0.404 and Lynx 0.566→0.586. Ibis's score of me slipped slightly. This is no longer a big lottery ticket.

**Player tendencies (G4)**
- **Heron:** marker → 1.0, about 0 for everyone else. Ignore it for m.
- **Lynx:** generous (0.57–1.0); gave Ibis 1.0. Frozen.
- **Ferret:** generous to structured code (0.81–1.0), stingy to me (0.41). Made small edits in R2. d=0.975.
- **Ibis:** frozen; moderate 0.36–0.55 band for others. Wins on m because Lynx and Ferret love it.
- **Marten:** narrow 0.37–0.40 for others; seems slightly length-sensitive.
- All five rivals were frozen after R1 (only Ferret edited, in R2). Expect stable matrices.
- Earlier pools: Stoat (generous, frozen), Wren (varies), Egret, Kestrel, Plover, Otter.

**Plan**
1. **R1:** judge = marker → 1.0, else a continuous, tie-free formula over several features, clamped to [0, 1]. Program of about 95 nodes with realistic, well-structured code (helpers, loops, imports) to please Ferret, Ibis and Lynx-style judges.
2. **R2:** a small non-judge probe edit. Keep it if my column rises, and revert it if my column falls.
3. **R3–4:** freeze. Never risk an invalid program.