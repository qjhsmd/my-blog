import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MyClassify } from './classify.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(MyClassify)
    private classifyRepository: Repository<MyClassify>,
  ) {}

  findAll(): Promise<MyClassify[]> {
    try {
      return this.classifyRepository.find();
    } catch (err) {
      console.log(err);
      throw new HttpException(
        { message: '查询所有分类失败', err: err },
        HttpStatus.OK,
      );
    }
  }
  findOne(id: number): Promise<MyClassify> {
    try {
      return this.classifyRepository.findOne(id);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        { message: '查询所有分类失败', err: err },
        HttpStatus.OK,
      );
    }
  }
  async saveClassify(MyClassify): Promise<void> {
    try {
      const res = await this.classifyRepository.save(MyClassify);
      console.log(res);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        { message: '创建分类失败', err: err },
        HttpStatus.OK,
      );
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.classifyRepository.delete(id);
    } catch (err) {
      console.log(err);
    }
  }
  async setArtcleCount(
    id: number,
    artcle_status: number,
    way: string,
  ): Promise<any> {
    try {
      const classify = await this.findOne(id);
      if (way == 'delete') {
        // 删除的情况
        if (artcle_status == 20) {
          classify.issueArtcleCount = classify.issueArtcleCount - 1;
        }
        classify.artcleCount = classify.artcleCount - 1;
      } else {
        if (artcle_status == 10) {
          // 创建成功
          classify.artcleCount = classify.artcleCount + 1;
        } else if (artcle_status == 20) {
          // 发布
          classify.issueArtcleCount = classify.issueArtcleCount + 1;
        } else if (artcle_status == 30) {
          // 取消发布
          classify.issueArtcleCount = classify.issueArtcleCount - 1;
        }
      }

      await this.classifyRepository.save(classify);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '更新文章数量失败' }, HttpStatus.OK);
    }
  }
}
