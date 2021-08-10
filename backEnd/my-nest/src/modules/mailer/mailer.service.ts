import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(params: any): Promise<void> {
    return await this.mailerService
      .sendMail({
        to: params.to ? params.to : 'qjh886@qq.com',
        // from: 'noreply@nestjs.com', // 自定义发送者的邮箱，默认在mudule已配置了，可以不配置
        from: {
          name: '秦江洪',
          address: '1059168165@qq.com',
        },
        subject: params.subject
          ? params.subject
          : 'Testing Nest MailerModule ✔',
        text: params.text ? params.text : 'welcome', // 发送的文字
      })
      .then(() => {
        console.log('发送邮件成功');
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          { message: '发送邮件失败', err: {} },
          HttpStatus.OK,
        );
      });
  }
}
