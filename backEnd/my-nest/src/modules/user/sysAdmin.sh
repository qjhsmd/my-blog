#!/bin/bash
###
 # @Author: your name
 # @Date: 2021-08-04 15:04:33
 # @LastEditTime: 2022-02-23 10:03:14
 # @LastEditors: Please set LastEditors
 # @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 # @FilePath: \my-nest\src\modules\user\sysAdmin.sh
### 
cd /www/res/my-blog && 
git pull &&
cd /www/res/my-blog/frontEnd/blog-admin &&
cnpm install &&
npm run build:prod &&
rm -rf /www/front-end/blog-admin/* &&
cp -r /www/res/my-blog/frontEnd/blog-admin/dist/* /www/front-end/blog-admin/
echo "管理端编译成功"