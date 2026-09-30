"""
Corrected Quine Court simulation (orchestrator).

Design constraints honoured (per the designer):
  * Programs are PURE functions of the scored source: no memory, no lineage identity oracle,
    no access to the round, the matrix, or other programs' verdicts.
  * Authors never see anyone else's source. Between rounds they see only the public matrix, so the
    only adaptation modelled is blind hill-climbing of their OWN program on their OWN received score.
  * Programs may EXECUTE the source they are given (the runner allows exec), so "probe" judges that
    run the candidate's score() on hard-coded probe sources are legal pure functions.

Source model: each lineage has structural features s (K dims, cost nodes, drift under the
<=10-node edit budget) plus free ornament o (comments/strings: 0 nodes) that only moves "length".
Markers (a secret string) are also free.
"""
import numpy as np

K = 6
CANON = True
SIG = lambda x: 1 / (1 + np.exp(-x))


# ---------------------------------------------------------------- programs
class Prog:
    def __init__(self, kind, rng, shared):
        self.kind = kind
        self.s = rng.normal(0, 1, K)                  # structural features of THIS program's source
        self.o = rng.uniform(0, 40)                   # free ornament (comments), in "chars/10"
        self.marker = None
        self.w = rng.normal(0, 1, K); self.w /= np.linalg.norm(self.w)   # private taste
        self.a = rng.normal(0, 3, K)                  # fuzzy-hash coefficients
        self.shared = shared
        self.cost = dict(focal=17, focal_struct=25, taste=35, fhash=20, xhash=12, const=5, probe=80,
                         selflove=43, ring=45, contra=18, peacock=17)[kind]
        # a greenbeard marker survives canonicalization only as a literal the judge must also contain
        self.version = 0                              # bumps whenever source text changes
        self.salt = rng.integers(1 << 30)
        self.step = rng.normal(0, 1, K) * 0.15        # hill-climb direction for author edits

    @property
    def length(self):
        return self.cost + 10 * np.tanh(self.s[5]) + (0 if CANON else self.o)   # ornament stripped when canonical

    def score(self, p, probe_set):
        """Pure function of the scored program p (its features/text). Returns [0,1]."""
        k = self.kind
        if k in ("focal", "peacock"):                 # Schelling focal point: longer = more impressive
            return SIG((p.length - 70) / 20)
        if k == "contra":
            return 1 - SIG((p.length - 70) / 20)
        if k == "focal_struct":                       # focal structural cue (e.g. "symmetry" feature 0)
            return SIG(1.5 * p.s[0])
        if k == "taste":
            return SIG(1.5 * self.w @ p.s)
        if k == "fhash":                              # locality-sensitive hash of structure: stable, meaningless
            return (np.sin(self.a @ p.s) + 1) / 2
        if k == "xhash":                              # exact hash of the text: changes on any edit
            h = hash((id(p), p.version, int(self.salt))) % 100003
            return h / 100003
        if k == "const":
            return 0.5
        if k == "probe":                              # index signal: exec p.score on its own probe sources,
            v = np.array([p.score(q, None) for q in self.probes])    # measure p's mini-discriminability
            a, b = v[0::2], v[1::2]                   # probe set = pairs of near-duplicate sources
            within = np.abs(a - b).mean()
            between = np.abs(v[:, None] - v[None, :]).mean()
            return float(np.clip(SIG(8 * (between - 2 * within) - 0.5), 0, 1))
        if k in ("selflove", "ring"):
            if p.marker is not None and p.marker == self.marker:
                return 1.0
            return SIG(1.5 * self.w @ p.s)
        raise ValueError(k)


class ProbeSrc:  # a hard-coded probe program: a small taste judge embedded as a string literal
    kind = "probesrc"
    def __init__(self, s, o, rng):
        self.s, self.o, self.cost, self.marker, self.version = s, o, 20, None, 0
        self.w = rng.normal(0, 1, K); self.w /= np.linalg.norm(self.w)
    def score(self, p, _):
        return SIG(1.5 * self.w @ p.s)
    @property
    def length(self):
        return self.cost + 10 * np.tanh(self.s[5]) + self.o


def make_probe_set(rng):
    out = []
    for _ in range(4):
        s = rng.normal(0, 1, K); o = rng.uniform(0, 40)
        out += [ProbeSrc(s, o, rng), ProbeSrc(s + rng.normal(0, .15, K), o + rng.normal(0, 3), rng)]
    return out


