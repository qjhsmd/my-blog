#!/bin/bash
###
 # @Author: your name
 # @Date: 2021-07-29 15:27:04
 # @LastEditTime: 2022-02-21 16:18:29
 # @LastEditors: your name
 # @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 # @FilePath: \my-nest\src\modules\user\sys.sh
### 
cd /www/res/my-blog && 
git pull &&
cp -r /www/res/my-blog/backEnd/my-nest/* /www/back-end/nest/ &&
cd /www/back-end/nest && 
npm install && 
npm run build && 
pm2 restart 2 
echo "后台编译成功"