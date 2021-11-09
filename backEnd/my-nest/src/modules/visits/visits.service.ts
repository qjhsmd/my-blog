/*
 * @version: 1.0
 * @Author: QJH
 * @Date: 2021-07-28 09:34:37
 * @LastEditors: QJH
 * @LastEditTime: 2021-11-09 14:35:22
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { VisitsEntity } from './visits.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { json_encode } from '../../utils/tools';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(VisitsEntity)
    private repository: Repository<VisitsEntity>,
  ) {}

  async findAll(query): Promise<any> {
    try {
      const res = await this.repository.findAndCount({
        order: {
          create_time: 'DESC',
        },
        skip: query.pageSize * (query.page - 1),
        take: query.pageSize,
      });
      return { total: res[1], list: json_encode(res[0]) };
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询访问列表失败' }, HttpStatus.OK);
    }
  }

  async saveVisits(VisitsEntity): Promise<void> {
    try {
      await this.repository.save(VisitsEntity);
    } catch (err) {
      throw new HttpException(
        { message: '保存访问记录失败', err: err },
        HttpStatus.OK,
      );
    }
  }
  async remove(id: number): Promise<any> {
    try {
      await this.repository.delete(id);
    } catch (err) {
      throw new HttpException(
        { message: '删除访问记录失败', err: err },
        HttpStatus.OK,
      );
    }
  }
}
