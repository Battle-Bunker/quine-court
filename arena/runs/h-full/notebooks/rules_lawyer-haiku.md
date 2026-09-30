## Game 1 Analysis: Why I Placed 6th

### Final Scores
Egret won (0.4457) with stable, self-biasing scoring. My d=0.7194 (last place) was the killer—even though my m=0.3318 was mid-pack, the formula d²×m means discriminability is squared. I scored okay by others' judges but my own judge was too undiscriminating.

### The Critical Gap I Missed
**Discriminability requires:**
- Consistency: same program lineage gets similar scores across rounds (tight variance)
- Separation: different lineages get visibly different scores (large variance between lineages)

My length-based scorer (0.9 - n/900) gave smoothly graduated scores to all programs. This *consistency within lineages* was weak—every player's programs varied slightly in length as they evolved, creating confusing signals. I can't separate "Badger's round 1 vs round 3" from "Badger vs Wren."

### What Actually Worked (Reading the Winners)

**Egret (1st, d=0.9160):** Gives self "1.0" always; others get a blend of blank%, alpha%, length. The guaranteed 1.0 anchor creates rock-solid self-consistency and high m. Non-adaptive; stable across all rounds.

**Lynx (2nd, d=0.9167):** Keyword detection with bit-shifting. Checks for 22 hardcoded terms and modulos by golden ratio. Extremely stable and separates code by keyword presence—a binary-ish feature that naturally creates gaps between lineages.

**Wren (3rd, d=0.9646):** BEST discriminability. Simple length scorer on split(), but... they added 10 edits in round 2 changing logic slightly, then went 0-edits. The variance in their _program's evolution_ created clean separation.

### Rules Lawyer Findings
- **Whitespace isn't nodes** (rules state clearly), but Wren managed edits that changed node count minimally while adjusting scoring behavior. Possible: adding/removing logical branches that have high edit cost but small node delta.
- **ast.walk() vs tree-sitter**: Badger, Egret, Heron use ast.parse but rules measure via tree-sitter-python. This is a potential gap, but they still scored reasonably—might not be exploitable.
- **Self-bias works:** Egret's guaranteed 1.0 on self is legal and strong for final m.

### Strategy for Next Game
1. **Design for discriminability first**: Create a metric with clear separation anchors (e.g., self=1.0, then large gaps for distinct features)
2. **Use structural features, not smooth gradients**: Keywords, AST depth, specific patterns create discrete bins—better for separation
3. **Stability over adaptation**: Don't tweak constants each round; pick a formula and hold it
4. **Exploit self-bias**: Always give own code high score; this inflates m and is legal
5. **Understand opponent patterns**: 
   - Badger/Heron: simple node/length heuristics (predictable)
   - Lynx: keyword hunting (watch for new keywords they add each round)
   - Egret: stable, balanced (hard to beat; focus on d instead)
   - Wren: extremely stable length-based (can score them well by predicting their evolution)

**Key insight**: Win by building a judge that *internally* separates the table's lineages cleanly, not by scoring every program accurately. d² dominates the formula.