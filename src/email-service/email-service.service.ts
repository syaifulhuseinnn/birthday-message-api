import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/users/interface/user.interface';

@Injectable()
export class EmailService {
  async sendEmail(user: User, message: string): Promise<any> {
    const { email } = user;
    try {
      const response = await axios.post(
        'https://email-service.digitalenvision.com.au/send-email',
        { email, message },
      );

      return {
        ...response.data,
        ...user,
      };
    } catch (error) {
      return Promise.reject({
        message: `Failed sent to ${email}. Message: ${error.message}`,
        user: user,
      });
    }
  }
}
