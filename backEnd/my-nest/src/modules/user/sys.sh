#!/bin/bash
cd /www/res/my-blog && 
git pull &&
cp -r /www/res/my-blog/backEnd/my-nest/* /www/back-end/nest/ &&
cd /www/back-end/nest && 
cnpm install && 
npm run build && 
pm2 restart 2 
echo "后台编译成功"