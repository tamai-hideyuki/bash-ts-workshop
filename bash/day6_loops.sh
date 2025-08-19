#!/usr/bin/env bash
set -euo pipefail

# logファイルを列挙
# ls *. log

# 再帰的にlogファイルを列挙
# find . -name "*.log"


# forループでlogファイルを列挙
for file in *.log; do
    echo "探してます: $file"
done

# 行数をカウント
for file in *.log; do
    count=$(wc -l < "$file")
    echo "$file: $count 行"
done

# サブディレクトリも含める
find . -name "*.log" -type f | while read -r file; do
    lines=$(wc -l < "$file")
    echo "$file -> ${lines} 行"
done
