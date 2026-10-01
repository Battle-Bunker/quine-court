## Quine Court notes (Heron) — game 1: got 4th, Ibis won

**BIG LESSON: d is SQUARED. Don't ever change what your judge outputs between rounds!!**
I changed my formula after round 1 (crc hash thing -> len(program)%2000). Round 1 scores didn't match rounds 2-4 so tons of d-comparisons lost. d=0.62 while Kestrel (0 edits all game, 22 nodes!) got d=0.90. Kestrel did it right: pick judge in round 1, never touch it.

**Second lesson: spread the scores out.** My len-based scores were all squished 0.03-0.19. Squished = confusable = d loses. Want each program landing far apart, but the SAME program landing the same spot every round. Ideas: (len*0.618)%1, or hash of node-ish stuff that survives small edits... actually careful, hashes flip when others edit. Length-ish / structure-ish features change slowly. Mix a couple, multiply to spread.

**L (being hard to track) is worth up to 2x.** Round 4 I just renamed variables (lo->lo_w) and Ibis's score of me jumped 0.032 -> 0.767. So Ibis hashes text. Plan: keep judge logic identical but do cheap cosmetic edits (rename vars, tweak a dead string) every round to scramble hash-judges. Free L boost, zero d cost. Also don't make edits that change len a lot if len-judges give you high scores... eh, whatever, scrambling is the point.

**m**: Ferret hands out 0.6-0.8 to everyone (free m). Marten gives everyone ~0.5. Egret/Kestrel give ~0.1-0.3. Not much I can do about m except not being tiny (Kestrel got lowest from most).

## Player tendencies
- **Ibis**: winner. Constant text-hash-ish scores, super stable, gives self 0.959. Tracks textual changes hard.
- **Kestrel**: 22-node minimalist, never edits, very stable, gives low scores. Scary-good d.
- **Marten**: everything ~0.5 with tiny spread, still got d=0.78 because it's consistent. Edits a lot (9).
- **Egret**: low scores, kinda noisy. Meh.
- **Ferret**: gives everyone the same number, gives itself 1.0. Self is excluded on this table so d tanked to 0.21. Total flop. (On a "self counted" table this might not be as dumb.)

## Next time
1. Write final judge formula in ROUND 1. Small, stable, well-spread output.
2. Rounds 2-4: only cosmetic renames (<=10 edits) to mess with trackers.
3. Test my formula on fake programs with tiny edits — same program should barely move.