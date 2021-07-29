#!/bin/bash
cd /www/back-end/nest && 
npm run build && 
pm2 restart 2 
echo "编译成功"