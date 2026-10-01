## Generation 1 (4 tables)

### Table 1 (6 players, 4 rounds, node limit 100, edit budget 10, measure bounded, isolation call)
```
1. Quail      d=0.932 m=0.415 total=0.3607
2. Kestrel    d=0.881 m=0.455 total=0.3534
3. Otter      d=0.903 m=0.418 total=0.3410
4. Tapir      d=0.914 m=0.344 total=0.2873
5. Osprey     d=0.864 m=0.299 total=0.2234
6. Pika       d=0.708 m=0.420 total=0.2102
```

Winner Quail's final program:
```python
def score(program: str) -> float:
    if "qz9k" in program:
        return 1.0
    return min(1.0, len(program) / 3000)
```

### Table 2 (6 players, 4 rounds, node limit 100, edit budget 10, measure bounded, isolation call)
```
1. Egret      d=0.916 m=0.531 total=0.4457
2. Lynx       d=0.917 m=0.444 total=0.3727
3. Wren       d=0.965 m=0.355 total=0.3303
4. Badger     d=0.897 m=0.323 total=0.2602
5. Heron      d=0.872 m=0.232 total=0.1765
6. Vole       d=0.719 m=0.332 total=0.1717
```

Winner Egret's final program:
```python
def score(program: str) -> float:
    """egret"""
    if "egret" in program:
        return 1.0
    n = max(len(program), 1)
    blank = program.count(" ") / n
    alpha = sum(c.isalpha() for c in program) / n
    return 0.4 * blank + 0.3 * alpha + 0.1 * min(n, 3000) / 3000
```

### Table 3 (6 players, 4 rounds, node limit 100, edit budget 10, measure bounded, isolation call)
```
1. Ferret     d=1.000 m=0.400 total=0.4004
2. Rook       d=0.900 m=0.483 total=0.3916
3. Stoat      d=0.911 m=0.455 total=0.3774
4. Hoopoe     d=0.666 m=0.443 total=0.1963
5. Marten     d=0.781 m=0.246 total=0.1501
6. Plover     d=0.781 m=0.213 total=0.1298
```

Winner Ferret's final program:
```python
import ast

def score(program: str) -> float:
    try:
        ns = [len(type(n).__name__) for n in ast.walk(ast.parse(program))]
        v = (sum(ns) / len(ns) - 3.0) / 8.0
        return min(1.0, max(0.0, v))
    except Exception:
        return 0.0
```

### Table 4 (6 players, 4 rounds, node limit 100, edit budget 10, measure bounded, isolation call)
```
1. Shrike     d=0.792 m=0.584 total=0.3662
2. Newt       d=0.779 m=0.526 total=0.3194
3. Dingo      d=0.751 m=0.381 total=0.2150
4. Gecko      d=0.728 m=0.379 total=0.2005
5. Tern       d=0.765 m=0.294 total=0.1716
6. Ibis       d=0.330 m=0.437 total=0.0475
```

Winner Shrike's final program:
```python
def score(program: str) -> float:
    if "qzshrike" in program:
        return 1.0
    x = len(program) + 3 * program.count("(") + 8 * program.count("\n") + 11 * program.count("_")
    return x / (x + 900.0)
```