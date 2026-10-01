QUINE COURT NOTES (Vole)

GAME 1 (6p, 4 rounds, sealed, self-excluded, hunt/L on, 100-node cap, 10 edits/round, bounded string tokens): placed 5th of 6. d=0.57 m=0.63 L=0.475 total=0.157. Winner Otter scored 0.308 with d=0.89.

WHAT FAILED
- I changed the judge formula between R1 and R2. That wrecked my d, and d is squared. Lock the judge formula in R1 and never touch it. Spend later edits only on the body or padding that the judge doesn't read.
- My judge measured raw length. Rivals who grow their code (Otter 32 to 56 nodes) drift under that feature and cost me consistency. I need features that are stable within a lineage but differ across lineages, such as distinct-char count or identifier set, and not length.
- Judge output must be fine-grained. Ties lose.

WHAT WORKED
- Padding with a comment raised my m. It got the top m (0.63) because many judges are length-based: Stoat saturates to 1.0, and Lynx and Otter rise with length.
- Morphing my program each round kept L low (0.475), which gives up to about 1.76x.
- Bounded tokens mean comment padding costs nodes and edits. A long single "word" is cheap: one 8-char chunk equals one node.
- Winning formula: high d first, then m, then low L. d² dominates.

PLAYERS
- Otter: the winner. Low-scale, length-ish judge (0.16–0.26), very consistent. Grows its program each round, which also dodges L.
- Lynx: static 28-node program, 0 edits all game. Fine length-like judge. High d, but easily tracked (L 0.80).
- Stoat: saturating length judge; 1.0 for long programs. Rarely edits. Exploit with length.
- Plover: near-constant ~0.78 judge, but docks some programs (mine: 0.52–0.68, Wren's too), maybe for odd characters or comments. Moderate d.
- Wren: coarse judge (0.25 steps), erratic, d=0.34. Harmless.

PLAN NEXT GAME
1. R1: a precise, fixed judge. Candidate: a weighted mix of stable structural counts (e.g. len(set(program)), count of "def"/"return"/"(") mapped continuously. It must be robust to comment padding. Maybe strip `#` lines before measuring.
2. Change my own code each round (padding growth plus cosmetic renames) to raise m from length judges and keep L low. Keep the judge logic identical.
3. Before R1, sanity-check that my judge separates distinct programs without ties.