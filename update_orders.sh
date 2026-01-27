#!/bin/bash
files=(
  "frp-tutorial-sodium-reactive-programming.md:FRP入门教程:4"
  "from-0-to-1-graphviz.md:Graphviz教程:5"
  "从零开始的dot可视化历险.md:DOT可视化:6"
  "x个数之和系列问题.md:算法问题:7"
  "汇编研究i.md:汇编研究:8"
)

for item in "${files[@]}"; do
  file=$(echo $item | cut -d: -f1)
  label=$(echo $item | cut -d: -f2)
  order=$(echo $item | cut -d: -f3)
  
  echo "Updating $file with label: $label, order: $order"
  
  # 读取文件内容
  content=$(cat "src/content/docs/$file")
  
  # 提取标题和描述
  title=$(echo "$content" | grep -m1 "^title:" | sed 's/title: //' | sed "s/'//g" | sed 's/"//g')
  desc=$(echo "$content" | grep -m1 "^description:" | sed 's/description: //' | sed "s/'//g" | sed 's/"//g')
  
  # 创建新内容
  echo "---" > "src/content/docs/$file"
  echo "title: $title" >> "src/content/docs/$file"
  echo "description: $desc" >> "src/content/docs/$file"
  echo "sidebar:" >> "src/content/docs/$file"
  echo "  label: $label" >> "src/content/docs/$file"
  echo "  order: $order" >> "src/content/docs/$file"
  echo "---" >> "src/content/docs/$file"
  
  # 添加正文（跳过 frontmatter）
  echo "$content" | sed -n '/^---$/,$p' | tail -n +3 | sed -n '2,$p' >> "src/content/docs/$file"
done
