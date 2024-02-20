import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 12 requests per minute
  @Throttle({ default: { limit: 12, ttl: 60_000 } })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @SkipThrottle()
  @Get('/unlimited')
  getUnlimited(): string {
    return 'Unlimited querying';
  }
}
