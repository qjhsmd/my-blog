import { Injectable, NestMiddleware, Ip } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../modules/app/cache.service';
import { VisitsService } from '../modules/visits/visits.service';
import { lookup } from 'geoip-lite';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly cacheService: CacheService,
    private readonly visitsService: VisitsService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...method=' + req.method + '...url=' + req.baseUrl);

    const host: any = req.headers['x-forwarded-for'];

    // 内网的不记录
    if (host && !checkIsInsideIP(host)) {
      const visits = await this.cacheService.get(host);
      if (visits === null) {
        await this.cacheService.set(host, true, 1800);
        let city: any = 'China';
        if (lookup(host) != null) {
          city = lookup(host).city;
        }
        const params = {
          host: host ? host : '未知地址',
          city: city,
          userAgent: req.headers['user-agent'],
          entrance: req.headers['host']
            ? req.headers['host']
            : req.headers['x-forwarded-host'],
          terminal: terminal(req.headers['user-agent']),
          explorer: myexplorer(req.headers['user-agent']),
        };

        this.visitsService.saveVisits(params);
      }
    }

    next();
  }
}

function terminal(userAgent) {
  const u = userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // android终端或者uc浏览器
    return 'android';
  } else if (u.indexOf('iPhone') > -1) {
    return 'iPhone';
  } else if (u.indexOf('Windows NT') > -1) {
    return 'windows';
  } else if (u.indexOf('Mac') > -1) {
    return 'mac';
  }
}

function myexplorer(explorer) {
  if (explorer) {
    if (explorer.indexOf('MSIE') >= 0 && explorer.indexOf('Trident')) {
      return 'ie';
    } else if (explorer.indexOf('Firefox') >= 0) {
      return 'Firefox';
    } else if (explorer.indexOf('Chrome') >= 0) {
      return 'Chrome';
    } else if (explorer.indexOf('Opera') >= 0) {
      return 'Opera';
    } else if (explorer.indexOf('Safari') >= 0) {
      return 'Safari';
    } else if (explorer.indexOf('Netscape') >= 0) {
      return 'Netscape';
    } else if (explorer.indexOf('AppleWebKit') >= 0) {
      return 'AppleWebKit 内核的其他浏览器';
    } else {
      return '未知浏览器';
    }
  } else {
    return '未知浏览器';
  }
}
function checkIsInsideIP(ipAddress) {
  //檢查是否是內部 IP
  //1.A類地址中:10.0.0.0到10.255.255.255.255
  //2.B類地址中:172.16.0.0到172.31.255.255
  //3.C類地址中:192.168.0.0到192.168.255.255

  // const address = ip.split(':');
  // console.log(address);
  // const ipAddress = address[3];

  if (ipAddress == '127.0.0.1' || ipAddress == 'localhost') {
    return true;
  }

  const aryIpAddress = ipAddress.split('.');

  if (aryIpAddress[0] == '10') {
    return true;
  }

  if (aryIpAddress[0] == '192' && aryIpAddress[1] == '168') {
    return true;
  }

  if (aryIpAddress[0] == '172') {
    const num = parseInt(aryIpAddress[1]);
    if (num >= 16 && num <= 31) {
      return true;
    }
  }

  return false;
}

export function logger(req, res, next) {
  console.log(`Request...`);
  next();
}
