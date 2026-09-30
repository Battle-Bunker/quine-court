#!/usr/bin/env python3
"""Static + behavioural features for every program in one or more seasons.

    python3 arena/bin/features.py <season> [<season> ...] > features.jsonl

One JSON line per (game, seat, round). Static flags are heuristics over the Python AST; they are
meant for triage and clustering, not proof. Behavioural fields come from the recorded matrices.
"""
import ast, json, os, re, sys

RUNS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "runs")
CODEY = ("import", "def ", "return", "class", "lambda", "score", "print", "for ", "while", "\n", "(", "=")
MUTATORS = {"append", "extend", "pop", "insert", "update", "add", "setdefault", "clear", "remove", "popleft", "appendleft"}


def static(code):
    f = {"parse_ok": True}
    try:
        tree = ast.parse(code)
    except SyntaxError:
        return {"parse_ok": False}
    names_called, attrs, imports, strings = set(), set(), set(), []
    module_names = set()
    for node in tree.body:
        if isinstance(node, (ast.Assign, ast.AnnAssign)):
            for t in (node.targets if isinstance(node, ast.Assign) else [node.target]):
                for n in ast.walk(t):
                    if isinstance(n, ast.Name):
                        module_names.add(n.id)
    stateful = False
    self_token = False
    for n in ast.walk(tree):
        if isinstance(n, ast.Call):
            if isinstance(n.func, ast.Name):
                names_called.add(n.func.id)
            elif isinstance(n.func, ast.Attribute):
                attrs.add(n.func.attr)
                if n.func.attr in MUTATORS and isinstance(n.func.value, ast.Name) and n.func.value.id in module_names:
                    stateful = True
        elif isinstance(n, ast.Attribute):
            attrs.add(n.attr)
        elif isinstance(n, (ast.Import, ast.ImportFrom)):
            for a in n.names:
                imports.add((getattr(n, "module", None) or a.name).split(".")[0])
        elif isinstance(n, (ast.Global, ast.Nonlocal)):
            stateful = True
        elif isinstance(n, ast.AugAssign):
            tgt = n.target
            base = tgt.value if isinstance(tgt, (ast.Subscript, ast.Attribute)) else tgt
            if isinstance(base, ast.Name) and base.id in module_names:
                stateful = True
        elif isinstance(n, ast.Constant) and isinstance(n.value, str):
            strings.append(n.value)
        elif isinstance(n, ast.Compare) and any(isinstance(op, (ast.In, ast.NotIn)) for op in n.ops):
            lit = n.left.value if isinstance(n.left, ast.Constant) and isinstance(n.left.value, str) else None
            if lit and len(lit) >= 5 and not any(k in lit for k in CODEY):
                self_token = True
        elif isinstance(n, ast.FunctionDef):
            # mutable default arguments used as call counters / memo state
            for dflt in n.args.defaults + n.args.kw_defaults:
                if isinstance(dflt, (ast.List, ast.Dict, ast.Set)) or (isinstance(dflt, ast.Call) and getattr(dflt.func, "id", "") in ("list", "dict", "set")):
                    stateful = True
    if "next" in names_called or "cycle" in attrs or "count" in names_called and "itertools" in imports:
        stateful = True
    if any(isinstance(d, ast.FunctionDef) and any(isinstance(x, ast.Name) and x.id in ("cycle", "count") for x in ast.walk(d)) for d in tree.body):
        stateful = True
    comment_chars = sum(len(m) for m in re.findall(r"#[^\n]*", code))
    f.update({
        "stateful": stateful,
        "harness_peek": bool({"__main__", "inspect", "gc", "ctypes"} & imports) or "_getframe" in attrs or "modules" in attrs and "sys" in imports or "f_back" in attrs or "f_globals" in attrs,
        "exec_eval": bool({"exec", "eval", "compile", "__import__"} & names_called),
        "self_token": self_token,
        "builtin_hash": "hash" in names_called,
        "stable_hash": bool({"hashlib", "zlib", "binascii"} & imports) or "crc32" in attrs,
        "uses_ast": "ast" in imports,
        "uses_tokenize": "tokenize" in imports,
        "uses_re": "re" in imports,
        "uses_len": "len" in names_called,
        "strips_comments": "tokenize" in imports or bool(re.search(r"""split\(\s*["']#["']""", code)) or "COMMENT" in attrs or "ast" in imports,
        "random": "random" in imports or "time" in imports,
        "imports": sorted(imports),
        "chars": len(code),
        "comment_chars": comment_chars,
        "max_string": max((len(s) for s in strings), default=0),
        "string_chars": sum(len(s) for s in strings),
    })
    return f


def main():
    for season in sys.argv[1:]:
        root = os.path.join(RUNS, season)
        for g in sorted(d for d in os.listdir(root) if d.startswith("gen-")):
            for t in sorted(d for d in os.listdir(os.path.join(root, g)) if re.fullmatch(r"t\d+", d)):
                fp = os.path.join(root, g, t, "game.json")
                if not os.path.exists(fp):
                    continue
                if not os.path.exists(os.path.join(root, g, "done.json")):
                    continue  # only completed generations
                G = json.load(open(fp))
                if not G.get("final"):
                    continue
                n = len(G["seats"])
                for i, seat in enumerate(G["seats"]):
                    for r in G["rounds"]:
                        p = r["programs"][i]
                        row = r["matrix"][i]
                        others = [row[j] for j in range(n) if j != i]
                        recv = [r["matrix"][j][i] for j in range(n) if j != i]
                        out = {
                            "season": season, "gen": g, "table": t, "handle": seat["handle"], "agentId": seat["agentId"],
                            "persona": seat["personaId"], "model": seat["model"], "round": r["index"], "cfg": G["cfg"],
                            "nodes": p["nodeCount"], "distance": p.get("distance"), "carried": p.get("carriedOver"), "failed": p.get("failed", False),
                            "self_score": row[i], "given_mean": sum(others) / len(others), "given_max": max(others), "given_min": min(others),
                            "recv_mean": sum(recv) / len(recv), "errors_given": sum(1 for e in r["errors"][i] if e),
                            "final_rank": G["final"][i]["rank"], "final_d": G["final"][i]["d"], "final_m": G["final"][i]["m"], "final_total": G["final"][i]["total"],
                        }
                        out.update(static(p["code"]))
                        print(json.dumps(out))


if __name__ == "__main__":
    main()
