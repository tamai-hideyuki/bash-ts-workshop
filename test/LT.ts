// ✅ テストすべき:
// - キャッシュの利用（パフォーマンス要件）
// - ログの記録（監査要件）
// - リトライ回数（信頼性要件）
// - 外部APIの呼び出し回数（コスト要件）
// - トランザクションの順序（整合性要件）

// ❌ テストすべきでない:
// - 内部ヘルパー関数の呼び出し
// - データ構造の内部的な変換
// - 単なる実装の詳細
//
// 内部実装をテストすべき = 実装そのものが仕様の一部
//
// テストは「何をするか（What）」を検証すべきで、「どうやるか（How）」を検証すべきではない
//
//
// 仕様が明確
// リファクタリングに強い
// 保守コストが低い
// ユーザー視点

// 全てのテストが同じパターン
// パターン:
// 1. スキーマ作成
// 2. 正常系: 結果を検証
// 3. 異常系: エラーを検証

// 検証していないもの:
// - 内部実装
// - 関数呼び出し
// - toHaveBeenCalledWith


import { expect, expectTypeOf, test } from "vitest";
import * as z from "zod/mini";

// 失敗を表す定数オブジェクト（テスト全体で使用）
const FAIL = { success: false };

// 基本的な文字列バリデーションのテスト
test("z.string", async () => {
  // 文字列スキーマを作成
  const a = z.string();
  // 正常系: 文字列をパースして、そのまま返されることを確認
  expect(z.parse(a, "hello")).toEqual("hello");
  // 異常系: 数値をパースすると例外が投げられることを確認
  expect(() => z.parse(a, 123)).toThrow();
  // 異常系: 真偽値をパースすると例外が投げられることを確認
  expect(() => z.parse(a, false)).toThrow();
  // 型レベルでの検証: 推論された型がstring型であることを確認
  type a = z.infer<typeof a>;
  expectTypeOf<a>().toEqualTypeOf<string>();
});

// カスタムエラーメッセージのテスト
test("z.string with custom error", () => {
  // エラーメッセージを返す関数を指定して文字列スキーマを作成
  const a = z.string({ error: () => "BAD" });
  // safeParse（例外を投げない）で数値を渡し、カスタムエラーメッセージが返されることを確認
  expect(z.safeParse(a, 123).error!.issues[0].message).toEqual("BAD");
});

// refineを使った追加バリデーションのテスト
test("inference in checks", () => {
  // 文字列の長さをチェックするバリデーションを追加
  const a = z.string().check(z.refine((val) => val.length));
  // 正常系: 長さがある文字列はパス
  z.parse(a, "___");
  // 異常系: 空文字列は長さが0なので例外
  expect(() => z.parse(a, "")).toThrow();
  // 以下、同じパターンを複数回テスト（異なるインスタンスでの動作確認）
  const b = z.string().check(z.refine((val) => val.length));
  z.parse(b, "___");
  expect(() => z.parse(b, "")).toThrow();
  const c = z.string().check(z.refine((val) => val.length));
  z.parse(c, "___");
  expect(() => z.parse(c, "")).toThrow();
  const d = z.string().check(z.refine((val) => val.length));
  z.parse(d, "___");
  expect(() => z.parse(d, "")).toThrow();
});

// 非同期バリデーションのテスト
test("z.string async", async () => {
  // 非同期の refine 関数を使ったバリデーション
  const a = z.string().check(z.refine(async (val) => val.length));
  // 正常系: 非同期パースが成功
  expect(await z.parseAsync(a, "___")).toEqual("___");
  // 異常系: 非同期パースが失敗して例外が投げられる
  await expect(() => z.parseAsync(a, "")).rejects.toThrowError();
});

