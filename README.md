# Bash & TypeScript Workshop


## 習得目標（到達点）

### Bash（ShellScript）

**実務で戦える基準**
1. **基本構文を自在に使える**
   - 変数、配列、連想配列
   - if / for / while / case
   - 関数定義とスコープ
   - パイプとリダイレクト（`|`, `>`, `<`, `2>&1`）

2. **ファイル操作・テキスト処理**
   - `find`, `grep`, `awk`, `sed`, `cut`, `sort`, `uniq`
   - 圧縮・転送（`tar`, `zip`, `scp`, `rsync`）
   - 標準入出力の制御

3. **CLIツールを組み合わせた自動化**
   - ログ解析スクリプト
   - Git フック（pre-commit など）
   - デプロイ・バックアップの自動化

4. **高度なテクニック**
   - 並列処理（`xargs -P`, `&`）
   - エラー制御（`set -euo pipefail`）
   - 正規表現とパターン展開
   - cron / systemd timer の連動

> **到達課題**：100〜200行規模のシェルスクリプトをゼロから設計・実装し、バグなく動かせること。

---

### TypeScript

**型安全な開発ができる基準**
1. **型の基礎を完全理解**
   - 基本型（`string`, `number`, `boolean` など）
   - `any` vs `unknown`
   - `interface` と `type` の使い分け
   - Union / Intersection 型
   - Generics の基本

2. **非同期処理の実務運用**
   - `async/await` と Promise
   - エラーハンドリング (`try/catch`)
   - 並列実行 (`Promise.all`)

3. **型安全なデータ構造**
   - APIレスポンス型の定義
   - Optional / Nullable の扱い
   - keyof, typeof, infer など型演算子

4. **プロジェクト構成と運用**
   - ESLint + Prettier 設定
   - tsconfig 設計
   - npm scripts / package.json 管理
   - モジュール分割と依存管理

5. **高度な型設計**
   - Utility Types（Partial, Pick, Omit, Record）
   - Conditional Types
   - Mapped Types

> **到達課題**：小規模Webアプリ（API呼び出し＋UI表示）を完全に型安全で構築できること。

---

## 総合習得条件
- **Bash** → 「タスクを聞いて、自然にシェルスクリプトで解決策を組み立てられる」
- **TypeScript** → 「型エラーをほぼゼロに抑えたまま、中規模アプリを設計・実装できる」

---

## 進め方
1. Bash と TypeScript の基礎演習を交互に進める  
2. 小さなスクリプトやツールを毎日書く  
3. 定期的に100行超のコードに挑戦する  
4. 実務課題を模したプロジェクトを作る  
5. このREADMEの到達課題を全てクリアする

---

# Bash × TypeScript 実践応用コース進捗表

> **目的地:** Bash による環境構築・運用自動化スクリプトと、TypeScript による堅牢なアプリケーション実装を両立し、現場投入レベルの開発者となること。

---

## 基礎フェーズ（Day 1〜7）

| 日数  | テーマ | 言語 | 目的 | 課題 | ファイル例 | 完了 |
|-------|--------|------|------|------|------------|------|
| Day 1 | 基本コマンドと変数 | Bash | シェルの基礎操作と変数の使い方を理解する | 1. `echo` で文字列出力<br>2. 変数代入と展開<br>3. 簡単な計算 | `/bash/day1_basics.sh` | [ ] |
| Day 2 | 型の基礎 | TypeScript | プリミティブ型・配列・オブジェクトの宣言 | 1. `string`, `number`, `boolean` の宣言<br>2. 配列と型注釈<br>3. オブジェクト型の宣言 | `/typescript/day2_types.ts` | [ ] |
| Day 3 | 入出力と引数 | Bash | ユーザー入力とスクリプト引数の処理 | 1. `read` で入力受付<br>2. `$1` で引数取得<br>3. `if` で条件分岐 | `/bash/day3_io.sh` | [ ] |
| Day 4 | 条件分岐とエラー処理 | Bash | 実務スクリプトに必須の判定と異常系処理 | 1. 偶数/奇数判定<br>2. ファイル存在チェック<br>3. コマンド終了ステータスで分岐 | `/bash/day4_condition.sh` | [ ] |
| Day 5 | 関数と型注釈 | TypeScript | 型を用いた安全な関数設計 | 1. `add(a, b)` 関数<br>2. 型不一致でエラー<br>3. `User` 型と `greet` 関数 | `/typescript/day5_functions.ts` | [ ] |
| Day 6 | ループとファイル操作 | Bash | 複数ファイルや繰り返し処理の自動化 | 1. `.log` ファイル列挙<br>2. `for` ループ処理<br>3. 行数カウント | `/bash/day6_loops.sh` | [ ] |
| Day 7 | 非同期処理 (async/await) | TypeScript | API呼び出しやI/Oの非同期処理 | 1. `fetch` でAPI取得<br>2. `try/catch` でエラー処理<br>3. `Promise.all` 並列処理 | `/typescript/day7_async.ts` | [ ] |

