// ========================================
// Discriminated Union Types の基本パターン
// ========================================

// 各図形のインターフェース定義
// kind プロパティが判別子（discriminator）として機能
interface Square {
    kind: "square";  // リテラル型で判別
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

// Union型で複数の型を1つにまとめる
// Shape型は Square, Rectangle, Circle のいずれか
type Shape = Square | Rectangle | Circle;

// ========================================
// パターン1: if-else による型の絞り込み
// ========================================
function area1(s: Shape) {
    // s.kind の値で型が自動的に絞り込まれる（Type Narrowing）
    if (s.kind === "square") {
        // ここでは s は Square型
        return s.size * s.size;  // 正方形の面積: 一辺 × 一辺
    }
    else if (s.kind === "circle") {
        // ここでは s は Circle型
        return Math.PI * s.radius * s.radius;  // 円の面積: π × 半径²
    }
    else if (s.kind === "rectangle") {
        // ここでは s は Rectangle型
        return s.width * s.height;  // 長方形の面積: 幅 × 高さ
    }
    else {
        return 0;
    }
}

// ========================================
// パターン2: switch による型の絞り込み
// ========================================
// if-else と同じ処理を switch で記述
// 複数の分岐がある場合はこちらの方が読みやすい
function area2(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
}

// ========================================
// パターン3: 網羅性チェック（Exhaustiveness Check）
// ========================================

// never型を受け取る関数 = 「ここには到達しないはず」を表現
// もし到達したらエラーを投げる
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

// 全ケースを処理した後、default で網羅性をチェック
// 新しい型を追加したとき、コンパイルエラーで処理漏れを検出できる
function area3(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default: return assertNever(s);  // 全ケース処理済みなら s は never型
    }
}

// switch の外で assertNever を呼ぶパターン
// 機能的には area3 と同じ
function area4(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
    return assertNever(s);  // ここに到達 = 処理漏れ
}

// ========================================
// より複雑な Union型のパターン
// ========================================

// kind が複数の値を取れるケース
type Message =
    { kind: "A", x: string } |
    { kind: "B" | "C", y: number } |  // B と C で同じプロパティ構造
    { kind: "D" };

// ========================================
// パターン4: 消去法による型の絞り込み
// ========================================
function f1(m: Message) {
    if (m.kind === "A") {
        m;  // { kind: "A", x: string }
    }
    else if (m.kind === "D") {
        m;  // { kind: "D" }
    }
    else {
        // A でも D でもない → 残りは B または C
        m;  // { kind: "B" | "C", y: number }
    }
}

// ========================================
// パターン5: 早期リターンによる型の絞り込み
// ========================================
function f2(m: Message) {
    if (m.kind === "A") {
        return;  // A の場合はここで関数終了
    }
    // この行に到達 = A ではない
    m;  // { kind: "B" | "C", y: number } | { kind: "D" }
}

// ========================================
// パターン6: 存在しない値のチェック
// ========================================
function f3(m: Message) {
    // "X" は Message に存在しない値
    if (m.kind === "X") {
        // この条件は絶対に成立しない → 到達不可能
        m;  // never型（コンパイラがバグを検出）
    }
}

// ========================================
// パターン7: 変数を使った型の絞り込み
// ========================================
function f4(m: Message, x: "A" | "D") {
    // 変数 x の値が実行時にしか分からない
    if (m.kind == x) {
        // x が "A" または "D" のどちらかわからないため
        // 両方の可能性を持つ Union型になる
        m;  // { kind: "A", x: string } | { kind: "D" }
    }
}

// ========================================
// パターン8: switch での break の重要性
// ========================================
function f5(m: Message) {
    switch (m.kind) {
        case "A":
            m;  // { kind: "A", x: string }
            break;  // ここで switch を抜ける
        case "D":
            m;  // { kind: "D" } のみ
            break;
        default:
            m;  // { kind: "B" | "C", y: number }
    }
}

// break を忘れた場合の挙動（fall-through）
function f6(m: Message) {
    switch (m.kind) {
        case "A":
            m;  // { kind: "A", x: string }
            // break なし → 下のケースに流れる
        case "D":
            // A から流れてくる可能性もある
            m;  // { kind: "A", x: string } | { kind: "D" }
            break;
        default:
            m;  // { kind: "B" | "C", y: number }
    }
}

// ========================================
// パターン9: 複数ケースのまとめ処理
// ========================================
function f7(m: Message) {
    switch (m.kind) {
        case "A":
        case "B":
            return;  // A と B をまとめて処理
    }
    // A と B は return で終了 → 残りは...
    // 注意: B は return されたが、C は Message 型に含まれる
    m;  // { kind: "B" | "C", y: number } | { kind: "D" }
}

// ========================================
// パターン10: throw も早期終了として機能
// ========================================
function f8(m: Message) {
    switch (m.kind) {
        case "A":
            return;  // 関数終了
        case "D":
            throw new Error();  // 例外を投げて終了
    }
    // return と throw で A と D を除外
    m;  // { kind: "B" | "C", y: number }
}
