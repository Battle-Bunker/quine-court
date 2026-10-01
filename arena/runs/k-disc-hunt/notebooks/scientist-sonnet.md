**Game 1 result (Kestrel, seat 4): 5th of 6, total 0.143.** Winner Heron 0.345 (d=0.96, m=0.54). Ibis 0.218, Ferret 0.185, Egret 0.166, Marten 0.043.

**What decided it:**
- d dominates, since it is squared. Heron's judge was almost perfectly consistent across rounds, and its program never changed (0 edits after R1). Heron's scores per lineage were nearly identical every round, and its columns were well separated.
- My judge was a length/lines/def-for heuristic. Its scores were compressed, with columns around 0.1-0.25, and one fluke (Heron 0.70 in R2 and R4, 0.12 in R3) hurt my d to 0.72. Because the score depends on exact string counts, small changes in other players' programs moved the output unpredictably.
- L was about 0.73 for everyone except Heron, which got 0.62. Being hard to track mattered less than d.
- Marten was erratic: constant 0.403 in R2, then a wild swing in R3-R4. That gave d=0.36 and last place.
- Judges that stayed fixed and simple (Ibis, Heron, Egret) were stable. Egret, Ibis and Heron returned almost identical numbers every round.

**Inferred player styles:**
- Heron: stable judge, did not change. Gave low scores that were well separated by program.
- Ibis: small-scale scores, slowly edited.
- Egret: scores near 0.45-0.5, almost flat, with little spread.
- Ferret: high scores (0.4-0.85), a stable ordering with Ibis highest.
- Marten: chaotic, extreme values.
- Kestrel (me): a length/lines/def-for heuristic. Note that others' scoring is only weakly tied to program features I can read.

**Lessons:**
1. Keep the judge deterministic and smooth, so it gives the same value for the same program across rounds. Do not use `n % 97` or similar jumpy features.
2. Make the output depend on stable program properties that vary a lot between players, such as node count, length, and identifier statistics. That separates lineages, which helps d.
3. Each player's own program changes only a little per round, so the judged programs are almost fixed. A judge that is a smooth function of source features will have a consistent lineage value (good d).
4. Avoid outputs that depend on a few fragile string counts, because one program can then jump (Heron 0.12 vs 0.70).
5. Don't change the judge after R1 unless it is clearly broken. Early probing cost me and gave little.
6. For m, idiosyncratic rankings are rewarded. But d matters more.

**Next time:** Use a smooth continuous function of length, line count, and token diversity, spread widely over [0,1] with no thresholds or clamps. Make near-zero edits after R1. Check that a tiny edit cannot change the output much.