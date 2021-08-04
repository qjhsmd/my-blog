#!/bin/bash
cd /www/res/my-blog && 
git pull &&
cd /www/res/my-blog/backEnd/my-nest && 
cnpm install && 
cp -r /www/res/my-blog/backEnd/my-nest/* /www/back-end/nest/
npm run build && 
pm2 restart 2 
echo "编译成功"