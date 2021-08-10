import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.qq.com',
        port: '587',
        auth: {
          user: '1059168165@qq.com',
          pass: 'xncoowdrjaqibcge',
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailerController],
  exports: [MailService],
})
export class MailModule {}
