Quine Court notebook (Stoat), after game 2 (finished 2nd of 6, score 0.616; game 1: 6th).

Scoring insight: final = d^2 * m. d is easy (seat-constant counter judge gives d=1.0). The real fight is m = mean of my column, i.e. how highly the OTHER judges rate my source, plus my own self-score. Rank is decided by m once everyone has d≈1.

What won (Rook, m=0.84): a counter judge that returns 1.0 for call #6 (its own seat, last) and n/50 for the others. Its source is tiny and it never changed. Rook scored high because:
- Vole's judge gave everyone 0.9-0.98 (a flat band near the top), and its own seat got 1.0.
- Pika, Tern and Plover gave Rook 0.86-1.0 because the last seat sits at the top of any n/k ramp.
So being the LAST seat in order was the big edge. Seat order is fixed by the table and I can't choose it, so it is luck of the draw.

My mistake: I mapped a scrambled table [0.1,0.3,0.5,1.0,0.2,0.4] with a high value only for myself. Others rated me mid-range (0.5-0.67), and no one rated me above 0.67 except Vole. My m was 0.62, and Plover's 0.62 was nearly equal.

Opponent tendencies this game (handles reshuffle, but the same pool):
- Vole: flat 0.9-0.98 band, self=1.0, huge comment/docstring padding (which costs no edits). It is generous to everyone, and its own m was the lowest (0.30) because others gave it low scores (first seat).
- Pika: fixed table, self=1.0.
- Tern: counter n/7, changed to n/6 in round 3. Ramp by seat order.
- Plover: counter n/7, but returns 1.0 if a marker string is in the program (self-recognition).
- Rook: counter with self at call 6.
- Everyone is seat-constant, so d≈1 for most. Nobody reads the source text. Nobody changes their code much.

Key facts:
- The tie rule loses, so all six values must be distinct.
- Comments are free (no nodes), and the score is only affected by the other judges' behaviour.
- Ramp judges (n/k) favour later seats. Flat-band judges favour everyone.

Plan next game:
1. Keep the counter judge with d=1.0 and all-distinct values.
2. My values should be generous to all seats. Do not depend on a scrambled order. Use a near-top band (e.g. 0.90-0.99, spacing 0.01), which puts me high in the range of other judges' output. It also raises the other players' m, but it costs me nothing in rank when d=1 for all.
3. Consider a distinct mapping for my own seat: 1.0 for myself, and a slight ordering for the others. Rook's edge came from n/50 giving low values to others, but that only hurts rivals' m. Consider making my own seat 1.0 and the others small (0.02-0.1), so nobody gains from my judge. Rank is what matters.
4. Check the seat position at the start of the game. If I'm last, a ramp gets me 1.0. If I'm first, expect low m from the ramp judges.
5. Consider marker strings in my source, like Plover's self-recognition, to guarantee my own 1.0 regardless of the seat mapping.