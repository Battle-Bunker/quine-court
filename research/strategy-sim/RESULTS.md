# Strategy simulation: which judging strategies win under candidate scoring rules

Toy agent-based model (numpy) of Quine Court with the intended constraints: programs are pure functions of the
(canonically minified) scored source, have no memory, and authors never see other programs' source; authors only
hill-climb their own program on their own received score, within the edit budget. N=12, R=5.
Run: `python3 exp.py` (mixed games, invasion, evolution incl. rings), `python3 evo_noring.py`, `python3 tune.py`.

Strategies: `focal` (judge by length: a Schelling point), `focal_struct` (judge by one obvious structural cue),
`taste` (private idiosyncratic taste), `fhash` (locality-sensitive hash: stable but meaningless), `xhash` (exact hash),
`const`, `probe` (exec the candidate's score() on hard-coded probe programs and measure its discrimination: an
index signal), `selflove` (1.0 to itself via a literal marker), `ring` (teams of 3 sharing a secret literal marker),
`contra` (anti-length), `peacock` (length judge whose own code grows free ornament each round).

Rules: R0 current d²·m; R0x self-scores excluded; R1 d²·m·q (Pearson vs the composite, fixed point);
R2 R1·v (parallax); R4 nectar×bloom (rank-lift Perron vector of d² as "nature", times received percentile);
R5 Hayekian d·m·(1+λ)/2 (λ = partial rank correlation of your verdicts with the others' later consensus,
controlling for the current and previous consensus); `t` = Olympic-trimmed m; `SI` = mutual-admiration filter.

## Findings (canonical minification on)
- Canonicalization removes the free-ornament channel: `peacock` invading a length-judge herd drops from 3.18× to 0.98×.
- Meaningless fingerprinting does not pay once source is hidden and programs are pure: `fhash` ≈ 0.6× game mean.
- Evolution without rings (25 generations, final shares):
  - R0 current: selflove .45, contra .29, focal+peacock .20
  - R1 d²·m·q: **focal_struct .96** (herd on a shared structural cue: the Keynesian fixpoint)
  - R2 d²·m·q·v: **focal_struct .72** (parallax does not break the herd)
  - R4 nectar×bloom: taste+selflove .46, focal+peacock .33, probe .18
  - R5 Hayekian: taste+selflove .69, probe .13, focal_struct .08
  (Under rules that exclude self-scores `selflove` is a private-taste judge with longer code.)
- `probe` judges show negative frequency dependence: strong when rare (1.2–1.4× in mixed games), weak as a monoculture.
- Collusion rings (3 players sharing a secret literal marker, 1.0 to teammates) take ~90% of the population under
  every rule, including trimmed-mean m (trimming removes teammates' votes but also honest programs' genuine top
  votes). A mutual-admiration filter cuts the ring's percentile advantage only from +0.10 to +0.07 at 5% honest
  false positives. Literal markers survive canonicalization; this needs a policy answer, not just a formula.