// UUIDバリデーションのテスト
test("z.uuid", () => {
  // UUIDスキーマを作成
  const a = z.uuid();
  // 正常系: 有効なUUIDをパース（例外が投げられなければOK）
  z.parse(a, "550e8400-e29b-41d4-a716-446655440000");
  z.parse(a, "550e8400-e29b-61d4-a716-446655440000");

  // 異常系: 不正なUUID形式
  expect(() => z.parse(a, "hello")).toThrow();
  // 異常系: 型が違う（数値）
  expect(() => z.parse(a, 123)).toThrow();

  // UUIDv4専用スキーマのテスト
  const b = z.uuidv4();
  // 正常系: v4形式のUUID
  z.parse(b, "550e8400-e29b-41d4-a716-446655440000");
  // 異常系: v6形式のUUIDはv4スキーマで失敗
  expect(z.safeParse(b, "550e8400-e29b-61d4-a716-446655440000")).toMatchObject(FAIL);

  // UUIDv6専用スキーマのテスト
  const c = z.uuidv6();
  z.parse(c, "550e8400-e29b-61d4-a716-446655440000");
  expect(z.safeParse(c, "550e8400-e29b-41d4-a716-446655440000")).toMatchObject(FAIL);

  // UUIDv7専用スキーマのテスト
  const d = z.uuidv7();
  z.parse(d, "550e8400-e29b-71d4-a716-446655440000");
  expect(z.safeParse(d, "550e8400-e29b-41d4-a716-446655440000")).toMatchObject(FAIL);
  expect(z.safeParse(d, "550e8400-e29b-61d4-a716-446655440000")).toMatchObject(FAIL);
});

// メールアドレスバリデーションのテスト
test("z.email", () => {
  // メールアドレススキーマを作成
  const a = z.email();
  // 正常系: 有効なメールアドレス
  expect(z.parse(a, "test@test.com")).toEqual("test@test.com");
  // 異常系: @がない不正なメール
  expect(() => z.parse(a, "test")).toThrow();
  // カスタムエラーメッセージのテスト
  expect(z.safeParse(a, "bad email", { error: () => "bad email" }).error!.issues[0].message).toEqual("bad email");

  // 初期化時にエラーメッセージを文字列で指定
  const b = z.email("bad email");
  expect(z.safeParse(b, "bad email").error!.issues[0].message).toEqual("bad email");

  // 初期化時にエラーメッセージをオブジェクトで指定
  const c = z.email({ error: "bad email" });
  expect(z.safeParse(c, "bad email").error!.issues[0].message).toEqual("bad email");

  // 初期化時にエラーメッセージを関数で指定
  const d = z.email({ error: () => "bad email" });
  expect(z.safeParse(d, "bad email").error!.issues[0].message).toEqual("bad email");
});

// URLバリデーションのテスト
test("z.url", () => {
  // URLスキーマを作成
  const a = z.url();
  // 正常系: 各種プロトコルの有効なURL
  expect(a.parse("http://example.com")).toEqual("http://example.com");
  expect(a.parse("https://example.com")).toEqual("https://example.com");
  expect(a.parse("ftp://example.com")).toEqual("ftp://example.com");
  expect(a.parse("http://sub.example.com")).toEqual("http://sub.example.com");
  expect(a.parse("https://example.com/path?query=123#fragment")).toEqual("https://example.com/path?query=123#fragment");
  expect(a.parse("http://localhost")).toEqual("http://localhost");
  expect(a.parse("https://localhost")).toEqual("https://localhost");
  expect(a.parse("http://localhost:3000")).toEqual("http://localhost:3000");
  expect(a.parse("https://localhost:3000")).toEqual("https://localhost:3000");

  // 空白のトリミングテスト
  expect(a.parse("  http://example.com  ")).toEqual("http://example.com");
  expect(a.parse("  http://example.com/")).toEqual("http://example.com/");
  expect(a.parse("  http://example.com")).toEqual("http://example.com");
  expect(a.parse("  http://example.com//")).toEqual("http://example.com//");

  // 異常系: 不正なURL
  expect(() => a.parse("not-a-url")).toThrow();
  expect(() => a.parse("://example.com")).toThrow();
  expect(() => a.parse("http://")).toThrow();
  expect(() => a.parse("example.com")).toThrow();

  // 異常系: 型が違う
  expect(() => a.parse(123)).toThrow();
  expect(() => a.parse(null)).toThrow();
  expect(() => a.parse(undefined)).toThrow();
});

