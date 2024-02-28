import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Birthday } from 'src/common/helpers/birthday.helper';
import { UsersService } from './users.service';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  private readonly birthday = new Birthday();

  async use(req: Request, res: Response, next: NextFunction) {
    let existingUserLocation;

    const { birthdayDate, location } = req.body;

    if (req.method === 'PUT' && !location) {
      // console.log(req.params.id);
      const { location } = await this.usersService.findOne(+req.params.id);
      existingUserLocation = location;
    }

    const nextSendMessage = this.birthday.getNextBirthdayDatetime(
      birthdayDate,
      location ?? existingUserLocation,
    );

    req.body = {
      ...req.body,
      nextSendMessage: nextSendMessage,
    };

    next();
  }
}
