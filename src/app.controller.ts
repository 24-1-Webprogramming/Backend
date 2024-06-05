import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
    ) {}
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({summary: '버전 체크 api', description: '버전을 반환한다'})
  @ApiResponse({ status: 200, description: 'get version'})
  @Get('version')
  versionCheck() {
    return this.configService.get('VERSION');
  }
}