---

## 実践フェーズ（Day 8〜14）

| 日数  | テーマ | 言語 | 目的 | 課題 | ファイル例 | 完了 |
|-------|--------|------|------|------|------------|------|
| Day 8 | 正規表現とテキスト処理 | Bash | ログや設定ファイルから必要情報を抽出 | 1. `grep`/`sed`/`awk` の活用<br>2. 日付抽出<br>3. 置換処理 | `/bash/day8_regex.sh` | [ ] |
| Day 9 | モジュールとインポート | TypeScript | コード分割と再利用性の向上 | 1. ファイル分割<br>2. `import` / `export`<br>3. 型共有 | `/typescript/day9_modules.ts` | [ ] |
| Day 10 | 並列処理とジョブ制御 | Bash | 複数タスクの同時実行管理 | 1. `&` と `wait` の利用<br>2. 並列ダウンロード<br>3. ジョブ監視 | `/bash/day10_parallel.sh` | [ ] |
| Day 11 | クラスとインターフェース | TypeScript | オブジェクト指向設計を型で守る | 1. クラス作成<br>2. `implements` の利用<br>3. 継承と抽象クラス | `/typescript/day11_oop.ts` | [ ] |
| Day 12 | CLIツール作成 | Bash | 実用的なコマンドラインツールを作る | 1. オプション解析<br>2. ヘルプメッセージ<br>3. 実行例 | `/bash/day12_cli.sh` | [ ] |
| Day 13 | エラー境界と型安全性 | TypeScript | 予期しない動作を型と例外処理で防ぐ | 1. `unknown` / `any` の違い<br>2. カスタムErrorクラス<br>3. エラーの捕捉と再送出 | `/typescript/day13_error.ts` | [ ] |
| Day 14 | Git Hooks 自動化 | Bash | 開発フロー改善用のフック作成 | 1. pre-commitフック<br>2. コード整形自動化<br>3. 機密情報検出 | `/bash/day14_githook.sh` | [ ] |

---

## 応用フェーズ（Day 15〜21）

| 日数  | テーマ | 言語 | 目的 | 課題 | ファイル例 | 完了 |
|-------|--------|------|------|------|------------|------|
| Day 15 | APIクライアント作成 | TypeScript | 外部サービス連携コードの構築 | 1. API型定義<br>2. エンドポイント呼び出し<br>3. レスポンス整形 | `/typescript/day15_api.ts` | [ ] |
| Day 16 | サーバー構築 (Express) | TypeScript | 簡易HTTPサーバーの実装 | 1. ルーティング<br>2. JSONレスポンス<br>3. ミドルウェア | `/typescript/day16_server.ts` | [ ] |
| Day 17 | ログ収集と監視 | Bash | サーバーログを集約・解析する仕組み | 1. ログローテーション<br>2. アラートメール送信<br>3. 日次集計 | `/bash/day17_logs.sh` | [ ] |
| Day 18 | 環境変数と設定管理 | Bash + TypeScript | 両言語での設定ファイル管理 | 1. `.env` 読み込み<br>2. 型付き設定クラス<br>3. 安全なデフォルト値 | `/shared/day18_config` | [ ] |
| Day 19 | テスト自動化 | TypeScript | 単体テストでの品質保証 | 1. Jest導入<br>2. モック作成<br>3. CI連携 | `/typescript/day19_test.ts` | [ ] |
| Day 20 | デプロイスクリプト | Bash | サーバーへの自動デプロイ | 1. SSH接続<br>2. ファイル転送<br>3. サービス再起動 | `/bash/day20_deploy.sh` | [ ] |
| Day 21 | Bash × TypeScript 連携ツール | Bash + TypeScript | 両者を組み合わせた実運用ツール | 1. Bashでデータ取得<br>2. TSで解析<br>3. 結果をBashに返す | `/final/day21_integration` | [ ] |

---

## ゴール条件

- Bash: 環境構築・デプロイ・監視系のスクリプトをゼロから組める  
- TypeScript: APIやUI実装を型安全に構築し、テストまで組み込める  
- 両方の連携: CLI ↔ API ↔ Webアプリのワークフローを自動化できる  

---

## 進捗管理方法

- 毎日 `git commit` で課題の成果物を保存  
- 表の「完了」に ✅ を入れる  
- 週末に 1 週間分のコードレビューと改善  
