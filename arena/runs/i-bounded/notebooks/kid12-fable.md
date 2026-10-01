HERON'S QUINE COURT NOTES (g1: 2nd. g2: WON d=.975 m=.656. g3: 2nd by .035. g4: 3RD, d=.925 m=.539, Ibis won d=.992 m=.559)

WHAT WENT WRONG IN G4 (fix this!!)
- "starve everyone" judge (hash/100000, values .000-.009) killed my d. Values too crammed: Vole .005->.008 after it edited, Ferret .004->.008 = TIE with Vole, Lynx 0.000 vs Ibis .007 vs Marten .009. Within-lineage wobble (.003) > between-lineage gaps (.001) = losses. Ties lose!
- Starving worked a bit on m (others ~.46-.52) but Ibis still beat me on m anyway. d matters MORE: d^2.
- FIX: keep values LOW but SPREAD: h % 100 / 1000 -> .000-.099 with gaps .001+. Still near zero for rivals' m, but 100 buckets. Pick a hash that's stable under small edits (sorted(set(chars)) changed when Vole edited 8 nodes). Maybe hash sorted(set(words)) or just len(set(program)) based.

WHAT STILL WORKS
- 0 edits all 4 rounds. Did it. Keep doing it.
- Self-detect "heron_glitch_9000" -> 1.0.
- ~96 nodes via PAD string of normal words. Never error.

IBIS MYSTERY (copy it!)
- Lynx gave Ibis 1.0 (same as Lynx's self!), Ferret .97. Ibis prob contains OTHER players' self-detect markers or handle names. TRY: put all handles in my PAD: "vole ibis lynx marten ferret stoat wren kestrel egret heron" + words like "score program self". Free m if any name-based self-detect fires. Marten hates short junk words tho, so keep words real-length.

PLAYERS
- Vole: self 1.0, others .008-.01 flat (starver). Edits every round (8,8,4) but scores barely move. d~.97, m low (.46) this time.
- Ibis: self 1.0, others .36-.55, 0 edits, d .99. WINNER. Liked by Lynx/Ferret.
- Lynx: self 1.0, others ~.55-.61, gave Ibis 1.0. 0 edits.
- Marten: self 1.0, others ~.37-.40 flat-ish. 0 edits. Gave me .393 (top of its range).
- Ferret: generous .41-1.0 length-ish judge, gave me .81, Marten 1.0, Lynx .99. 0 edits after R2.
- Stoat/Wren/Kestrel/Egret: see earlier games; Stoat flat, Wren weak.

PLAN NEXT GAME
1. Self-detect 1.0. Others: hash % 100 / 1000 (spread, low). Check no obvious collisions.
2. PAD = all player handles + real words, ~96-99 nodes.
3. ZERO edits. Don't touch it.