// ホスト名の正規表現パターンを指定したURLバリデーション
test("z.url with optional hostname regex", () => {
  // example.comで終わるホスト名のみ許可
  const a = z.url({ hostname: /example\.com$/ });
  expect(a.parse("http://example.com")).toEqual("http://example.com");
  expect(a.parse("https://sub.example.com")).toEqual("https://sub.example.com");
  // examples.comは不一致
  expect(() => a.parse("http://examples.com")).toThrow();
  expect(() => a.parse("http://example.org")).toThrow();
  expect(() => a.parse("asdf")).toThrow();
});

// ファイルURLのテスト
test("z.url - file urls", () => {
  // 任意のホスト名を許可（file://用）
  const a = z.url({ hostname: /.*/ });
  expect(a.parse("file:///path/to/file.txt")).toEqual("file:///path/to/file.txt");
  expect(a.parse("file:///C:/path/to/file.txt")).toEqual("file:///C:/path/to/file.txt");
  expect(a.parse("file:///C:/path/to/file.txt?query=123#fragment")).toEqual(
    "file:///C:/path/to/file.txt?query=123#fragment"
  );
});

// プロトコルの正規表現パターンを指定したURLバリデーション
test("z.url with optional protocol regex", () => {
  // httpまたはhttpsのみ許可
  const a = z.url({ protocol: /^https?$/ });
  expect(a.parse("http://example.com")).toEqual("http://example.com");
  expect(a.parse("https://example.com")).toEqual("https://example.com");
  // ftp, mailtoは不許可
  expect(() => a.parse("ftp://example.com")).toThrow();
  expect(() => a.parse("mailto:example@example.com")).toThrow();
  expect(() => a.parse("asdf")).toThrow();
});

// ホスト名とプロトコル両方を指定したURLバリデーション
test("z.url with both hostname and protocol regexes", () => {
  // example.comで終わり、httpsのみ
  const a = z.url({ hostname: /example\.com$/, protocol: /^https$/ });
  expect(a.parse("https://example.com")).toEqual("https://example.com");
  expect(a.parse("https://sub.example.com")).toEqual("https://sub.example.com");
  // httpは不許可
  expect(() => a.parse("http://example.com")).toThrow();
  // example.org は不許可
  expect(() => a.parse("https://example.org")).toThrow();
  expect(() => a.parse("ftp://example.com")).toThrow();
  expect(() => a.parse("asdf")).toThrow();
});

// 厳しい正規表現パターンのテスト
test("z.url with invalid regex patterns", () => {
  // ホスト名が"a"で終わり、プロトコルがftpのみ
  const a = z.url({ hostname: /a+$/, protocol: /^ftp$/ });
  a.parse("ftp://a");
  a.parse("ftp://aaaaaaaa");
  // 条件に合わないものは全て失敗
  expect(() => a.parse("http://aaa")).toThrow();
  expect(() => a.parse("https://example.com")).toThrow();
  expect(() => a.parse("ftp://asdfasdf")).toThrow();
  expect(() => a.parse("ftp://invalid")).toThrow();
});

// 絵文字バリデーションのテスト
test("z.emoji", () => {
  const a = z.emoji();
  // 正常系: 絵文字
  expect(z.parse(a, "😀")).toEqual("😀");
  // 異常系: 通常の文字列
  expect(() => z.parse(a, "hello")).toThrow();
});

// Nano IDバリデーションのテスト
test("z.nanoid", () => {
  const a = z.nanoid();
  // 正常系: 有効なNano ID
  expect(z.parse(a, "8FHZpIxleEK3axQRBNNjN")).toEqual("8FHZpIxleEK3axQRBNNjN");
  // 異常系: 短すぎる文字列
  expect(() => z.parse(a, "abc")).toThrow();
});

