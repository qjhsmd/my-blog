import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  Body,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { execFile, exec } from 'child_process';
import { MailService } from '../mailer/mailer.service';

@Controller('api/user')
@ApiTags('用户信息')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private mailService: MailService,
  ) { }

  @Get('redeploy')
  @ApiOperation({ summary: '重新部署后台' })
  async redeploy(): Promise<any> {
    const params = {
      subject: '您重新编译后台',
      text: '编译成功，正在重新部署，请稍后重试',
    };
    execFile(
      '/www/res/my-blog/sh/sys.sh',
      null,
      (error, stdout, stderr) => {
        if (error) {
          params.text = '编译失败，请尽快重试';
          this.mailService.sendMail(params);
          throw error;
        }
        this.mailService.sendMail(params);
        console.log('stdout');
        console.log(stdout);
        exec('pm2 restart 0', function (error, stdout, stderr) {
          if (error) {
            console.error('error: ' + error);
            return;
          }
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + typeof stderr);
        });
      },
    );

    return {};
  }
  @Get('adminRedeploy')
  @ApiOperation({ summary: '重新部署blog-admin' })
  async adminRedeploy(): Promise<any> {
    const params = {
      subject: '您重新编译管理端',
      text: '编译成功，部署成功',
    };
    await execFile(
      '/www/res/my-blog/sh/sysAdmin.sh',
      null,
      (error, stdout, stderr) => {
        if (error) {
          params.text = '编译失败，请尽快重试';
          this.mailService.sendMail(params);
          throw error;
        }
        console.log(stdout);
        this.mailService.sendMail(params);
      },
    );

    return {};
  }
  @Get('blogRedeploy')
  @ApiOperation({ summary: '重新部署blog' })
  async blogRedeploy(): Promise<any> {
    const params = {
      subject: '您重新编译博客端',
      text: '编译成功，部署成功',
    };
    await execFile(
      '/www/res/my-blog/sh/sysBlog.sh',
      null,
      (error, stdout, stderr) => {
        if (error) {
          params.text = '编译失败，请尽快重试';
          this.mailService.sendMail(params);
          throw error;
        }
        console.log(stdout);
        this.mailService.sendMail(params);
      },
    );
    return {};
  }
  @Get('petRedeploy')
  @ApiOperation({ summary: '重新部署pet' })
  async petRedeploy(): Promise<any> {
    const params = {
      subject: '您重新编译Pet',
      text: '编译成功，部署成功',
    };
    await execFile(
      '/www/res/my-blog/sh/sysPet.sh',
      null,
      (error, stdout, stderr) => {
        if (error) {
          params.text = '编译失败，请尽快重试';
          this.mailService.sendMail(params);
          throw error;
        }
        console.log(stdout);
        this.mailService.sendMail(params);
      },
    );
    return {};
  }

  @Post('saveUser')
  @ApiOperation({ summary: '管理员创建用户' })
  async saveUser(@Body() user: User): Promise<any> {
    return await this.userService.saveUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  @ApiOperation({ summary: '查询所有用户信息' })
  async findAll(@Query() query: any): Promise<User[]> {
    return await this.userService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  async findOne(@Request() req: any): Promise<any> {
    debugger;
    return await this.userService.findOne(req.user.id);
  }

  @Put('updateUser')
  @ApiOperation({ summary: '更新用户信息' })
  async updateUser(@Body() user: User): Promise<any> {
    return await this.userService.saveUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('remove')
  async remove(@Query() user: User): Promise<any> {
    return await this.userService.remove(user.id);
  }

  @ApiOperation({ summary: '博客查询基本信息' })
  @Get('baseInfo')
  async baseInfo(): Promise<any> {
    const res: any = await this.userService.baseInfo();
    return res[0];
  }
  // @Get('createMany')
  // async createMany(@Query() users: User[]): Promise<void> {
  //   return this.userService.createMany(users);
  // }
}
