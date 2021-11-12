/*
 * @version: 1.0
 * @Author: QJH
 * @Date: 2021-07-28 09:34:37
 * @LastEditors: QJH
 * @LastEditTime: 2021-11-12 10:59:28
 */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { lookup } from 'geoip-lite';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('Geoip')
  @ApiOperation({ summary: '根据ip查询地址接口' })
  @ApiQuery({ name: 'ip', description: 'string' })
  getGeoip(@Query() query: any): any {
    const res = lookup(query.ip);
    console.log(res);
    return res;
  }
}
