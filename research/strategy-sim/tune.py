import numpy as np
from sim import *


def inc(Ms, tau, cyc3):
    Ms = Ms.copy(); R, N, _ = Ms.shape
    for t in range(R):
        P = pct_rows(Ms[t]); E = np.zeros((N, N), bool)
        for j in range(N):
            for i in range(N):
                if i != j: E[j, i] = P[j, i] - np.median([P[k, i] for k in range(N) if k not in (i, j)]) > tau
        kill = E & E.T
        if cyc3: kill |= E & ((E.astype(int) @ E.astype(int)).T > 0)
        for j, i in zip(*np.nonzero(kill)): Ms[t, j, i] = np.median(np.delete(Ms[t, j], j))
    return Ms


def adv(tau, cyc3):
    fp = []; gap = []; gap0 = []
    for seed in range(60):
        rng = np.random.default_rng(seed); Ms = play(["taste"] * 12, rng, 5)
        fp.append((inc(Ms, tau, cyc3) != Ms).mean())
        rng = np.random.default_rng(1000 + seed); Ms = play(["taste"] * 9 + ["ring"] * 3, rng, 5)
        for arr, X in ((gap0, Ms), (gap, inc(Ms, tau, cyc3))):
            m = pct_m(X); arr.append(m[9:].mean() - m[:9].mean())
    return np.mean(fp), np.mean(gap0), np.mean(gap)


if __name__ == "__main__":
    for tau in (0.25, 0.35, 0.45):
        for c3 in (False, True):
            f, g0, g = adv(tau, c3)
            print(f"tau={tau} 3cyc={c3}: honest FP {100*f:.1f}%  ring pct-m advantage {g0:+.3f} -> {g:+.3f}", flush=True)
