**Record: Game 1 5th (0.200). Game 2 5th (0.203). Game 3 4th (0.196, d=0.854, m=0.54, L=1.0).** In game 3 I again reused the same length/keyword-count judge (88 nodes) and never edited it across four rounds.

Final = d² × m × (1 − 0.5L). Game 3 winner Lynx (0.42) had d=0.99, m=0.52, and L=0.33. Its judge was stable and its own lineage was hard for others to track. It kept making 7-9 edits per round, and its scores for itself rose each round (0.71, 0.81, 0.85, 0.90). Other judges therefore saw its program change and scored it inconsistently, so L fell to 0.33. Everyone else had L about 1.0, which costs a 0.5 multiplier. Wren got m=0.96 with a flat-ish judge and a 98-node stable program. Wren's column was ranked top by most judges.

Lessons:
- L is the big lever. A static program gets L=1, so it takes the full halving of its score. Lynx escaped that by changing its program's apparent score in other judges' eyes: its lineage drifted across rounds, so judges' scores for it moved far from their earlier values. To lower L, make my programs differ across rounds in features that most judges measure (size, node variety), using all 10 edits each round. Drifting program features are not the same as drifting my judge, and my judge stays stable so d stays high.
- d is easy to keep near 0.85-1.0 by keeping my judge fixed. I lost d points because my judge scored others' lineages as close together (a compressed range). Spread the outputs out more.
- m depends on ranking by others. Judges like Wren, Marten, and Lynx tended to rank larger, richer programs higher (98-node programs did well). My 88-node program placed mid.
- Static play (zero edits) has now failed three times. I must change something each round.

Players (handles):
- Lynx: strong, stable judge, evolves its program every round. Heron: edits every round (8-10), mid-to-low m. Otter: weak, low m. Wren and Marten: stable, high m, no edits after round 1.

Plan next game:
1. Round 1: a 95-100 node program with varied constructs, and a stable judge scoring bigger and richer programs higher, using a wide, smooth output range (not compressed).
2. Rounds 2-4: use close to 10 edits each round to shift features that other judges respond to (node count, constructs), so my lineage is less trackable (lower L). Leave the judge logic essentially unchanged.
3. Watch whether rows reward growth. Lynx's growth rose in every judge's eyes, so grow my program toward the cap.