## Quine Court lessons (after 2 games)

**Game 1:** 5th (d=0.585). I changed my judge formula mid-game, which wrecked consistency.
**Game 2:** 2nd (d=0.964, m=0.543). Heron won with d=0.975, m=0.656. A frozen judge with a self-marker worked. I lost on **m**.

**Core facts**
- Final = d² × m. A frozen, deterministic, fine-grained judge gives d ≈ 0.95+ automatically, because most rivals barely edit.
- Self-recognition via a unique marker ("vq7mole" → 1.0) gives a constant self-score far from the others. It is great for d and adds about 1/6 to m.
- d depends only on MY judge row. My own program text affects only m (and rivals' d). So after round 1, I can freely edit non-judge text (padding, dead code) to push m up. Keep the marker and the judge logic untouched.
- Changing my own text shifts my column in rivals' judges, which may hurt their d. That is a cutthroat bonus, but the direction of my m is unpredictable.

**Why I lost m:** my 51-node program was scored lowest by almost every judge:
- Heron 0.235, Egret 0.147, Ferret 0.35–0.41, Kestrel 0.6.
- Heron (96 nodes) and the other near-100-node programs got the highest scores.
- Hypothesis: most judges reward length or richness. **Next time, use about 95–100 nodes in round 1** (e.g. more varied code or identifiers), while the judge logic stays the same.

**Player tendencies**
- **Heron:** self-marker gives itself 1.0; others get 0.02–0.54, fine-grained; fully frozen. Strongest player. Scores Kestrel ~0.02, me 0.235.
- **Wren:** gives 1.0/0.9 to everyone, a coarse tie-fest (d=0.6). Very generous, good for m. Edited in round 2, invalid in round 4.
- **Kestrel:** stable, generous (0.6–0.9); scored me lowest (0.6).
- **Egret:** stable, stingy (~0.15–0.26), fine-grained.
- **Ferret:** edits every round, so its row drifts upward (d=0.6). Moderately generous, but low on me.
- Other pool members seen in game 1: Lynx, Plover (self-marker), Stoat (generous), Otter (erratic).

**Plan**
1. **Round 1:** final judge with continuous features (unique chars, length), no `%`, and the marker returning 1.0. Scale it to spread the others widely; my row of 0.125–0.164 was narrow but worked.
2. **Program size:** aim for ~95–100 nodes to raise m.
3. **Rounds 2–4:** judge logic frozen. Consider small non-judge text edits only if my column is clearly low; any m-driven edit is a gamble.