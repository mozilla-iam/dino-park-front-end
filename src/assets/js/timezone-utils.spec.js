import {
  getHoursDiff,
  decimalToHours,
  getFormattedDateWithTimezone,
  getBrowserTimezone,
  getTimezoneName,
} from './timezone-utils';
describe('timezone-utils', () => {
  describe('getHoursDiff', () => {
    it('should return 0 if date strings are equal', () => {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const dateString = Intl.DateTimeFormat('en-US', options).format(new Date());
      const diff = getHoursDiff(dateString, dateString);
      expect(diff).toEqual(0);
    });
    it('should return 1 if dates are an hour apart', () => {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const firstDate = new Date();
      const secondDate = new Date();
      firstDate.setHours(firstDate.getHours() + 1);
      const diff = getHoursDiff(
        Intl.DateTimeFormat('en-US', options).format(firstDate),
        Intl.DateTimeFormat('en-US', options).format(secondDate)
      );
      expect(diff).toEqual(1);
    });
    it('should return -1 if dates are an hour apart', () => {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const firstDate = new Date();
      const secondDate = new Date();
      secondDate.setHours(secondDate.getHours() + 1);
      const diff = getHoursDiff(
        Intl.DateTimeFormat('en-US', options).format(firstDate),
        Intl.DateTimeFormat('en-US', options).format(secondDate)
      );
      expect(diff).toEqual(-1);
    });
  });

  describe('decimalToHours', () => {
    it('should return an empty string if decimal is 0', () => {
      expect(decimalToHours(0)).toEqual('');
    });
    it('should return a whole number if a whole number is passed', () => {
      [-3, -2, -1, 1, 2, 3].forEach(val => {
        expect(decimalToHours(val)).toEqual(`${val > 0 ? '+' : '-'}${Math.abs(val)}`);
      });
    });
    it(`should return format '(+/-)HH:MM' if decimal is passed`, () => {
      const expectedFormats = ['-3:45', '-2:30', '-1:15', '+1:15', '+2:30', '+3:45'];
      [-3.75, -2.5, -1.25, 1.25, 2.5, 3.75].forEach((val, idx) => {
        expect(decimalToHours(val)).toEqual(expectedFormats[idx]);
      });
    });
  });
  describe('getFormattedDateWithTimezone', () => {
    it('should return a string date', () => {
      const formattedDate = getFormattedDateWithTimezone(
        new Date(),
        'America/Los_Angeles'
      );
      expect(typeof formattedDate).toEqual('string');
      expect(formattedDate.length).toBeGreaterThan(0);
    });
    it('should return different timezones', () => {
      const formattedDate1 = getFormattedDateWithTimezone(
        new Date(),
        'America/Los_Angeles'
      );
      const formattedDate2 = getFormattedDateWithTimezone(new Date(), 'America/New_York');
      expect(formattedDate1 !== formattedDate2).toBe(true);
    });
  });
  describe('getBrowserTimezone', () => {
    it('should return my local timezone', () => {
      expect(getBrowserTimezone()).toEqual(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
    });
    it('should throw an error if datetimeformat does not exist', () => {
      const old = Intl;
      Intl = null;
      expect(getBrowserTimezone()).toEqual(null);
      Intl = old;
    });
  });

  describe('getTimezoneName', () => {
    it('should return a string of timezone name', () => {
      const testTimezones = [
        'America/Halifax',
        'Africa/Sao_Tome',
        'Africa/Porto-Novo',
        'America/Adak',
        'Asia/Magadan',
      ];
      testTimezones.forEach(tz => {
        expect(getTimezoneName(tz).length).toBeGreaterThan(0);
      });
    });
    it(`should return a string '?' on bad input`, () => {
      expect(getTimezoneName(null)).toEqual('?');
    });
  });
});
