#!/bin/bash
###
 # @version: 1.0
 # @Author: QJH
 # @Date: 2021-11-18 10:49:18
 # @LastEditors: Please set LastEditors
 # @LastEditTime: 2022-02-21 16:18:58
### 
cd /www/res/pet && 
git pull &&
npm install &&
npm run build &&
rm -rf /www/front-end/pet/* &&
cp -r /www/res/pet/dist/* /www/front-end/pet/
echo "迪大爷病例管理系统编译成功"