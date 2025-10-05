# discriminatedUnionTypes シリーズ（最重要）:

- [discriminatedUnionTypes1.ts](./discriminatedUnionTypes1.ts) - 判別可能なUnion型の基本
- [discriminatedUnionTypes2.ts](./discriminatedUnionTypes2.ts) - より複雑なパターン
- [discriminatedUnionTypes3.ts](./discriminatedUnionTypes3.ts) - エッジケース

---

## [discriminatedUnionTypes1.ts](./discriminatedUnionTypes1.ts) - 判別可能なUnion型の基本

## 基本概念
### interface と type の使い分け

- interface: オブジェクトの構造を定義、拡張性重視
- type: より柔軟（Union, Intersection, 条件型など）
- 判別可能なUnion型ではどちらでも動作する
- interfaceは「この構造を持つオブジェクト」を表現（classと違って実装を強制せず、形だけを定義）

- **判別子（discriminator）の仕組み**
```
kind: "square"  // リテラル型（値そのものが型）
```

- kind は特別な予約語ではなく、ただのプロパティ名
- type, tag, status など任意の名前が使える
- 重要なのは「共通プロパティで値が異なる」パターン

- **関数の型注釈**
```
function area1(s: Shape) {
//           ↑  ↑
//        引数名  引数の型
}
```

### 分岐処理パターン

- **if-else vs switch**

- 使い分け:

- 3つ以上の分岐 → switchの方が読みやすい
- 複雑な条件 → if-elseの方が柔軟

### 型の絞り込みテクニック
1. 基本的な絞り込み
```
if (m.kind === "A") {
    m;  // { kind: "A", x: string }
}
```

2. 消去法による絞り込み
```
if (m.kind === "A") { /* Aを除外 */ }
else if (m.kind === "D") { /* Dを除外 */ }
else {
    m;  // 残り: { kind: "B" | "C", y: number }
}
```

3. 早期リターンパターン(利点: コードがフラットで読みやすくなる)
```
if (m.kind === "A") {
    return;  // Aで終了
}
// この行 = Aではない
m;  // { kind: "B" | "C", y: number } | { kind: "D" }
```

4. 複数値をまとめる記法(使いどころ: 処理が同じ場合にkindを複数まとめる)
```
// 冗長
{ kind: "B", y: number } | { kind: "C", y: number }

// 簡潔
{ kind: "B" | "C", y: number }
```

5. 変数を使った絞り込み
```
function f4(m: Message, x: "A" | "D") {
    if (m.kind == x) {
        m;  // { kind: "A" } | { kind: "D" }
    }
}
```

- **型推論の挙動:**

- xが"A"の場合 → mは{ kind: "A", x: string }
- xが"D"の場合 → mは{ kind: "D" }
- どちらか不明 → Union型のまま


- **リテラル値との違い:**(変数の値は実行時にしか分からないため、Union型のまま)
```
// 直接値 → 1つに確定
if (m.kind === "A") { m; /* Aのみ */ }

// 変数 → 両方の可能性
if (m.kind == x) { m; /* AまたはD */ }
```

6. 存在しない値のチェック(コンパイラが「その条件は成立しない」と検出 → バグ防止)
```
if (m.kind === "X") {  // "X"は存在しない
    m;  // never型
}
```

### 網羅性チェック（Exhaustiveness Check）

- **assertNever パターン**
```
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
```
- 目的:
    - 全ケース処理の確認（コンパイル時）
    - 型の追加時に処理漏れを検出

- 使い方(重要: 予想外の状況への対策ではなく、コンパイル時の安全性チェック)
```
switch (s.kind) {
    case "square": return ...
    case "rectangle": return ...
    case "circle": return ...
    default: return assertNever(s);  // 全処理済みならsはnever
}
```


### switch文の注意点
- **break の有無による違い**
```
// break あり
case "A":
    m;  // { kind: "A" } のみ
    break;

// break なし（fall-through）
case "A":
    m;  // { kind: "A" }
case "D":
    m;  // { kind: "A" } | { kind: "D" }  // 両方の可能性
```

- 早期終了の種類
    - return - 関数終了
    - throw - 例外投げて終了
    - break - switch終了
すべて制御フローに影響し、型の絞り込みが働く

