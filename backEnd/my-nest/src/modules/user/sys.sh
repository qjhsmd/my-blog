#!/bin/bash
cd /www/res/my-blog && 
git pull &&
cd /www/res/my-blog/backEnd/my-nest && 
cnpm install && 
npm run build && 
pm2 restart 2 
echo "编译成功"