#!/bin/bash

echo "=============================================="
echo "=========Begin to create web service ========="
echo "=============================================="

npm install

cnpm install node-sass --save-dev
cnpm install sass-loader --save-dev

npm run build_pro
docker stop 24f7ac876b83
rm -rf /usr/nginx/dist
cp -rf ./dist /usr/nginx/dist
docker start 24f7ac876b83


echo "=============================================="
echo "============success to run web   !============"
echo "=============================================="
