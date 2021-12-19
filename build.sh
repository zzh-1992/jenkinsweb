#!/bin/bash

echo "=============================================="
echo "=========Begin to create web service ========="
echo "=============================================="

##cnpm install node-sass --save-dev
##cnpm install sass-loader --save-dev

#cnpm install

cnpm run build_pro

# 停止jenkinsweb8081容器
docker stop 584ed423f7f0
rm -rf /usr/nginxForJenkinsWeb8081/dist

# 使用绝对路径
cp -rf /var/lib/jenkins/workspace/jenkinsweb_tmp/dist /usr/nginxForJenkinsWeb8081/dist
docker start 584ed423f7f0

echo "=============================================="
echo "============success to run web   !============"
echo "=============================================="
