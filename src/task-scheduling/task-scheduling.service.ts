import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
import { SendMessageService } from 'src/send-message/send-message.service';

@Injectable()
export class TaskSchedulingService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendMessageService: SendMessageService,
  ) {}
  private readonly logger = new Logger(TaskSchedulingService.name);

  @Cron(CronExpression.EVERY_HOUR, { timeZone: 'Etc/UTC' })
  async checkUsersBirthday() {
    const currentUtcTime = moment().utc().format();

    try {
      const users =
        await this.usersService.findAllByBirthdayDate(currentUtcTime);
      await this.sendMessageService.sendBirthdayMessage(users);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Timeout(5000)
  async checkMissedBirthdayMessage() {
    this.logger.debug('Start check missed birthday message...');
    const currentUtcTime = moment().utc().format();

    try {
      const users =
        await this.usersService.findAllByNextSendMessage(currentUtcTime);

      if (users.length > 0) {
        this.logger.debug(`Found ${users.length} users!`);
        this.logger.debug(`Start send missed birthday message...`);
        await this.sendMessageService.sendBirthdayMessage(users);
      } else {
        this.logger.debug('Missed birthday message was not found!');
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
