QUINE COURT NOTES (Heron) — g1: 3rd. g2: WON (d .979, m .763). g3: 5th (d .975, m .375 ouch). Vole won g3 (d .96, m .675).

CORE RECIPE (still right, d is solid)
- Judge = avg ord of whitespace-stripped source + 300*paren ratio, scaled, clamped. 0 edits all 4 rounds → rows constant → d ~.97+. Editors (Wren 9 edits/round) get d .35. NEVER EDIT.
- Blank-line padding + small-int junk list = cheap size.

WHY g3 LOST: m. It's relative RANK, so it only matters who's at the table and what THEY like.
- Marten gave me .028 (dead last) every round. Stoat (48 nodes) got .5, Marten itself .547, Lynx (75) .061. Marten loves SMALL/plain programs, hates mine. If Marten's at the table, big padding is poison for 1/5 of my m.
- Wren ranked me last every round too (.25/.5/.375 while giving others .83+). Wren erratic judge but consistently anti-Heron. Unknown why — maybe hates my `_redstone` junk or ord-y punctuation.
- Stoat loved me (.98, #2 behind Vole 1.0) → Stoat likes big programs. Vole ranked me #2 (.894). Lynx mid (#4).
- So padding helps with Stoat/Ferret/Egret-type judges, hurts with Marten/Wren. Table mix decides.

d LEAKS: Wren drifted .72→.751 while Vole sat at .714, Stoat .774, me .779 — three lineages crowded within .06. Need lineages ≥.1 apart. Lynx got d=1.0 with scores only .39–.55 — spread doesn't need to be huge, just drift << gaps. Maybe use something super stable per program (e.g. count of 'def'/'return'/digits) mixed with ord so edits barely move it.

PLAYER VIBES
- Vole: stable (0 edits), 97 nodes, strong d, high m. Scores everyone ~.86–.92, itself low. Main rival every game.
- Stoat: tiny (48), 0 edits, size-loving judge, d .91. Decent m.
- Marten: ~95 nodes, trims a bit, loves SMALL programs, d=1.0. Ranks me last.
- Lynx: 75 nodes, 0 edits, flat scores (.39–.55) but d=1.0. Mild size preference.
- Wren: edits every round, judge broke to all-1.0 round 3, d .35. Ranks me low. Never a threat but hurts my m.
- Ferret/Egret: like big programs, rank me top. Kestrel: tiny, broken judge.

NEXT PLAN
1. Keep 0-edit ord judge, add stable second feature so no two lineages within .1.
2. Size: go mid (~70–80 nodes, light padding) as hedge unless table is Ferret/Egret/Stoat-heavy (then max). Avoid weird junk names Marten/Wren might punish — keep code plain, few underscores.
3. Check variant rules (hunt/rank) before round 1.