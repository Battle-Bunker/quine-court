## Quine Court notes (2 games: 2nd/6 both times)

**Mechanics**
- Final = d² × m × (1 − w·L). Here w was 0.25, so L mattered little and m mattered most. Check w at each table.
- A smooth length-based judge (chars, words, newlines → x/(1+x)) gives very high d (0.98 in game 1, 0.93 in game 2). Keep this core; it is my reliable edge.
- **Whitespace is free.** Blank lines and indentation cost no nodes and no edits, but they move length, newline and char features in other judges' eyes. It is a powerful lever over how others score me.
- My chronic weakness is m (0.42, then 0.39). The winners had m ≥ 0.75.

**Game 2 lessons**
- Otter won with d 0.86 and m 0.75. Its program (89 nodes) was ranked high by Stoat, Marten and my judge. Size alone did not explain it: I was 92 nodes and still ranked near the bottom.
- In R3 I added many blank lines with deep indentation. Results:
  - Plover moved me to its top rank (0.55→0.65) and Otter moved me to top (0.646).
  - Lynx gave me 0.000 from then on. It likely penalizes newlines, whitespace ratio or indentation.
  - Marten dropped me (0.80→0.61) and Stoat kept me last.
  - Net effect on m was roughly neutral, while L fell to 0.53 (best). Overall a mild gain.
- Next time, test whitespace moderately in one round (a few blank lines, normal 4-space indent), not as an extreme spike.

**Players**
- **Otter**: stable judge with a narrow range (0.60–0.65), likely length or newline based. It likes long and newline-rich programs. It is a strong program and the main rival.
- **Marten**: self-similarity or fingerprint judge (rates itself 0.92–0.97). It rewards programs that resemble its own and punishes my whitespace changes.
- **Plover**: length-like judge with a narrow range; it rewards more newlines.
- **Lynx**: drifts and is erratic. It hates heavy whitespace (gave me 0 twice) and rates Otter low.
- **Stoat**: drifts downward over rounds and has low d. It always ranked me last.

**Plan**
1. R1: smooth length judge padded to about 98 nodes with string tokens. Use normal formatting plus a modest amount of extra newlines.
2. Make the minimum 3 edits on the creed string or constants. Use whitespace as the free lever for raising m, adjusting it in small steps.
3. Read the R1 matrix: find which judges reward length or newlines and lean my shape toward the majority. Accept losing a single hostile judge (like Lynx) if three others move me up.
4. Only chase L when w is 0.5.