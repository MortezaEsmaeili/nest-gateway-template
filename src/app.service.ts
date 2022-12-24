import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './event/CreateUserMessage';

@Injectable()
export class AppService {
  constructor(
    @Inject('GATEWAY') private readonly communicationClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  createUser(createUserRequest: CreateUserEvent) {
    this.communicationClient.emit(
      'create_user',
      new CreateUserEvent(createUserRequest.email),
    );

    console.log('create user event sent');
  }

  getAllUser() {
    console.log('4');
    const pattern = { cmd: 'get_all_user' };
    const payload = [];
    return this.communicationClient.send(pattern, payload);
  }
}
