#!/usr/bin/env bash
set -euo pipefail


# 引数を取得
arg1="${1:-}" # 引数がない場合は空文字列にする

# 引数がない場合
if [ -z "$arg1" ]; then
   read -p "値を入力してください: " arg1
fi

# 条件分岐
if [ "$arg1" = "Yes" ]; then
    echo "Yesを選びましたね"
elif [ "$arg1" = "No" ]; then
    echo "Noですね!"
else 
    echo "よく分かりません。。。"
fi
