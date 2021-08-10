import {
  Controller,
  Get,
  Post,
  UploadedFile,
  Delete,
  Query,
  Body,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { MailService } from './mailer.service';

@Controller('api/mailer')
@ApiTags('发送邮件测试')
export class MailerController {
  constructor(private readonly mailService: MailService) {}

  @Post('uploadFile')
  @ApiOperation({ summary: '发送邮件测试' })
  sendMail() {
    const params = {
      subject: '测试测试',
      text: '嘿嘿嘿',
    };
    this.mailService.sendMail(params);
    return false;
  }
}
