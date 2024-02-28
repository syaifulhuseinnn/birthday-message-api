import { Module } from '@nestjs/common';
import { SendMessageModule } from 'src/send-message/send-message.module';
import { TaskSchedulingService } from './task-scheduling.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SendMessageModule, UsersModule],
  providers: [TaskSchedulingService],
})
export class TaskSchedulingModule {}
