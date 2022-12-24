import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserEvent } from './event/CreateUserMessage';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info(
      process.env.LOG_PATH /*this.configService.get('LOG_PATH')*/,
    );
    this.logger.info('Calling getHello()', { controller: AppController.name });
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserEvent) {
    console.log('2');
    this.appService.createUser(createUserRequest);
  }

  @Get('getusers')
  getUsers() {
    console.log('3');
    return this.appService.getAllUser();
  }
}
