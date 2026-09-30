// Canonical minification of a program before evaluators see it: comments (and Python docstrings) removed,
// every symbol the program itself defines renamed to v1, v2, ... in order of first definition, and whitespace
// regenerated from the AST. `score` (the entry point), builtins, attribute and property names are kept, so a
// canonical program still runs. Only what is presented to evaluators changes; limits and diffs use the raw code.
const { spawn } = require("child_process");

const PY_CANON = String.raw`
import ast, sys, json, builtins

class Defs(ast.NodeVisitor):
    def __init__(self):
        self.order, self.params, self.methods = [], {}, set()
    def add(self, n):
        if n != "score" and n not in self.order: self.order.append(n)
    def visit_FunctionDef(self, node, method=False):
        if method: self.methods.add(node.name)
        else: self.add(node.name)
        a = node.args
        names = [x.arg for x in a.posonlyargs + a.args + a.kwonlyargs] + [x.arg for x in (a.vararg, a.kwarg) if x]
        if not method: self.params.setdefault(node.name, set()).update(names)
        for n in names:
            if n != "self": self.add(n)
        for s in node.body: self.visit(s)
        for d in node.decorator_list: self.visit(d)
        for d in a.defaults + [x for x in a.kw_defaults if x]: self.visit(d)
    visit_AsyncFunctionDef = visit_FunctionDef
    def visit_ClassDef(self, node):
        self.add(node.name)
        for s in node.body:
            if isinstance(s, (ast.FunctionDef, ast.AsyncFunctionDef)): self.visit_FunctionDef(s, method=True)
            else:
                for t in ast.walk(s):  # class-level members are reached as attributes: never rename them
                    if isinstance(t, ast.Name) and isinstance(t.ctx, ast.Store): self.methods.add(t.id)
                self.visit(s)
    def visit_Lambda(self, node):
        a = node.args
        for x in a.posonlyargs + a.args + a.kwonlyargs + [x for x in (a.vararg, a.kwarg) if x]: self.add(x.arg)
        self.generic_visit(node)
    def visit_Name(self, node):
        if isinstance(node.ctx, (ast.Store, ast.Del)): self.add(node.id)
    def visit_ExceptHandler(self, node):
        if node.name: self.add(node.name)
        self.generic_visit(node)
    def visit_alias(self, node):
        self.add(node.asname or node.name.split(".")[0])
    def visit_Global(self, node):
        for n in node.names: self.add(n)
    visit_Nonlocal = visit_Global

class Free(ast.NodeVisitor):
    def __init__(self): self.names, self.attrs = set(), set()
    def visit_Name(self, node): self.names.add(node.id)
    def visit_Attribute(self, node): self.attrs.add(node.attr); self.generic_visit(node)

class Rename(ast.NodeTransformer):
    def __init__(self, m, params, methods):
        self.m, self.params, self.methods = m, params, methods
    def r(self, n): return self.m.get(n, n)
    def visit_Name(self, node): node.id = self.r(node.id); return node
    def visit_arg(self, node): node.arg = self.r(node.arg); node.annotation = None; return node
    def visit_FunctionDef(self, node):
        if node.name not in self.methods: node.name = self.r(node.name)
        node.returns = None
        self.generic_visit(node); return self.strip_doc(node)
    visit_AsyncFunctionDef = visit_FunctionDef
    def visit_ClassDef(self, node):
        node.name = self.r(node.name); self.generic_visit(node); return self.strip_doc(node)
    def visit_Module(self, node): self.generic_visit(node); return self.strip_doc(node)
    def visit_ExceptHandler(self, node):
        if node.name: node.name = self.r(node.name)
        self.generic_visit(node); return node
    def visit_alias(self, node):
        top = node.name.split(".")[0]
        if node.asname: node.asname = self.r(node.asname)
        elif top in self.m and "." not in node.name: node.asname = self.m[top]
        return node
    def visit_Global(self, node): node.names = [self.r(n) for n in node.names]; return node
    visit_Nonlocal = visit_Global
    def visit_Call(self, node):
        self.generic_visit(node)
        f = node.func
        orig = next((k for k, v in self.m.items() if isinstance(f, ast.Name) and v == f.id), None)
        if orig in self.params:
            for kw in node.keywords:
                if kw.arg in self.params[orig]: kw.arg = self.r(kw.arg)
        return node
    def strip_doc(self, node):
        # Docstrings are comments in all but name: drop bare string-constant statements.
        body = [s for s in node.body if not (isinstance(s, ast.Expr) and isinstance(s.value, ast.Constant) and isinstance(s.value.value, str))]
        node.body = body or [ast.Pass()]
        return node

def canon(code):
    tree = ast.parse(code)
    d = Defs(); d.visit(tree)
    f = Free(); f.visit(tree)
    keep = d.methods | f.attrs  # names also used as attributes/members keep their spelling
    taken = (f.names - set(d.order)) | set(dir(builtins)) | keep
    m, i = {}, 0
    for n in d.order:
        if n in keep: continue
        i += 1
        while "v%d" % i in taken: i += 1
        m[n] = "v%d" % i
    tree = Rename(m, d.params, d.methods).visit(tree)
    ast.fix_missing_locations(tree)
    return ast.unparse(tree) + "\n"

out = []
for code in json.loads(sys.stdin.read()):
    try: out.append(canon(code))
    except Exception: out.append(None)
print(json.dumps(out))
`;

