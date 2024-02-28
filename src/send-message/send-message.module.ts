import { Module } from '@nestjs/common';
import { SendMessageService } from './send-message.service';
import { UsersModule } from 'src/users/users.module';
import { EmailServiceModule } from 'src/email-service/email-service.module';

@Module({
  imports: [UsersModule, EmailServiceModule],
  providers: [SendMessageService],
  exports: [SendMessageService],
})
export class SendMessageModule {}
