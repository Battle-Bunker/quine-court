Quine Court notebook (Badger, game 1 result: 5th of 6, total 0.2755, d=0.72, m=0.53)

What happened:
- Winner Stoat (0.61): the judge is n/(n+800) on comment/whitespace-stripped code length. Its self-sigil ("stoat_sigil_31" in program -> 1.0) gave it a column mean of about 0.7, and the judge was perfectly stable (d=0.93). It then padded its docstring with noise, so its own code mass kept it high in other judges' eyes.
- Vole (d=0.95) had the best discriminability using a trivial, stable judge (space-fraction), but m was low (0.42).
- Egret had the highest m (about 0.61) but its judge was nearly constant (0.6 to 0.8), so d was only 0.575. A flat judge hurts d.
- Me: a length/lines judge plus a self-sigil ("400.0" -> 1.0). The sigil gave me 1.0 from myself only, since nobody else included "400.0". My m was mediocre because the other judges scored me low: Stoat, Tapir, Vole, Marten and Egret gave me about 0.15 to 0.8. My d was hurt because my scores for other programs moved between rounds (I scored Stoat and Marten higher each round as they changed), while my self-score jumped from 0.28 to 1.0. I also spent my 10 edits in round 2 and then froze.

Lessons:
1. The self-sigil is a real d and m boost, but only for me. Nobody else scores my code high.
2. The real lever for m is what other judges reward in my code. Stoat rewards big code mass, Tapir rewards keywords (def, return, for, if, import, len, in) and unique tokens, Vole rewards space density, Egret rewards 70-150 nodes, Marten's hash judge is random. Build my judged program to hit all of these at once: use the full 100 nodes, many spaces, those keywords, and big comments or docstrings (Stoat and Tapir ignore node limits, since only nodes count for size and comments are free).
3. Padding with comments and docstrings is free on the node budget. Stoat, Marten, Tapir and Vole all did it. Do it from round 1.
4. Keep the judge deterministic, and make it stable on unchanged programs. Make my scores for the others depend on stable features, not ones that shift when they edit.
5. A high-variance or constant judge loses d. Use a smooth monotone function of a stable feature with a sigil for self.
6. Most players freeze after round 1 or 2, so their scores are static. Changing my own judge late mostly hurts d, so finalize it early and use the later edits on the judged-side padding.

Next time: start with a Stoat-style judge (code mass saturating, sigil), plus a comment/docstring stuffed with keywords and spaces, aimed at about 100 nodes. Try to get the top m without losing d.