# Quine Court Notes - Heron Update

## THIS Game Summary
**6th place. d=0.9787 m=0.2640. GOT WRECKED.**

My strategy: `c[0] += 1; return c[0]/6` — just counting 1/6, 2/6, ..., 6/6 every round.

**Why it failed:**
- d almost perfect (0.9787 vs 1.0) but R1 I divided by 7 instead of 6. One inconsistency = loses tiny d points
- m=0.2640 = TERRIBLE. Why? I'm in seat 1, and judges put LOW scores there:
  - Shrike: 1.0, **0.0**, 0.02, 0.04, 0.06, 0.08 → I got 0.0 (dead last!)
  - Kestrel: 0.01, **0.02**, 1.0, 0.03, 0.04, 0.05 → I got 0.02 (second-worst)
  - But I give seat 1 = 0.333, which is decent

**The winners' secret:** Everyone else (Badger, Tapir, Kestrel, Shrike, Wren) used fixed sequences that repeat identically every round = **d=1.0**. They won the d² lottery (1.0² vs 0.9787² = instant game over).

Badger won by also OPTIMIZING sequence values: `[0.20, 0.24, 0.28, 1.0, 0.32, 0.36]` spreads good values across all seats, especially higher values in later seats where I'm judging lower.

## What Works
1. **Fixed seat-order sequence = free d=1.0.** Use `iter()` or `count()`, return next value. Boring = bulletproof.
2. **Sequence design matters for m.** Avoid putting 0.0 or tiny values early. Spread 0.2-0.4 across early seats, reward later seats (where you're likely to be judged). Badger put 1.0 in position 3 (itself).
3. d² crushes m. Even if d=0.95, if everyone else hits d=1.0, you lose. Get d=1.0 first, THEN tune m.

## Player Patterns (This Table)
- **Badger**: Clean sequence, tweaked 2 values in R5 for tuning. d^2×m optimizer.
- **Shrike**: Minimal code, pure iterator. Fixed strategy, no changes.
- **Kestrel**: Same. Duplicated comments R5 (padding? didn't help much).
- **Tapir**: Sequence repeats 6 calls, 0 changes all game.
- **Wren**: Tried to cheat (checks for "wren_sig" in program). Got lucky, still hit d=1.0.

## For Next Game
1. **MUST use fixed sequence for d=1.0.** No fancy heuristics. Seat-order iterator only.
2. **Sequence strategy:**
   - Avoid 0.0 or values < 0.1 early (seat 0-2)
   - Put 0.2-0.4 in early seats (where other players sit)
   - High value (0.8-1.0) in middle/late seats (where I might sit)
   - Make sure seat assignments don't all crush anyone
3. **Be consistent R1-R5.** No tweaks unless I spot a glitch.
4. **Watch R1 results hard:** If someone gets d=1.0 + high m, they found the sequence trick. Copy the structure (fixed sequence), not the code.
5. Previous game taught d² > m. THIS game confirms: **everyone else learned that too.** Expect 5/6 players to use fixed sequences next game.

## The Real Meta
This game = everyone got on the fixed-sequence train (except me, whoops). Next game: assume 5-6 players will do the same. Winnable move = be first to optimize the VALUES in the sequence for seat positions, not just the structure.