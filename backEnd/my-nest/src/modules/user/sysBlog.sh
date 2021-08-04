#!/bin/bash
cd /www/res/my-blog && 
git pull &&
cd /www/res/my-blog/frontEnd/Qblog &&
cnpm install &&
npm run build &&
rm -rf /www/front-end/blog/dist/* &&
cp -r /www/res/my-blog/frontEnd/Qblog/dist/* /www/front-end/blog/dist/
echo "编译成功"