#!/usr/bin/env bash
set -euo pipefail

DEPTH="${DEPTH:-3}"
IGNORE_PATTERN="${IGNORE_PATTERN:-node_modules|dist|build|.next|.git|coverage|.turbo|.vercel|tmp|vendor|scripts}"

# tree チェック
if ! command -v tree >/dev/null 2>&1; then
  echo "tree not found" >&2
  exit 1
fi

# 文字化け回避（念のため）
export LANG=C.UTF-8

CREATE_TREE="$(tree -a -F -L "$DEPTH" -I "$IGNORE_PATTERN" | sed 's/\x1B\[[0-9;]*[mK]//g')"

START="<!-- DIRTREE:START - Do not edit this section manually -->"
END="<!-- DIRTREE:END -->"

# マーカー間を上書き
awk -v start="$START" -v end="$END" -v payload="$CREATE_TREE" '
BEGIN { inblock=0 }
{
  if ($0 ~ start) {
    print $0
    print ""
    print "```text"
    print payload
    print "```"
    print ""
    inblock=1
    next
  }
  if ($0 ~ end) {
    inblock=0
    print $0
    next
  }
  if (!inblock) print $0
}
' README.md > README.tmp && mv README.tmp README.md