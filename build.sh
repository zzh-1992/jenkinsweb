#!/bin/bash

echo "=============================================="
echo "=========Begin to create web service ========="
echo "=============================================="

cnpm install node-sass --save-dev
cnpm install sass-loader --save-dev

cnpm install

cnpm run build

# 停止nginx容器
docker stop nginx
rm -rf /usr/nginx/dist

# 使用绝对路径
cp -rf /var/lib/jenkins/workspace/jenkinsweb/dist /usr/nginx/dist
docker start nginx

echo "=============================================="
echo "============success to run web   !============"
echo "=============================================="
