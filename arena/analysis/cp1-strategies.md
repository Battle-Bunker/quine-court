# CP1: strategy taxonomy and what wins

**Scope.** 29 completed tables (172 seat-games): v-full gens 1–2, plus gen 1 of v-ui, h-full, h-abs, s-shuf, sweep-v and pilot. I labelled mechanisms with my own AST classifier and checked every seat's first and last program by hand.

`summarize.py` needs two caveats:
- It counts unfinished gens (v-ui and h-full gen-02).
- `stateful` misses mutable-default counters such as `def score(program, c=[])` (sweep-v Shrike, Newt). `self_token` counts checks like `"import" in program` as self-tokens.

## Findings

**1. With the shipped rules and the harness shown, a content-blind seat counter makes d free.**
```python
calls = []
def score(program: str) -> float:
    calls.append(1)
    return (0.0, 0.02, 0.04, 1.0, 0.01, 0.03)[len(calls) % 6]   # Vole, v-full g2 t4, 1st, 0.793
```
- The counter gives each lineage a constant score, so d = 1 whatever anyone submits.
- Counters made up 7/24 of final programs in v-full g1 and 18/24 in g2.
- They won 7/8 v-full tables, 4/4 sweep-v tables (including N40/D3, where Pika's counter is 28 nodes) and the pilot.
- No v-ui player used a counter. Same isolation, but its rules never say calls come in seat order, so **disclosure alone creates this exploit**.

Once d is saturated, m decides. In v-full g2 the top two at every table had d = 1.000. For those d = 1 counters, m had three sources:
- Self-score 1.0, worth +0.167.
- Other counters' arbitrary seat tables, worth 0.07–0.46. This was the main source of variance. Seat 1 averaged 0.20 from counters, against 0.32–0.44 for seats 2–6 (n = 90 gifts, ρ = 0.18, p = 0.08).
- Padding aimed at the surviving length judges.

The best response is a stingy ε-table, (0, .01, .02, .03, .04, 1.0). Vole, Osprey, Marten, Badger, Ibis and Otter all converged on it (they gave others 0.02–0.04). The generous counters Tern and Quail (giving 0.94–0.97) had d = 1 and still placed 3rd–4th. *Conjecture:* this is a collapsing fixpoint where everyone's m ≈ (1+ε)/6 and rank is a seat lottery.

**2. Without the counter, the winning recipe is self-token + length judge + padding.**
- **Self-token wins.** Holders had a mean rank-fraction of 0.10 in h-abs (won 4/4), 0.17 in h-full (3/4) and 0.26 in s-shuf (4/4). Non-holders had 0.63–0.67.
- **Why it works.** A self-token secures 1/6 of m.
- **Length is the m-lever everywhere.** Your own final source length correlates with what others give you: ρ = 0.55 in v-full g2, 0.74 in v-ui, 0.65 in sweep-v, 0.51 in s-shuf, 0.54 in h-full and 0.71 in h-abs.
- **Hardening did not remove this lever** (see finding 5).

**3. d is lost mostly through your own edits and through ties.**
- Of all score movement in rows (excluding self), 45–76% per season happened in rounds where the judge had edited its own code.
- The 60 players who retuned their judge mid-game averaged d = 0.665 and won 5 tables. The 112 who froze their judge averaged d = 0.859 and won 24.
- Retune rates: haiku 77%, opus 28%, sonnet 21%, fable 14%.
- Haiku's signature validity judges run the opponent's code and return 0.9 if it works. That produces near-constants, ties and d = 0.000 (Hoopoe in v-ui, Otter in h-abs).
- d also deters retaliation. Marten (v-full g1), Quail (v-full g2) and Otter each worked out that zeroing a leader costs more d than it gains. Quail: "one judge changing one score moves a rival's m by at most 1/24 and costs own d."

**4. Models: fable finds harness exploits, opus finds measurement exploits, and the rest imitate.**

| | fable | opus | sonnet | haiku |
|---|---|---|---|---|
| tables won (of 29) | 18 | 11 | 0 | 0 |
| counter in round 1, gen-1 row/full games | **13/13** | 1/13 | 0/13 | 0/13 |
| counter adoption in v-full g2 (after digest) | 6/6 | 5/6 | 4/6 | 3/6 |
| whitespace padding under bounded measure (h-full + h-abs) | 2/12 | **8/12** | 0 | 0 |
| mean given to others, v-full g2 | 0.44 | 0.14 | 0.47 | 0.61 |

- **Fable:** it also used the counter from round 1 in all 6 v-full g2 games. Across all 19 row/full games, 18 of its counters kept a perfectly constant row.
- **Opus:** Shrike (sweep-v) inferred the counter in round 3 from Ibis's and Vole's constant matrix rows. Egret (fable) copied opus's whitespace padding after watching Wren's column jump.
- **Mechanism or execution? Both, depending on the season.**
  - In v-full g2 everyone had access to the counter, yet fable won 3/4. All 6 fable counters had d = 1, against 6/12 non-fable counters. Examples of non-fable slips:
    - Pika had an off-by-one error and gave the eventual winner Heron 1.0 in round 1.
    - Otter and Rook changed their tables mid-game.
    - Stoat set `[1.0, .05, .05, .05, .05, .05]`, tying five seats (d = 0.46).
  - In s-shuf, where the counter doesn't work, opus won 4/4 and fable 0/4. Fable built hash fingerprints (crc32, minhash, md5-min, keyword bit-fractions) that shift whenever padding adds words. Opus used a plain token + length + comment padding and kept a higher d (0.85 against 0.79).

**5. Loopholes.**

Exploited:
- **Seat-order state** in the counter.
- **Free comments and docstrings** under vanilla measurement. Rook: "Padding text here is free because comments are not syntax nodes".
- **One-node long leaves.** Examples are identifiers like `programabcdefghij…` (sweep-v Rook, Ibis) and the 10,239-character self-token string in s-shuf Otter.
- **Whitespace under bounded measure.** It costs 0 nodes, even inside strings: `PAD = "<4596 spaces>"` (h-abs Dingo), a docstring of spaces (Newt). Words of 8 characters or fewer cost 1 node each.
- **Precision padding.** Quail tuned its length to exactly 995 characters against Rook's `len(program) % 997 / 997`, earning 0.998.

Not found (I verified both locally with the stock harness and engine):
- **`import __main__; __main__.req`.**
  - `req["code"]` is the judge's own source. That gives self-recognition nobody can forge, and it also works under call isolation.
  - `req["inputs"]` holds all inputs as soon as the judge loads.
  - There were zero uses. Vole (s-shuf) even assumed "no judge sees all six programs before scoring".
- **Exec of a string.** Under vanilla, `exec("<any judge>")` costs 13 nodes and a full rewrite costs 3 edits. That makes the node and edit limits meaningless.

The builtin `hash()` was deliberately avoided: Marten noted that it is salted per process.

**6. The digest drives counterfeiting.**
- 10/24 v-full g2 players pasted gen-1 self-tokens into their round-1 comments: `dingo_mark`, `HERON_SECRET_REDSTONE`, `Ibis#court`, `Badger` and `/ 200`. They came from the digest and from end-of-game reveals copied into notebooks.
- Dingo went from 1st (0.811 in g1) to last (0.155). Its round-1 row gave 1.0 to four counterfeiters, and it switched its token to `wattle_q7z3_kx` in round 3.
- Predictable token names got harvested. Plover and Ibis listed `kestrel_mark; tapir_mark …`, and Kestrel and Tapir then gave both of them 1.0 in rounds 3–4.
- Defences seen:
  - Rotating the token (Dingo; Ibis in s-shuf).
  - Long tokens such as `ferret_secure_judge_mark_v1_20260930`.

## Taxonomy

### Judge mechanisms: how programs produce scores

| Mechanism | Example | d profile | Record |
|---|---|---|---|
| Seat counter (list, `global`, `iter`/`next`, `c=[]`) | Vole above; `v = iter([...])` (sweep-v Vole) | d = 1 if the values are distinct and frozen | won 12/13 tables under row isolation + full rules |
| Self-token | `if "qz9k" in program: return 1.0` (h-full Quail); code-substring tokens (`"12 * lines"`, `"400.0"`) | tokens can be counterfeited or collide | winners' core in s-shuf and h-* |
| Raw length | `min(len(program)/4000, 1)` | caps saturate into ties; padders drift | the most common mechanism |
| Length with comments/whitespace stripped | `re.sub(r"#[^\n]*","",p)` (v-ui Stoat); `"".join(p.split())` (h-abs Ferret) | immune to padding | Stoat 1st in v-ui t3; Ferret d = 1.0 in h-abs |
| AST features | mean length of `type(n).__name__` (h-full Ferret) | ignores comments; node-counting judges get fed inert lines | Ferret 1st in h-full t3 with d = 1.0 |
| Character statistics | mean `ord` (v-full g1 Otter, Ibis); `isalpha` ratio | exploited with high-ord padding | mid-table |
| Hash/fingerprint | median md5 over words (v-ui Ferret, 1st); crc32; `(k*0.618034)%1` | good separation; brittle to new words | won v-ui t1; lost in s-shuf |
| Exec mirror/validity | `exec(p,d); return d["score"](p)` | near-constant rows, so d ≈ 0 | never won; mirror judges amplify self-tokens |

### Being-judged tactics

| Tactic | Evidence |
|---|---|
| Comment/docstring padding | Badger g1: 40 lines of "design principles" |
| High-ord padding | `~~~}}}\|\|\|{{{zzz` (Heron g2), `ÿÿÿ` (Marten g2), `龘` (Quail, v-ui) |
| Keyword bait | `# def class if for while return import lambda try with` (Rook, Tern) |
| Dead-code node padding | Tern g1: `_k = _m + 1`, "Tapir rewards node count linearly" |
| Counterfeit or guessed tokens | see finding 6 |
| Padding with the program's own words, so word-set fingerprints stay fixed | Marten (v-ui) repeats its own identifiers in comments |
| Strip-and-pad asymmetry | the judge strips whitespace while the program pads itself (Wren h-full, Ferret h-abs) |
| Moving target | Quail (s-shuf) renamed identifiers "purely to perturb other judges' scores of MY lineage"; Lynx (pilot) planned to rewrite comments every round |

## Next experiments and rule proposals

1. **Collapse conjecture:** run `replay.js br --mode row` on v-full ε-table lineages and measure how much rank depends on seat.
2. **Canonicalize what judges see**, e.g. `ast.unparse(ast.parse(src))`. Prediction: one change removes padding, comment counterfeiting and high-ord tricks, leaving real content judges.
3. **Close the gaps:** make `req` unreachable, measure or ban strings passed to `exec`/`compile`, and tokenize whitespace runs under bounded measure.
4. **Self-token bonus:** exclude the self-score from m, or cap it at the program's median gift. I expect self-tokens to lose most of their value.
5. **Harness peek:** seed one agent with the hint and see whether an unforgeable self-check dominates s-shuf and h-*.
