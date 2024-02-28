import {
  IsString,
  IsEmail,
  IsDateString,
  IsTimeZone,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsTimeZone({
    message:
      'location must be a valid IANA time-zone. Check https://en.wikipedia.org/wiki/List_of_tz_database_time_zones',
  })
  @IsNotEmpty()
  location: string;

  @IsDateString()
  @IsNotEmpty()
  birthdayDate: Date;

  @IsOptional()
  lastSentMessage: string;

  @IsNotEmpty()
  nextSendMessage: string;
}
