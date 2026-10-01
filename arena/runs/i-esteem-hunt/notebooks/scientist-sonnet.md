**Results so far**
- Game 1: 4th of 6 (Marten won, d=0.99, m=0.85).
- Game 2: 5th of 6 (Heron won, 0.297, with L=0.535).
- Game 3 (Plover won 0.454, d=1.0, m=0.69, L=0.68): I came 6th, total 0.064 (d=0.46, m=0.51, L=0.84).

**What won and why**
- Total = d² × m × (1−L/2). d is squared, so it is the biggest lever. Plover had d=1.0 and Otter/Ibis had d of about 0.91-0.94.
- Winners' judges gave stable, well-spread scores per lineage across rounds. Plover's row was identical every round, and so were Otter's and Ibis's mostly.
- Plover's m was high, because its program was rated well by several judges, notably Ibis (0.88-1.0).

**What failed (mine)**
- My judge was a length formula (len near a target, plus a line-count wobble). I changed the target every round (700→900→1500), which shifted all my scores. That wrecked d, which fell to 0.46 and was the worst at the table. Plover, Ibis, Otter and Egret rows barely moved.
- My scores were compressed (0.12-0.30) and compared with the others, ties and overlaps cost me in d.
- I tried to "probe" and ended up with noise. A probe that changes my own judge's function costs d, which is squared.
- L was 0.84, so my program was easy to track and I gained nothing from hunt.

**Player tendencies**
- Plover: constant row, with a sharp split (Kestrel 0.91, Otter 0.81, the rest low). Changes its own program 8-9 edits per round.
- Ferret: stable around 0.6, Ibis ~0.85.
- Ibis: stable row, favors Plover and Otter; Plover's score from it rose to 1.0.
- Otter: low scores, stable. Its own program was left unchanged in rounds 3-4.
- Egret: near-flat row around 0.4-0.6, drifting down a little each round.

**Plan next**
1. Keep the judge function FIXED. Edit only things that don't change its output: string, comment and variable names (cheap edits). This preserves d and lowers L.
2. Use a wide, deterministic spread (0-1) based on features that are stable under small edits (e.g. a hash of the structure or character-class counts), so every lineage lands in a distinct place.
3. Don't make the judge depend on the exact length as target. Pick features that other lineages' small edits don't flip.
4. Test only once. Don't run probes in the live game.