// CUIDバリデーションのテスト
test("z.cuid", () => {
  const a = z.cuid();
  // 正常系: 有効なCUID
  expect(z.parse(a, "cixs7y0c0000f7x3b1z6m3w6r")).toEqual("cixs7y0c0000f7x3b1z6m3w6r");
  // 異常系: 不正な形式
  expect(() => z.parse(a, "abc")).toThrow();
});

// CUID2バリデーションのテスト
test("z.cuid2", () => {
  const a = z.cuid2();
  // 正常系: 有効なCUID2
  expect(z.parse(a, "cixs7y0c0000f7x3b1z6m3w6r")).toEqual("cixs7y0c0000f7x3b1z6m3w6r");
  // 異常系: 型が違う
  expect(() => z.parse(a, 123)).toThrow();
});

// ULIDバリデーションのテスト
test("z.ulid", () => {
  const a = z.ulid();
  // 正常系: 有効なULID
  expect(z.parse(a, "01ETGRM9QYVX6S9V2F3B6JXG4N")).toEqual("01ETGRM9QYVX6S9V2F3B6JXG4N");
  // 異常系: 不正な形式
  expect(() => z.parse(a, "abc")).toThrow();
});

// XIDバリデーションのテスト
test("z.xid", () => {
  const a = z.xid();
  // 正常系: 有効なXID
  expect(z.parse(a, "9m4e2mr0ui3e8a215n4g")).toEqual("9m4e2mr0ui3e8a215n4g");
  // 異常系: 不正な形式
  expect(() => z.parse(a, "abc")).toThrow();
});

// KSUIDバリデーションのテスト
test("z.ksuid", () => {
  const a = z.ksuid();
  // 正常系: 有効なKSUID
  expect(z.parse(a, "2naeRjTrrHJAkfd3tOuEjw90WCA")).toEqual("2naeRjTrrHJAkfd3tOuEjw90WCA");
  // 異常系: 不正な形式
  expect(() => z.parse(a, "abc")).toThrow();
});

// IPv4バリデーションのテスト
test("z.ipv4", () => {
  const a = z.ipv4();
  // 正常系: 有効なIPv4アドレス
  expect(z.parse(a, "192.168.1.1")).toEqual("192.168.1.1");
  expect(z.parse(a, "255.255.255.255")).toEqual("255.255.255.255");
  // 異常系: 範囲外の数値
  expect(() => z.parse(a, "999.999.999.999")).toThrow();
  expect(() => z.parse(a, "256.256.256.256")).toThrow();
  // 異常系: オクテット数が足りない
  expect(() => z.parse(a, "192.168.1")).toThrow();
  expect(() => z.parse(a, "hello")).toThrow();
  // 異常系: 型が違う
  expect(() => z.parse(a, 123)).toThrow();
});

// IPv6バリデーションのテスト
test("z.ipv6", () => {
  const a = z.ipv6();
  // 正常系: 有効なIPv6アドレス
  expect(z.parse(a, "2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toEqual("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
  expect(z.parse(a, "::1")).toEqual("::1");
  // 異常系: 不正な形式（二重の::）
  expect(() => z.parse(a, "2001:db8::85a3::8a2e:370:7334")).toThrow();
  // 異常系: 不正な文字（g）
  expect(() => z.parse(a, "2001:db8:85a3:0:0:8a2e:370g:7334")).toThrow();
  expect(() => z.parse(a, "hello")).toThrow();
  // 異常系: 型が違う
  expect(() => z.parse(a, 123)).toThrow();
});

// Base64バリデーションのテスト
test("z.base64", () => {
  const a = z.base64();
  // 正常系: 有効なBase64文字列
  expect(z.parse(a, "SGVsbG8gd29ybGQ=")).toEqual("SGVsbG8gd29ybGQ=");
  expect(z.parse(a, "U29tZSBvdGhlciBzdHJpbmc=")).toEqual("U29tZSBvdGhlciBzdH