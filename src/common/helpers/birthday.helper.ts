import * as moment from 'moment-timezone';

export class Birthday {
  constructor() {}

  getNextBirthdayDatetime(date: Date, location: string) {
    const birthdayMoment = moment.tz(date, location);
    // get current time in local timezone
    const nowMoment = moment.tz(moment(), location);

    const birthdayMonthDay = birthdayMoment.format('MM-DD');
    const nowMonthDay = nowMoment.format('MM-DD');

    const currentYear = nowMoment.year();
    const time = { hour: 9, minute: 0, second: 0, millisecond: 0 };
    const gapYear = currentYear - birthdayMoment.year();

    let nextBirthdayDatetime;

    if (birthdayMonthDay < nowMonthDay) {
      nextBirthdayDatetime = moment(birthdayMoment)
        .add(gapYear + 1, 'years')
        .set(time)
        .utc()
        .format();
    } else {
      nextBirthdayDatetime = moment(birthdayMoment)
        .add(gapYear, 'years')
        .set(time)
        .utc()
        .format();
    }
    return nextBirthdayDatetime;
  }
}
