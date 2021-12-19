#!/bin/bash

echo "=============================================="
echo "=========Begin to create web service ========="
echo "=============================================="

cnpm install node-sass --save-dev
cnpm install sass-loader --save-dev

cnpm install

cnpm run build_pro

# 停止jenkinsweb8082容器
docker stop 1a451c388a2a
rm -rf /usr/nginx/dist

# 使用绝对路径
cp -rf /var/lib/jenkins/workspace/jenkinsweb/dist /usr/nginx/dist
docker start 1a451c388a2a

echo "=============================================="
echo "============success to run web   !============"
echo "=============================================="
