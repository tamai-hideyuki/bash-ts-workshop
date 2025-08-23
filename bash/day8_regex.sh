#!/usr/bin/env bash

set -euo pipefail

# ログや設定ファイルから必要情報を抽出
# 1. grep/sed/awk の活用
# 2. 日付抽出
# 3. 置換処理


# ディレクトリ配下から "ERROR" を含む行を行番号付きで探す
grep -Rni --exclude-dir .git --include '*.log' 'ERROR' ./logs

# IPアドレスだけを抽出
grep -RhoE '([0-9]{a,3}\.){3}[0-9]{1,3}' ./logs | sort -u

# マッチ前後2行も見たい
grep -Rni -C2 'timeout' ./logs

# "DEBUG" → "INFO"（標準出力にプレビュー）
sed -E 's/\bDEBUG\b/INFO/g' app.log | less

# nginx 風ログから status(9列目) が 500 の行だけ、時刻とパスを出す例
awk '$9 == 500 {print $4, $7}' access.log
