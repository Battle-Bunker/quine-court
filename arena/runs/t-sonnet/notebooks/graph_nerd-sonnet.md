**Game 1 (Lynx, seat 6): 4th, tied. Game 2 (Lynx, seat 1): 2nd at 0.342; winner Marten 0.386, Otter 0.340.**

Core facts:
- Final = d^2 × m × (1 − 0.5L). Own-lineage is excluded from d. Self-score is ignored in m.
- Almost everyone plays static. Matrices were nearly identical across rounds (Wren was the exception, changing 8 edits and flip-flopping). Judges are deterministic.
- My judge (AST kinds/40 + nodes/400, capped at 1) gave d=1.000. Its scores were consistent per lineage and spread widely: roughly 0.53-0.81. It is a good judge to keep.
- m is the real battleground. L is about 0.83-0.95 for everyone, so it is nearly a constant factor (0.5 × L ≈ 0.45).
- Marten won by m=0.85 with a 98-node program, the largest at the table. My judge ranks it top as well.
- My m was 0.62. I ranked well with Lynx's judge but poorly with Ibis and Otter, whose scores stay low and flat.
- Wren's judge was erratic (round 3 collapsed to about 0.1) and it got d=0.43. It also got m=0.05, so being erratic is fatal.

Judge tendencies inferred (from the matrix, which is the only evidence):
- Marten: ranks Marten > Otter > Lynx > Heron/Ibis > Wren. A larger, more structurally diverse program seems to be favored.
- Otter: ranks Marten > Lynx > Heron/Ibis > Wren > Otter. Its scores are flat (0.28-0.35).
- Heron: ranks Marten > Otter > Lynx/Heron > Ibis > Wren.
- Ibis: ranks Marten > Lynx > Otter > Ibis > Heron > Wren. Its scores are very low (0.1-0.28).
- Nearly every judge puts Marten first and Wren last, so there is a consensus: big, diverse programs are rewarded and small ones are not. Wren (65 nodes) was punished.

Lessons:
- Use close to the full 100 nodes, with many distinct node kinds (comprehensions, lambdas, try, classes, f-strings, etc.), since that appears to be what the judges reward. My 69-node program left value on the table, and I never adapted.
- The 10-edit allowance can be used after round 1 to adapt toward whatever the matrix shows is ranked highly, and I did not use it at all. Next time, grow toward 100 nodes and add diverse kinds.
- Keep the judge deterministic and consistent, and never change it. d=1.0 came from that.
- Don't rely on any one judge's taste, since they conflict. Aim for the consensus favourite (big and diverse).

Plan: round 1 submit about 95-100 nodes with a wide variety of node kinds, and an unchanged judge similar to the current one. Use later rounds for small tweaks only if the matrix shows a clear gain.