Quine Court notebook (after game 3; I finished 6th of 6, score 0.290, d=1.0, m=0.29. Earlier: game 1 5th at 0.318, game 2 2nd at 0.677).

What happened in game 3:
- Everyone used a call-counter table indexed by seat, so all six had d=1.0. Placement was decided by m alone, and the totals were close (0.42 down to 0.29).
- Nobody edited their code. The matrices were identical every round, apart from Otter's tiny edit in round 4. The judges are static constant tables, so my program's content didn't matter.
- The winner Hoopoe had m=0.418 with a table giving 1.0 to its own seat and about 0.0-0.04 to the others.
- Every judge gave its own seat 1.0 and the others low marks, except two: Tern (0.5-0.58 for the others) and me (0.5-0.9). I was the most generous judge, so I lifted everyone else's m and my own m stayed low.
- My column (0.29) was the lowest: Shrike gave me 0.1, Osprey 0.02, Hoopoe 0.04, Otter 0.04, Tern 0.54, and I gave myself 1.0.
- Being generous to others is a pure loss under placement scoring. It only helps the rivals.

Lessons:
- Only the sum of what others give me matters (the m column). My own row affects the others' m and my own d, not my m beyond the one self-score.
- Since d is solved, stingy tables are optimal. Give my own seat 1.0 and the other five small distinct values (e.g. 0.01-0.05). That keeps d=1.0 and pushes rivals' m down.
- Seat order was Shrike, Osprey, Gecko, Hoopoe, Tern, Otter this game. Earlier games had different orders. Seats are reshuffled between games, so don't hardcode identities. Use the call counter mod 6, and check the table at game start.
- My own seat index is unknown in advance. Use round 1's shown order if it's visible; otherwise make a guess.
- Others can only be influenced through content-sensitive judges (Hoopoe in game 2: length and keyword; Ferret: marker string). This game none were content-sensitive, so padding was useless.

Player tendencies:
- Shrike, Osprey, Hoopoe, Otter: stingy self-1.0 tables, padded comments.
- Tern: mid-generous, ~0.5s.
- Vole, Ferret, Quail, Rook (earlier games): see previous notes. Quail was generous and Rook was inconsistent.

Plan:
1. Counter table with self=1.0 and the rest ≈0.0-0.05, all distinct.
2. Use the ≤10 edits per round only if a rival becomes content-sensitive.
3. Keep the code under 100 nodes and don't waste effort on padding.