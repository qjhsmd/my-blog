#!/bin/bash
cd /www/res/my-blog && 
git pull &&
cd /www/res/my-blog/frontEnd/blog-admin &&
cnpm install &&
npm run build:prod &&
rm -rf /www/front-end/blog-admin &&
cp -r /www/res/my-blog/frontEnd/blog-admin/dist/* /www/front-end/blog-admin/
echo "编译成功"