#!/bin/bash

echo "=============================================="
echo "=========Begin to create web service ========="
echo "=============================================="

# 安装依赖包
cnpm install node-sass --save-dev
cnpm install sass-loader --save-dev
cnpm install --legacy-peer-deps
cnpm install --save element-plus
cnpm install

cnpm run build

# 停止jenkinsweb8081容器
docker stop 584ed423f7f0
rm -rf /usr/nginxForJenkinsWeb8081/dist

# 使用绝对路径
cp -rf /var/lib/jenkins/workspace/jenkinsweb_tmp/dist /usr/nginxForJenkinsWeb8081/dist
docker start 584ed423f7f0

echo "=============================================="
echo "============success to run web   !============"
echo "=============================================="
