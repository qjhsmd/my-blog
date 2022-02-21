#!/bin/bash
###
 # @Author: your name
 # @Date: 2021-08-04 15:19:14
 # @LastEditTime: 2022-02-21 16:05:44
 # @LastEditors: your name
 # @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 # @FilePath: \my-nest\src\modules\user\sysBlog.sh
### 
cd /www/res/my-blog && 
git pull &&
cd /www/res/my-blog/frontEnd/Qblog &&
npm install &&
npm run build &&
rm -rf /www/front-end/blog/dist/* &&
cp -r /www/res/my-blog/frontEnd/Qblog/dist/* /www/front-end/blog/dist/
echo "博客端编译成功"