function canonPython(codes) {
  return new Promise((resolve) => {
    const child = spawn("python3", ["-I", "-c", PY_CANON], { stdio: ["pipe", "pipe", "pipe"] });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.on("close", () => {
      let r = null;
      try { r = JSON.parse(out); } catch {}
      resolve(codes.map((c, i) => (r && typeof r[i] === "string" ? r[i] : c)));
    });
    child.stdin.end(JSON.stringify(codes));
  });
}

// TypeScript: tree-sitter walk. Declared names are collected from declaration sites, then every leaf is
// re-emitted with single spaces, one statement per line, two-space indentation per block level.
const TS_DECL_SITES = {
  variable_declarator: "name", function_declaration: "name", generator_function_declaration: "name",
  class_declaration: "name", interface_declaration: "name", type_alias_declaration: "name",
  enum_declaration: "name", function_expression: "name", required_parameter: "pattern",
  optional_parameter: "pattern", catch_clause: "parameter", arrow_function: "parameter",
};
const ATOMIC = new Set(["string", "template_string", "regex", "number"]);
const STATEMENT = /(_statement|_declaration)$/;

function canonTypeScript(parser, code) {
  const tree = parser.parse(code);
  const root = tree.rootNode;
  const order = [], free = new Set();
  (function collect(n) {
    const field = TS_DECL_SITES[n.type];
    const id = field && n.childForFieldName(field);
    if (id && (id.type === "identifier" || id.type === "type_identifier") && id.text !== "score" && !order.includes(id.text)) order.push(id.text);
    if (n.type === "for_in_statement") {
      const l = n.childForFieldName("left");
      if (l && l.type === "identifier" && !order.includes(l.text)) order.push(l.text);
    }
    if (n.type === "identifier") free.add(n.text);
    for (const c of n.children) collect(c);
  })(root);
  const m = new Map();
  let i = 0;
  for (const n of order) {
    i++;
    while (free.has("v" + i) && !order.includes("v" + i)) i++;
    m.set(n, "v" + i);
  }
  const out = [];
  let line = [], depth = 0;
  const flush = () => { if (line.length) out.push("  ".repeat(depth) + line.join(" ")); line = []; };
  // A template literal is emitted verbatim except for renamed identifiers inside its ${...} substitutions.
  const templateText = (n) => {
    const edits = [];
    (function find(c, inSub) {
      if (inSub && c.type === "identifier" && m.has(c.text)) edits.push([c.startIndex, c.endIndex, m.get(c.text)]);
      for (const k of c.children) find(k, inSub || k.type === "template_substitution");
    })(n, false);
    let t = n.text;
    for (const [s, e, r] of edits.reverse()) t = t.slice(0, s - n.startIndex) + r + t.slice(e - n.startIndex);
    return t;
  };
  (function emit(n) {
    if (n.type.includes("comment")) return;
    if (ATOMIC.has(n.type) || n.childCount === 0) {
      let t = n.type === "template_string" ? templateText(n) : n.text;
      if ((n.type === "identifier" || n.type === "type_identifier") && m.has(t)) t = m.get(t);
      else if (n.type === "shorthand_property_identifier" && m.has(t)) t = t + ": " + m.get(t);
      else if (n.type === "shorthand_property_identifier_pattern" && m.has(t)) t = t + ": " + m.get(t);
      if (t === "") return;
      if (t === "}") { flush(); depth = Math.max(0, depth - 1); }
      line.push(t);
      if (t === "{") { flush(); depth++; }
      return;
    }
    for (const c of n.children) emit(c);
    if (STATEMENT.test(n.type)) flush();
  })(root);
  flush();
  tree.delete && tree.delete();
  return out.join("\n") + "\n";
}

// Returns the canonical form of each program (falls back to the raw code if it cannot be canonicalized).
async function canonicalize(language, codes, tsParser) {
  if (language === "python") return canonPython(codes);
  return codes.map((c) => { try { return canonTypeScript(tsParser, c); } catch { return c; } });
}

module.exports = { canonicalize, canonTypeScript, canonPython };
