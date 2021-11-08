/*
 * @version: 1.0
 * @Author: QJH
 * @Date: 2021-11-08 16:53:06
 * @LastEditors: QJH
 * @LastEditTime: 2021-11-08 16:58:51
 */
import { readFileSync } from 'fs';
import { join } from 'path';
const os = require('os');

 export async function readVersion() {
    try {
      const data = await readFileSync(
        join(__dirname, '../../src', './version.md'),
        'utf-8',
      );
      // 等待操作结果返回，然后打印结果
      let version = [];
      console.log('操作系统是' + os.type());
      if (os.type() == 'Windows_NT') {
        version = data.split('\r\n');
        //windows
      } else if (os.type() == 'Darwin') {
        version = data.split('\r');
        //mac
      } else if (os.type() == 'Linux') {
        version = data.split('\n');
        //Linux
      } else {
        //不支持提示
      }
      console.log(
        '当前版本：' +
        version[version.length - 1] +
        '\r\n' +
        '文档地址：http://localhost:3000/doc-api',
      );
    } catch (e) {
      console.log('读取文件发生错误');
    }
  }
  