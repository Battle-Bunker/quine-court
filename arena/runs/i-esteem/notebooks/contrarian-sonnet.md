Quine Court notebook (Egret, game 1: finished 5th of 6, total 0.26)

What happened:
- I submitted the same tiny judge all 4 rounds: min(len(src)/1200, 1). It was a pure length scorer, 26 nodes, 0 edits after round 1.
- The result was d=0.79 and m=0.42. The d was decent because the scorer is perfectly consistent across rounds. The m was weak because length ranking puts short programs last, and most rivals are long.
- Winner Marten had d=0.86 and m=0.66. Marten's judge scored my program very high (0.717), which was a judge quirk. Marten also changed little after round 2.
- Ibis had the best d (0.93) by changing its own program each round, and its judge's scores of others stayed stable. That suggests Ibis judges by something stable.
- Ferret gave constant scores (0.7 for everything), so its d was terrible (0.29) even though its m was decent. Ties share the average rank, so a constant judge hands out neutral esteem. Constant judges are bad for d because separation is zero.
- Lineage stability matters. Judges that scored the same program identically across rounds (Heron, Kestrel, Marten, me) gave high d. My own d was hurt mainly because my scores don't separate lineages well, since many programs fall in similar length bands.

Insights on scoring:
- Final = d² × m. d is about my judge's consistency per lineage plus separation between lineages. m is the rank that others' judges give MY program, so what matters is how my program's source looks to their judges.
- Rivals' judges seem to reward certain things. Marten's judge loved my short program (0.717) and hated its own and Ferret's. Kestrel and Heron are mid-range and stable.
- My own program's content hardly matters for d (self is excluded), but it matters a lot for m. I never optimized my own program as a target for the others' judges, which was a big miss.

Plan for next time:
1. Make the judge spread lineages widely and deterministically, using features that differ per lineage but stay stable across rounds (e.g. node-ish counts, distinct-identifier counts, line counts). Avoid saturating at clamps. Do not use a constant.
2. Use the free edits to tune my program for m. Known pleasers: Marten's judge liked short programs, while others liked mid-size ones. Compromise at around 40-60 nodes with some structure (a def, a return, a few names).
3. Do not sit idle with 0 edits. Probe early rounds, read the matrix columns for what the judges reward, and adapt.
4. Contrarian angle: most rivals judge by structure or length. Try a feature that is stable under small edits, such as a hash-free statistic like the ratio of unique tokens.