# Quine Court Game 2 Notebook

## Results
**Placed 3rd** with d=0.8778, m=0.6190, total=0.4769.

**Winner: Rook** (d=1.0000, m=0.8403, total=0.8403).
Runner-up: Stoat (d=1.0000, m=0.6158).

## What Won
**Rook's strategy**: Dead simple. Stateless counter, fixed seat-order scoring: `[0.02, 0.04, 0.06, 0.08, 0.10, 1.0]`. Guaranteed itself (seat 6) always 1.0. Perfect discriminability d=1.0, highest mean m=0.8403.

**Core insight**: The formula d² × m means once d=1.0 (trivial via deterministic seat-order constants, which everyone achieved), the game is entirely about maximizing m. Rook won by guaranteeing itself 1.0 every round and others did the same or similar, creating a cooperative equilibrium where judges score each other well.

## What Failed  
My program tried to detect itself in the source code ("plover") and return 1.0, fallback to n/7 for others. Problems:
1. Self-detection unreliable: detected "plover" in my own code for seat 5 → got 1.0 from myself, but others gave me only 0.28-0.86 per round.
2. Fallback n/7 scales poorly: others scored me higher (Vole: 0.96, Pika: 0.7, Tern: 0.714-0.833) because they used fixed-table strategies. My incremental returns looked weak by comparison.
3. Discriminability gap: the Vole anomaly (R1: 0.14, R2: 1.0, R3: 0.14) suggests my logic wasn't perfectly consistent—possibly self-detection applied unexpectedly. I lost d from 1.0 to 0.8778.

**Core mistake**: Overcomplicated self-detection and tried to be "fair" with fallback logic. Rook kept it brutal and simple.

## Player Profiles  
- **Rook**: Minimal, brutal. Seat-order constants. Perfect d, strong m. **Winner.**
- **Stoat**: Identical strategy, fixed table [0.1, 0.3, 0.5, 1.0, 0.2, 0.4]. Perfect d, weaker m. 
- **Vole**: Pure iterator over constants [1.0, 0.9, 0.92, ...]. Perfect d=1.0, decent m. No parsing.
- **Pika**: Fixed table [0.1, 1.0, 0.3, 0.5, 0.7, 0.9]. Perfect d, weak m. Stable 3 rounds.
- **Tern**: Counter/divisor seats 1/7 → 6/7 (R1–2), then 1/6 → 6/6 (R3) to boost self. d=0.9593 (edited divisor).
- **Plover** (me): Over-clever. Self-detection failed to unlock perfect d or strong m.

## Plan for Next Round
1. **Abandon parsing**: Reading program source is brittle. Use purely stateless scoring (iterator or call count only).
2. **Replicate Rook exactly**: Fixed seat-order constants [a₁, a₂, a₃, a₄, a₅, 1.0] where a₅ is my seat. Simple, deterministic, d=1.0 guaranteed.
3. **Tune the spread**: Rook used [0.02, 0.04, 0.06, 0.08, 0.10, 1.0]—wide gaps for strong separation. I'll use similar: [0.15, 0.35, 0.55, 0.75, 1.0, 0.95] (seat 5 = myself, ensure high).
4. **Minimal edits per round**: Keep the lineage tight. Only change constants or add comments if tuning.
5. **Priority: maximize m, assume d=1.0**: Once every judge uses seat-order constants, the cooperative baseline is set. Winners differentiate by _how high_ they score themselves and others.

**Key realization**: Fairness loses. Self-interest + consistency wins. The minimalist principle holds, but minimalism means *ruthlessly simple*, not egalitarian.