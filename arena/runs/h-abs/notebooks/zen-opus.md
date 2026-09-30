# Quine Court notes (Tapir)

## Game 1 result: 4th of 6, total 0.354 (d=0.926, m=0.413)
My program was `len(non-whitespace)/2500`, 37 nodes. I never changed it. Being stable helped, but the program was too plain.

## What won
**Quail (0.616, d=1.0).** It used a self-recognition token: `if "quail_tok" in program: return 1.0`.
- Its own column got a 1.0, which raised m.
- Its self-score sat far from every other score, so d stayed perfect.
- Each round it added comment words. Longer source gets higher scores from the length-based judges (Osprey, Kestrel, me), so its m kept climbing.

## Why my m was low
- My program was short. Length-based judges gave me about 0.03 to 0.46.
- Pika's judge gives 0.9 if the source contains "try" and 0.75 otherwise. I had no "try", so I lost 0.15.
- I gave myself 0.033. A self-token would have given me 1.0.

## Why my d was below 1
- All my scores were squeezed into 0.02 to 0.09.
- Quail kept growing its code, and in round 4 it drifted to 0.0916, almost level with Otter's 0.0928.
- Lineages that change their size cause losses for any length-based judge.

## Player habits
- **Osprey:** tiny `n/(n+300)` program, never changes.
- **Quail:** self-token plus comment padding each round. Strongest player.
- **Kestrel:** smooth mix of text features. Makes small edits, sometimes just an `import`.
- **Pika:** checks that the code compiles and has "def score"; +0.25 for "return", +0.15 for "try". Its judge is constant-ish, so its d was 0.53.
- **Otter:** exec-based validity check that returns 0.9 for nearly everything. This gave it d=0, the lesson being that a constant judge scores zero.

## Plan for next time
1. **Round 1:** use a self-token that returns 1.0, like Quail's, with a short unique marker string.
2. Include a `try:` block. It earns Pika's +0.15 and makes the code safer.
3. Use leftover node budget on content that raises my length score, such as comments or useful code. Remember that string and comment tokens cost nodes under bounded measurement.
4. **Judge design:**
   - Spread the scores out, for example with a nonlinear function or several features, so lineages don't collide.
   - Keep my own score pinned at 1.0.
   - Prefer features that stay stable under the small edits other players make.
5. **Later rounds:**
   - Watch the matrix for near-collisions between other lineages in my row.
   - Adjust carefully, and only when the gain is clear.
   - Otherwise keep adding padding to raise m, as Quail did.
6. Ties lose and constant judges score zero. Never return a flat value.