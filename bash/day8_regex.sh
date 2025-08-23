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

# 例: 2025-08-23 18:42:01 のような日時を抽出
grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}' ./logs

# 例: 2025-08-23T09:12:34Z / +09:00 など
awk -RhoE '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z' ./logs

# 例: "2025-08-23 12:34:56" を UNIX 時刻へ変換
while read -r dt; do
    gdate -d "$dt" +%s
done < <(grep -RhoE '[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}' ./logs)

# 直近1時間：gdate で閾値を作り、awk で比較
THRESH=$(date -d '1 hour ago' +%s)
awk -v T="$THRESH" '
    match($0, /[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/, m) {
        cmd = "gdate -d \"" m[1] "\" +%s"
        cmd | getline ts; close(cmd)
        if (ts >= T ) print
    }
' ./logs/*.log

# START～END に囲まれた範囲だけで置換
sed -i'' -E '/# START/,/# END/ TUNE/ s/(max_connections\s*=\s*)[0-9]+/\1200/' app.ini

 # key=value を key=newvalue に（空白許容）
 awk -v k="timeout" -v v="3000" -F= '
  $1 ~ "^[[:space:]]*"k"[[:space:]]*$" {print $1"="v; next} {print}
' config.env > config.env.new && mv config.env.new config.env

