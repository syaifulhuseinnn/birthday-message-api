import { Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email-service/email-service.service';
import { User } from 'src/users/interface/user.interface';

/**
 * * 1. Cron dijalankan setiap jam
 * * 2. Query ke tabel users, cari user yang memiliki next_send_message == waktu UTC saat ini
 * * 3. Kirim email ke user ucapan ultah
 * * 4. Jika SUKSES, update kolom last_sent_message dengan value dari variabel #sentTime dan update kolom next_send_message dengan tahun berikutnya di jam 9 am
 * * 5. Jika GAGAL, ulangi mengirim lagi sampai berhasil
 *
 * TODO : 2,4,5
 */

@Injectable()
export class SendMessageService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}
  private readonly logger = new Logger(SendMessageService.name);

  writeBirthdayMessage(firstName: string, lastName: string) {
    const message = `Hey, ${firstName + lastName} it's your birthday!`;
    return message;
  }

  async sendBirthdayMessage(users: User[]) {
    const utcTime = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    const localTime = moment()
      .utc()
      .tz('Asia/Jakarta')
      .format('YYYY-MM-DD HH:mm:ss');

    try {
      const promises = users.map((user) => {
        const message = this.writeBirthdayMessage(
          user.firstName,
          user.lastName,
        );
        return this.emailService.sendEmail(user, message);
      });

      // Send bithday message concurently
      Promise.allSettled(promises).then((results) => {
        results.forEach(async (result) => {
          if (result.status === 'fulfilled') {
            const { sentTime, location, userId, email, status, birthdayDate } =
              result.value;
            // convert sentTime to UTC
            const lastSendMessage = moment(sentTime).utc();

            // update column next_send_message to next year and last_send_message
            const time = { hour: 9, minute: 0, second: 0, millisecond: 0 };
            const nextSendMessage = moment(birthdayDate)
              .tz(location)
              .year(lastSendMessage.year())
              .add(1, 'years')
              .set(time)
              .format();

            await this.usersService.update(userId, {
              nextSendMessage: moment.utc(nextSendMessage).format(),
              lastSentMessage: lastSendMessage.format(),
            });

            this.logger.debug(
              `${status} to '${email}' at ${sentTime} [UTC: ${utcTime}] | [LOCAL: ${localTime}]`,
            );
          } else {
            this.logger.error(result.reason.message);
            this.logger.warn(
              `Retry send email to '${result.reason.user.email}'...`,
            );

            // Retry send failed birthday message
            this.sendBirthdayMessage([result.reason.user]);
          }
        });
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
