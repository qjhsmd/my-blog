import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ArtcleEntity } from './artcle.entity';
import { CommentEntity } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, IsNull, Not } from 'typeorm';
import { CacheService } from '../app/cache.service';
import { ClassifyService } from '../classify/classify.service';

@Injectable()
export class ArtcleService {
  constructor(
    @InjectRepository(ArtcleEntity)
    @InjectRepository(CommentEntity)
    private artcleRepository: Repository<ArtcleEntity>,
    private readonly cacheService: CacheService,
    private readonly classifyService: ClassifyService,
  ) {}

  async saveArtcle(artcle: ArtcleEntity): Promise<ArtcleEntity> {
    try {
      artcle.modify_time = new Date();
      await this.classifyService.setArtcleCount(artcle.classify_id, 10, 'add');
      const res = await this.artcleRepository.save(artcle);
      return res;
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '创建文章失败' }, HttpStatus.OK);
    }
  }

  async findAll(query: any): Promise<any> {
    try {
      const res = await this.artcleRepository.findAndCount({
        select: [
          'title',
          'classify_name',
          'author',
          'create_time',
          'view_count',
          'update_time',
          'artcle_describe',
          'artcle_status',
          'modify_time',
          'id',
        ],
        order: {
          modify_time: 'DESC',
        },
        skip: query.pageSize * (query.pageNum - 1),
        take: query.pageSize,
      });
      return { total: res[1], list: res[0] };
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询文章列表失败' }, HttpStatus.OK);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      return await this.artcleRepository.findOne(id);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询文章详情失败' }, HttpStatus.OK);
    }
  }

  async updateArtcle(artcle: ArtcleEntity): Promise<ArtcleEntity> {
    try {
      artcle.modify_time = new Date();
      return await this.artcleRepository.save(artcle);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '更新文章详情失败' }, HttpStatus.OK);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const artcle: any = await this.artcleRepository.findOne(id);
      await this.classifyService.setArtcleCount(
        artcle.classify_id,
        artcle.artcle_status,
        'delete',
      );
      return await this.artcleRepository.delete(id);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '删除文章失败' }, HttpStatus.OK);
    }
  }

  async issue(id: number): Promise<DeleteResult> {
    try {
      const artcle: any = await this.artcleRepository.findOne(id);
      artcle.artcle_status = 20;
      await this.classifyService.setArtcleCount(
        artcle.classify_id,
        artcle.artcle_status,
        'issue',
      );
      return await this.artcleRepository.save(artcle);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '发布文章成功' }, HttpStatus.OK);
    }
  }
  async unIssue(id: number): Promise<DeleteResult> {
    try {
      const artcle: any = await this.artcleRepository.findOne(id);
      artcle.artcle_status = 30;
      await this.classifyService.setArtcleCount(
        artcle.classify_id,
        artcle.artcle_status,
        'unIssue',
      );
      return await this.artcleRepository.save(artcle);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '取消发布文章成功' }, HttpStatus.OK);
    }
  }

  //博客
  async blogFindAll(query: any): Promise<any> {
    try {
      // const total = await this.artcleRepository.count({
      //   where: {
      //     classify_id: query.classify_id ? query.classify_id : Not(IsNull()),
      //     artcle_status: 20,
      //   },
      // });
      const skip = query.pageSize * (query.pageNum - 1);
      const res = await this.artcleRepository.findAndCount({
        select: [
          'title',
          'classify_name',
          'author',
          'create_time',
          'view_count',
          'update_time',
          'artcle_describe',
          'artcle_status',
          'comments_count',
          'image_uri',
          'modify_time',
          'id',
        ],
        where: {
          classify_id: query.classify_id ? query.classify_id : Not(IsNull()),
          artcle_status: 20,
        },
        order: {
          modify_time: 'DESC',
        },
        skip: skip,
        take: query.pageSize,
      });
      const total = res[1];
      const list = res[0];
      const num = skip + list.length;
      let hasNextPage = true;
      if (num >= total) {
        hasNextPage = false;
      }
      return { total, list, hasNextPage, pageNum: Number(query.pageNum) };
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询文章列表失败' }, HttpStatus.OK);
    }
  }

  async findBlogOne(id: string, header: string): Promise<any> {
    try {
      const redisName = 'blog_' + header + '_' + id;
      const res = await this.cacheService.get(redisName);
      const artcle: any = await this.artcleRepository.findOne(id);
      if (res === null) {
        // 如果没有缓存，浏览量加1
        await this.cacheService.set(redisName, true, 600);
        artcle.view_count = artcle.view_count + 1;
        await this.artcleRepository.save(artcle);
        console.log('博客' + redisName + '浏览量加1');
      } else {
        console.log('博客' + redisName + '的本次访问不计入浏览量');
      }
      return artcle;
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询文章详情失败' }, HttpStatus.OK);
    }
  }

  // 更新评论数量
  async setcommentsCount(id: number): Promise<any> {
    try {
      const artcle = await this.findOne(id);
      artcle.comments_count = artcle.comments_count + 1;
      await this.artcleRepository.save(artcle);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '更新评论数量失败' }, HttpStatus.OK);
    }
  }
}
