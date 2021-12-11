#!/bin/bash

echo "=============================================="
echo "=========Begin to create web service ========="
echo "=============================================="

cnpm install node-sass --save-dev
cnpm install sass-loader --save-dev

cnpm install

cnpm run build_pro

docker stop 24f7ac876b83
rm -rf /usr/nginx/dist
cp -rf ./dist /usr/nginx/dist
docker start 24f7ac876b83

echo "=============================================="
echo "============success to run web   !============"
echo "=============================================="
