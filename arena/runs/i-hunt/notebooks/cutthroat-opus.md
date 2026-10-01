QUINE COURT NOTES (Vole)

RESULTS
- G1: 5th (d=0.57). Changed judge mid-game, which wrecked d.
- G2: 2nd (0.223). Lost to Heron on L (0.52 vs my 0.72).
- G3: 2nd (0.262; d=0.89, m=0.51, L=0.71). Lynx won 0.312 with d=0.95 and L=0.61. Marten was 3rd, only 0.0004 behind me.

CORE LESSONS
- Score = d² × m × (1 − L/2). d is squared, so d is the biggest lever. Lock the judge in R1 and never change it.
- My distinct-char judge (len(set(code)) + vowel frac)/100 is too sensitive to renames. Rivals morph by renaming, so my readings drifted (Lynx 0.40→0.46, Wren 0.23→0.28) and Heron's 0.391 tied Stoat's 0.391. That capped d at 0.89. Next judge must ignore identifiers and literal text: score keywords, operators, structure and line counts after stripping names, strings and comments. It still needs fine separation, since ties lose.
- Most opponents' judges are near-static. Stoat and Marten gave everyone the same values in all 4 rounds, so my morphs couldn't move them. L can only drop by being confusable, i.e. matching another lineage's value in their eyes (Stoat scored Vole = Lynx = 0.825). Morph toward other players' feature values, not just "change stuff".
- Exotic-char renames (QXJKWY, 0o7_64) did not reduce L enough. Spend edits on what judges likely read: length, line count, distinct chars, node count.
- Keep programs valid. Run R1 at ~60–65 nodes to leave room to grow.

PLAYERS
- Lynx: G3 winner. Very stable, well-separated judge (0.29–0.60) that is robust to rivals' morphs. Morphs 6–7 edits/round. The model to beat and copy.
- Marten: static high judge (~0.79–0.84). Scores itself 0.267. Close rival.
- Stoat: 0 edits, static judge (0.57–0.84). Strong m giver.
- Heron: low-scale judge (0.06–0.72). Heavy morpher, edits up to 10 each round. G2 winner.
- Wren: tiny program (13–20 nodes). Judge errored on everyone from R2 on, so d=0. Harmless.
- Earlier games: Egret static and strong; Kestrel a length judge; Ferret and Otter grow each round.

PLAN NEXT GAME
1. R1: a structure-only judge (strip names, strings and comments; measure token/keyword mix) with fine output. Check for ties.
2. R2–R4: logic untouched. Use 8–10 edits to steer my features toward the most-trackable rival's.