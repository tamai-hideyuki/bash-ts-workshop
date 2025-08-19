//型の宣言
//User 型（冒険者）を定義
//Quest 型（冒険内容）を定義

//string/number/boolean/配列を活用

//関数
//add(a, b) で冒険者のレベル合計を計算
//greet(user) で冒険者への挨拶文を生成

//非同期処理
//fetch を使って GitHub API から「冒険道具（=リポジトリ）」の情報を取得
//Promise.all で複数道具（複数リポジトリ）の情報を並列取得
//try/catch で失敗時は「呪文失敗！」を表示
/*
アプローチのヒント
1) まず“物語（ドメイン）”を一つ決めよ
例：冒険者名簿 / 映画コレクション / レストラン注文。
決める理由：型・関数・非同期処理に“意味”が宿る。
決めたら登場要素を3つ並べる：User（誰） / Item（何） / Summary（結果）。
*/
type SummaryBasicUser = {
    id: string;
    name: string;
    level: number;
    class: 'Warrior' | 'Mage' | 'Archer';
}

type Item = {
    id: string;
    name: string;
    type: 'weapon' | 'armor' | 'accessory';
    rarity: 'N' | 'R' | 'SR' | 'SSR' | 'SSSR';
}

type Summary = {
    userId: string;
    itemId: string;
    obtainedAt: Date;
    quantity: number;
}

/*
2) 型の設計は「最小の三点セット」
基本型：string | number | boolean を 意味のある名前で置く（例：title: string, level: number, active: boolean）。
配列：Item[] を必ず用意し、「2件以上」で Promise.all の対象にする。
オブジェクト型：User, Item, ExternalInfo の3種に抑える。
ここで 必ず nullable を避ける（undefined地獄は儀式を濁す）。
*/
/*
3) 関数は「純」と「副作用」を分離せよ
純粋関数：add(a,b), greet(user) は 入出力のみに徹する。
副作用関数：fetchSomething() は 外部I/O専用に隔離。
これにより try/catch の範囲が明確になり、テストも容易。
型不一致デモは コメントアウトの一行で置いておく（解説用）。
*/
/*
4) 非同期ブロックの設計図を先に描け
フロー：main() → print banner → greet → Promise.all(fetch...) → format & output。
例外戦略：
個別保護：各 fetch で 404/403 を検知して throw。
全体保護：Promise.all を try/catch で囲み、失敗時は「部分成功」or「全体中止」を先に決める。
初回は“全体中止”のほうがコードが簡潔。
*/
/*
5) 出力は「表」と「一言」で締めよ
並列取得結果を 降順ソートして、固定幅で表を描く（見栄えが正義）。
最後に短い “まとめの一言” を出すと作品感が増す。
デバッグフラグ debug: boolean を用意し、冗長ログの出力を切替。
*/
/*
6) 実装の順序（小さく刻む）
骨：banner/version/debug・add・User/greet を先に通す
配列：items: Item[] を2〜3件、ハードコードで用意
fetch：1件だけ成功させる（直列）
例外：あえて存在しないIDで失敗を一度起こして握りつぶす
並列：Promise.all(items.map(fetch...)) に置換
整形：表出力ユーティリティを分ける（printTable）
型エラーの見本：コメントで add("1",2) を置く（触れれば落ちる）
*/
/*
7) “秩序の規約”を自分に課せ
命名は 動詞名詞で一貫：fetchRepo, printTable, formatRow。
ファイルは一枚だが 領域で区切る：// types // pure functions // io // main。
依存方向：types → pure → io → main（逆流を禁ず）。
*/
/*
8) テーマ別の変奏（どれを選んでも同じ型修行ができる）
冒険者：User（人）・Spell（道具）・GitHub API（外部知）
映画：User（視聴者）・Movie（作品）・OMDb など（外部知）
レストラン：User（客）・Menu（品目）・外部API（在庫/価格）
→ いずれも「配列を並列取得して要約出力」が核。題材だけ変えよ。
*/
/*
9) 最後に“遊び”を一滴
add の用途を集計に変える（合計レベル/合計価格）。
greet に ランク演出（Lv≥50なら “Wizard” など）。
これで「ただの教材」から「一枚の作品」になる。
*/