import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersMiddleware } from './users/users.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { SendMessageModule } from './send-message/send-message.module';
import { EmailServiceModule } from './email-service/email-service.module';
import { TaskSchedulingModule } from './task-scheduling/task-scheduling.module';
import { UsersController } from './users/users.controller';
//comment
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'qwerty@123',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    SendMessageModule,
    EmailServiceModule,
    TaskSchedulingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.DELETE },
        { path: 'users', method: RequestMethod.GET },
      )
      .forRoutes(UsersController);
  }
}
