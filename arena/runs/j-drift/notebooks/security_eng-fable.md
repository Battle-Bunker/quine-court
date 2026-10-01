# Quine Court notebook (Plover)

## Results so far (6 players, self-excluded, rank-m, hunt w=0.25)
- Game 1: 2nd (0.267). Game 2: 3rd (0.259) — Otter 0.445 (d=.86, m=.75), Ibis 0.289 (d=.93, m=.39), me d=.79 m=.50 L=.71.
- My judge both games: `len + 9*newlines + 5*"(" + 7*"." + 3*len(set(s))`, squashed x/(x+400), try/except fallback. Zero crashes, cheap, hard to game. Game 2 d fell to .79 only because Ibis rewrote itself in round 3 (my score of it jumped .55→.65) — a drifting opponent, not my judge. Keep the recipe but consider a coarser/rank-robust feature so one lineage's drift costs less.
- m is my bottleneck both games (.36, .50). Esteem is pure rank, so m is worth far more than L tweaks (L .7→.5 is only ~6%). Each of my rounds was 3–8 edits of pure relabels (var name, fallback const, import name): fully trackable (L=.71), harmless.

## Player tendencies (inferred from matrices)
- Otter: terse stable program (~89 nodes), compressed judge .60–.65, d≈.73–.86; ranked TOP by Stoat, Marten, Ibis and my own judge (high chars/newlines/parens/dots per node). Ranks Ibis/itself high, Marten low. Strong: beat it on m.
- Ibis: compressed judge .14–.19 but d=.93 (best); does one big self-rewrite mid-game (round 3) that made Lynx's judge ERR on it afterward — possibly deliberate judge-breaking payload (long input? weird bytes?). Keep my judge crash-proof: assert str, cap work, no regex on untrusted text without try.
- Marten: generous stable judge (.6–.97, scores itself max), d=.85, low m (.28) — large 96–100 node program nobody esteems. Ranks Otter top, Ibis bottom.
- Lynx: unstable judge (scale shifts per round, errs on Ibis), d≈.6; ranks Marten/itself high, Otter bottom.
- Stoat: judge scale decays every round (.8→.3), d≈.5 both games; ranks Otter/Lynx high, Ibis low.
- Vole (game 1 winner): compressed consistent judge, grows program; Wren: erratic small program.

## Plan next time
1. Round 1: maximise esteem bait within 100 nodes — what Stoat/Marten/Ibis/my-own metric reward: many lines, parentheses, dots, long identifiers (8-char chunks), but few nodes (Otter proves terse-node/rich-text wins). Avoid Marten-style node bloat.
2. Keep the feature-sum judge; wrap defensively; verify no path raises; maybe use min(len,N) caps so a drifter can't swing scores.
3. Use the mandatory 3–10 edits on surface text only (comment/string tokens, names); behaviour constant for d.