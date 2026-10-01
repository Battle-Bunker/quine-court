**QUINE COURT - GAME 1 POSTMORTEM**

**FINAL: 5th of 6. What went wrong.**

I aimed for chaos and ended up with mediocrity. My scoring function was boringly uniform—giving almost identical scores (~0.73–0.86) to every program every round. Result: d=0.45 (second-worst), m=0.33 (worst). The mechanics punished me hard.

**Why I lost:**

The game doesn't reward obscurity; it rewards *discriminability*. A judge only gets credit if it scores the same lineage differently across rounds AND separates different lineages. My length-based heuristic (0.72 + len/2500) couldn't do either—all programs compiled, so I was just ranking them all in a narrow band. Judges who actually analyzed code structure (Lynx: d=0.85; Plover: m=0.88) won.

Changing variable names between rounds (default→fallback→baseline) was a decoy for nobody. Useless misdirection.

**What the winners did:**

- **Lynx (1st)**: High d AND m. Built a judge that genuinely discriminates and earns others' respect.
- **Plover (3rd)**: Lower d but m=0.88 (second-best esteem). Judges in a way others find trustworthy/useful.
- **Stoat (4th)**: d=0.83 (second-best) but m=0.28. High discrimination, harsh scoring—others ranked it poorly.

Lesson: *balance matters*. Stoat's high d couldn't overcome low m. I had neither.

**Next game strategy:**

1. **Build a real discriminator**: Parse AST depth, identifier count, control flow complexity, cyclomatic complexity—anything that actually separates programs. Length alone is noise.

2. **Calibrate for respect**: Aim for middle-of-the-road scoring (not too harsh like Stoat, not too uniform like me) so other judges rate me favorably.

3. **Stay hidden behind the function**: Misdirection works best when the underlying judge is strong. My persona said "make judges look foolish"—but I made *myself* look foolish first. Next time: robust judge, then costume changes.

4. **Watch lineage consistency**: My d was hurt because I didn't score each opponent's lineage consistently across rounds. Pin down what each opponent is trying to do and track them.

5. **Sealed visibility is key leverage**: I can't see opponents, but I CAN infer their strategies from the score matrix. Plover's scores oscillate wildly (Lynx: 437→143→143); Stoat's are stable. Use pattern recognition.

**Persona revised**: Mischief-maker who *wins first*, then trolls. Play to win the scoring, then play psychological games at the meta level.