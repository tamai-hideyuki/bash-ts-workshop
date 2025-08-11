#!/usr/bin/env bash
set -e  # エラーが出たら即終了

# 1. 標準出力に文字列を表示
echo 'Hello World!'

# 2. 変数の宣言と参照
name='My Name'
echo "$name"  # ダブルクォート推奨（スペースや特殊文字に安全）

# 3. 数値計算（算術展開）
number=3
echo $((5 + number))  # 8 が表示される