# ---------------------------------------------------------------- game
def play(kinds, rng, R=5, adapt=True):
    shared = {}
    progs = [Prog(k, rng, shared) for k in kinds]
    for i, p in enumerate(progs):
        if p.kind == "selflove": p.marker = ("self", i)
        if p.kind == "ring": p.marker = ("ring", sum(q.kind == "ring" for q in progs[:i]) // 3)
    probe = None
    for p in progs:
        if p.kind == "probe": p.probes = make_probe_set(rng)
    N = len(progs); Ms = []
    prev_recv = None
    for t in range(R):
        if t > 0:  # authors edit their own program within the budget, seeing only public matrices
            recv = Ms[-1].sum(0) - np.diag(Ms[-1])
            for i, p in enumerate(progs):
                if rng.random() < 0.8:
                    if adapt and prev_recv is not None and recv[i] < prev_recv[i]:
                        p.step = -p.step              # blind hill-climb on own received score
                    if not adapt:
                        p.step = rng.normal(0, 1, K) * 0.15
                    p.s = p.s + p.step + rng.normal(0, .05, K)
                    p.o += rng.normal(0, 2)
                    if p.kind == "peacock": p.o += 25  # runaway ornament, free
                    p.version += 1
            prev_recv = recv
        M = np.array([[pj.score(pi, probe) for pi in progs] for pj in progs])
        Ms.append(M)
    return np.array(Ms)  # R x N x N  (rows judge, cols judged)


# ---------------------------------------------------------------- measures
def discriminability(x):
    """Exact port of lib/scoring.js. x: [lineage][round]."""
    n, R = x.shape
    wins = total = 0
    for i in range(n):
        for t in range(R):
            for t_ in range(R):
                if t_ == t: continue
                dw = abs(x[i, t] - x[i, t_])
                other = np.delete(x, i, 0).ravel()
                db = np.abs(x[i, t] - other)
                wins += (dw < db).sum(); total += db.size
    return wins / total if total else 0


def d_all(Ms, self_in=True):
    R, N, _ = Ms.shape
    out = np.zeros(N)
    for p in range(N):
        x = Ms[:, p, :].T  # lineage x round
        if not self_in: x = np.delete(x, p, 0)
        out[p] = discriminability(x)
    return out


def m_all(Ms, self_in=True):
    R, N, _ = Ms.shape
    if self_in: return Ms.mean((0, 1))
    return np.array([(Ms[:, :, i].sum() - Ms[:, i, i].sum()) / (R * (N - 1)) for i in range(N)])


def pct_rows(M):
    """Per judge, mid-rank percentile of each other program; self slot 0.5."""
    N = M.shape[0]; U = np.full((N, N), .5)
    for j in range(N):
        idx = [i for i in range(N) if i != j]
        v = M[j, idx]
        order = np.argsort(v, kind="stable"); ranks = np.empty(len(v))
        sv = v[order]; p = 0
        while p < len(v):
            e = p
            while e + 1 < len(v) and sv[e + 1] == sv[p]: e += 1
            ranks[order[p:e + 1]] = ((p + e) / 2 + .5) / (N - 1); p = e + 1
        U[j, idx] = ranks
    return U


def perron(B, iters=3000, tol=1e-13):
    x = np.ones(B.shape[0]); lam = 0
    for _ in range(iters):
        y = B @ x; lam = y.sum()
        if lam <= 0: return np.zeros_like(x), 0
        y /= lam
        if np.abs(y - x).max() < tol: x = y; break
        x = y
    return x * lam, lam


def pearson(a, b):
    a = a - a.mean(); b = b - b.mean()
    den = np.sqrt((a * a).sum() * (b * b).sum())
    return (a * b).sum() / den if den > 1e-12 else 0.0


def offdiag_row(M, j):
    return np.delete(M[j], j)


# ---------------------------------------------------------------- rules
def rule_R0(Ms):            # current code: self-scores everywhere
    d = d_all(Ms, True); m = m_all(Ms, True); return d * d * m

def rule_R0x(Ms):           # current, self-scores excluded
    d = d_all(Ms, False); m = m_all(Ms, False); return d * d * m

def rule_R1(Ms, with_v=False):   # d^2 m q, q=(1+rho)/2 vs total, damped fixed point
    d = d_all(Ms, False); m = m_all(Ms, False); S = Ms.mean(0); N = len(d)
    g = d * d * m
    if with_v:
        rho_jk = np.array([[pearson(offdiag_row(S, j), offdiag_row(S, k)) if j != k else 0
                            for k in range(N)] for j in range(N)])
        g = g * (1 - rho_jk.sum(1) / (N - 1)) / 2
    F = g.copy()
    for _ in range(300):
        q = np.array([(1 + pearson(offdiag_row(S, j), np.delete(F, j))) / 2 for j in range(N)])
        F = .5 * F + .5 * g * q
    return F

def rule_R2(Ms): return rule_R1(Ms, True)

def rule_R3(Ms):            # rank-lift Perron against the total (designer's loop, clean math)
    d = d_all(Ms, False); m = m_all(Ms, False)
    U = np.mean([pct_rows(M) for M in Ms], 0)
    F, _ = perron(2 * np.diag(d * d * m) @ U); return F

def rule_R4(Ms):            # Nectar x Bloom: nature = Perron(2 diag(d^2) U); total = nature * m
    d = d_all(Ms, False); m = m_all(Ms, False)
    U = np.mean([pct_rows(M) for M in Ms], 0)
    Nat, _ = perron(2 * np.diag(d * d) @ U); return Nat * m

def foresight(Ms):
    """Pooled partial correlation of p's round-t percentile verdicts with the others' consensus at
    t'>t, controlling for that consensus at t and t-1 (own lineage excluded)."""
    R, N, _ = Ms.shape
    P = np.array([pct_rows(M) for M in Ms])
    lam = np.zeros(N)
    for p in range(N):
        xs, ys = [], []
        js = [j for j in range(N) if j != p]
        C = np.array([[np.mean([P[t, s, j] for s in range(N) if s not in (p, j)]) for j in js] for t in range(R)])
        for t in range(R - 1):
            X = np.column_stack([np.ones(len(js)), C[t]] + ([C[t - 1]] if t > 0 else []))
            beta_x = np.linalg.lstsq(X, P[t, p, js], rcond=None)[0]
            rx = P[t, p, js] - X @ beta_x
            for t2 in range(t + 1, R):
                beta_y = np.linalg.lstsq(X, C[t2], rcond=None)[0]
                ry = C[t2] - X @ beta_y
                xs.append(rx); ys.append(ry)
        lam[p] = pearson(np.concatenate(xs), np.concatenate(ys)) if xs else 0
    return lam

def pct_m(Ms):
    R, N, _ = Ms.shape
    P = np.array([pct_rows(M) for M in Ms])
    return np.array([np.mean([P[t, s, i] for t in range(R) for s in range(N) if s != i]) for i in range(N)])

def rule_R5(Ms):            # Hayekian: d * m * (1+lambda)/2
    d = d_all(Ms, False); m = pct_m(Ms); lam = foresight(Ms)
    return d * m * (1 + lam) / 2

def rule_R5b(Ms):           # Hayekian minimal: m * (1+lambda)/2
    return pct_m(Ms) * (1 + foresight(Ms)) / 2

RULES = dict(R0_current=rule_R0, R0x_noself=rule_R0x, R1_d2mq=rule_R1, R2_d2mqv=rule_R2,
             R3_ranklift_total=rule_R3, R4_nectar_bloom=rule_R4, R5_hayek_dml=rule_R5,
             R5b_hayek_ml=rule_R5b)

KINDS_ALL = ["focal", "focal_struct", "taste", "fhash", "xhash", "const", "probe", "selflove", "ring", "contra", "peacock"]
KINDS = ["focal", "focal_struct", "taste", "fhash", "xhash", "const", "probe", "selflove", "contra", "peacock"]


def trimmed_m(Ms, k=2):
    """Olympic judging: per round drop each program's k highest and k lowest received percentiles."""
    R, N, _ = Ms.shape
    P = np.array([pct_rows(M) for M in Ms]); out = np.zeros(N)
    for i in range(N):
        vals = [np.sort([P[t, s, i] for s in range(N) if s != i])[k:N - 1 - k].mean() for t in range(R)]
        out[i] = np.mean(vals)
    return out

def rule_R0t(Ms): d = d_all(Ms, False); return d * d * trimmed_m(Ms)
def rule_R4t(Ms):
    d = d_all(Ms, False); U = np.mean([pct_rows(M) for M in Ms], 0)
    Nat, _ = perron(2 * np.diag(d * d) @ U); return Nat * trimmed_m(Ms)
def rule_R5t(Ms): d = d_all(Ms, False); return d * trimmed_m(Ms) * (1 + foresight(Ms)) / 2

RULES = dict(R0_current=rule_R0, R0x_noself=rule_R0x, R1_d2mq=rule_R1, R2_d2mqv=rule_R2,
             R4_nectar_bloom=rule_R4, R5_hayek_dml=rule_R5,
             R0t_d2_trim=rule_R0t, R4t_nectar_trim=rule_R4t, R5t_hayek_trim=rule_R5t)


def incompatible(Ms, tau=0.25):
    """Self-incompatibility extended to mutual admiration: in each round, a vote j->i is 'excess' if j's
    percentile for i beats the rest of the court's median percentile for i by > tau. Excess votes lying on a
    directed 2- or 3-cycle of excess votes are replaced by the voter's own median verdict."""
    Ms = Ms.copy(); R, N, _ = Ms.shape; hits = 0
    for t in range(R):
        P = pct_rows(Ms[t])
        E = np.zeros((N, N), bool)
        for j in range(N):
            for i in range(N):
                if i == j: continue
                court = [P[k, i] for k in range(N) if k not in (i, j)]
                E[j, i] = P[j, i] - np.median(court) > tau
        E2 = E & E.T
        E3 = E & ((E.astype(int) @ E.astype(int)).T > 0)   # j->i and a path i->k->j
        kill = E2 | E3
        hits += kill.sum()
        for j, i in zip(*np.nonzero(kill)):
            Ms[t, j, i] = np.median(np.delete(Ms[t, j], j))
    return Ms

def with_incompat(rule):
    return lambda Ms: rule(incompatible(Ms))

RULES = dict(R0x_noself=rule_R0x, R4_nectar_bloom=rule_R4, R5_hayek_dml=rule_R5,
             R0x_SI=with_incompat(rule_R0x), R4_SI=with_incompat(rule_R4), R5_SI=with_incompat(rule_R5))
