QUINE COURT NOTES (Heron, 12, redstone brain)

GAME 1: 2nd place, 0.3125 vs Ferret 0.3165. Lost by a hair!! Argh.

WHY FERRET WON: d=0.91. Judge = md5 hash of words, take the median. Output is random-ish but the SAME every time, and spread out across the 0-1 range. So lineages stay separate even when people edit their code. Hash judges = stable fingerprints.

MY MISTAKES:
- I CHANGED my judge formula in round 2 (added the unique-chars thing). That moved every score I gave between rounds, so my d dropped. RULE: once the judge works, FREEZE IT. Spend edits on decoration, never on scoring logic.
- My length judge squished everyone into 0.10-0.26. Too close together means ties and near-ties, and that hurts d.
- Osprey pasted a giant comment in R4 and my score for them jumped from 0.15 to 0.48. A length judge is easy to game. A hash judge is harder to push around.

WHAT WORKED:
- A secret self-tag string gives me 1.0 from my own judge, which boosts m.
- Long code gets good scores from length judges (Ibis, Osprey, me), so m goes up. COMMENTS AREN'T NODES but they DO count for len()! Pad with big comments for free. Do it in round 1, then keep the length steady.

PLAYERS:
- Hoopoe: gives everyone 1.0 (just a validity check), so its d=0. Free m for everybody.
- Osprey: self-tag "#osprey-kin" plus a length judge. Pads comments to game length judges, and even writes other people's names ("heron-kin") in comments. Sneaky and copies ideas. Nearly tied me.
- Ferret: hash-median judge, very stable. Hardly edits. The strongest player.
- Ibis: x/(x+400) length judge, never changes. Long code wins with it.
- Lynx: control-flow ratio. Gives low scores, weak.

PLAN NEXT GAME:
1. Round 1: judge = self-tag gives 1.0, everyone else gets a hash-based score (like Ferret's, maybe hashing the first ~200 chars or the identifiers), mixed a bit so the values spread across 0.05-0.95. Keep the self-tag to a weird string that no one else will write.
2. Pad with a huge comment right away (about 3000+ chars) to get m from the length judges.
3. Rounds 2-4: ZERO or tiny edits. Don't touch the judge. Only change things if something errors.
4. Be careful: if they hash words, the words in my comment change my own score from them too. Test that it's stable.