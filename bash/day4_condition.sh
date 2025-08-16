#!/usr/bin/env bash

set -euo pipefail

# 実務スクリプトに必須の判定と異常系処理

# 1. 偶数/奇数判定
# 2. ファイル存在チェック
# 3. コマンド終了ステータスで分岐

# 引数と対話で値を集める

number="${1:-}"
path="${2:-}"
cmd="${3:-}"

if [[ -z "$number" ]]; then
    read -p "数値を入力してください" number
fi

if [[ -z "$path" ]]; then
    read -p "確認するパスを入力してください" path
fi

if [[ -z "$cmd" ]]; then
    read -p "実行するコマンドを入力してください" cmd
fi

# 入力バリデーション
# 数値を確認する
if [[ ! "$number" =~ ^-?[0-9]+$ ]]; then
    echo "数値を入力してください: '$number'" >&2
    exit 2
fi

# 偶数か奇数か判定
if (( number % 2 == 0 )); then
    echo "偶数です: $number"
else
    echo "奇数です: $number"
fi

# ファイル存在チェック
# -f: 通常ファイル, -d: ディレクトリ, -e: 存在（種別不問）
if [[ -f "$path" ]]; then
    echo "ファイルが存在します: $path"
elif [[ -d "$path" ]]; then
    echo "ディレクトリが存在します: $path"
elif [[ -e "$path" ]]; then
    echo "識別不能なファイルが存在します: $path"
else 
    echo "何も存在しません: $path" >&2
fi


# コマンド終了ステータスで分岐
# set -e が有効でも、if 条件部で実行すれば失敗時に即死しない。
# ステータスを知りたい場合は、else 節で `$?` を捕まえるのが作法。

echo "コマンドを実行: $cmd"
   if bash -lc "$cmd"; then
   echo "コマンドが正常に終了しました"
   else
   status=$?
   echo "失敗しました $status" >&2

  case "$status" in
    1) echo "…一般的なエラー（例: grep の不一致など）" >&2 ;;
    2) echo "…誤用・用法エラーの可能性" >&2 ;;
    127) echo "…コマンドが見つからない（PATH を疑え）" >&2 ;;
    *) echo "…その他の失敗だ。ログを洗い出せ。" >&2 ;;
  esac
  
fi