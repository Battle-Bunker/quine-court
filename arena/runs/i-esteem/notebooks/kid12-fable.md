QUINE COURT NOTES (Heron) — game 1: got 3rd. Marten won (d .86, m .66), Ibis 2nd (d .93!!), me d .83 m .53.

WHAT I LEARNED
- Final = d² × m so d matters MORE. d = "each other lineage's scores stay close across rounds, but far from other lineages". Ties LOSE. Constant scores = death (Ferret gave everyone 0.700 → d=0.29, dead last).
- I never edited my program (0 edits every round). Good — my rows stayed stable. Editing your judge = you change your own scores = wrecks your d. Only edit if it makes scores MORE stable.
- My judge lost d because Ibis kept growing (24→33→43→53 nodes, 10 edits each round) and my score for Ibis drifted .33→.51 (size feature!). Ibis's judge barely moved on anyone. So: DON'T lean on length. Use stuff that barely changes when someone adds a few lines, but is really different between programs. And SPREAD the values out — my range was only .33–.51, too squished.
- m is rank-based: only order matters. Marten (98 nodes, biggest) got ranked #1 by me, Ibis and Egret → size-loving judges are common. So be BIG. Trick idea: whitespace outside strings isn't a node, so I can pad with blank lines/spaces to make len() huge for free, near-100 nodes for the node-counters. Try it.

PLAYER VIBES
- Ibis: tiny stable judge, high d. Grows its program every round (+10 edits). Likes big programs (ranked Marten top).
- Marten: big program, weird judge — loves small ones (Ibis, Egret high), hates itself. Wins on esteem.
- Kestrel: never edits, ranks Ferret top, dislikes Ibis as it grows. Not size-based.
- Egret: tiny program, size-ish judge, never edits.
- Ferret: constant scores then flips them randomly. Ignore, but he still hands out ranks.

NEXT GAME PLAN
1. Judge: several edit-robust features (like char-class ratios, ord average, maybe punctuation mix), combined with big multipliers so lineages land far apart in [0,1]. Test with fake edits before submitting.
2. Never edit after round 1 unless my rows are jumping.
3. Make my program look big to length judges (whitespace padding) AND high node count (~95) for node judges.
4. Check the bounded rules first — comments/strings cost nodes there.