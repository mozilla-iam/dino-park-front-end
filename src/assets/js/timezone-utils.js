export const getHoursDiff = (date1, date2) =>
  (new Date(date1) - new Date(date2)) / 36e5;

export const decimalToHours = (decimal) => {
  const sign = decimal > 0 ? '+' : '-';
  decimal = Math.abs(decimal);
  const hours = Math.floor(decimal);
  const minutes = Math.abs(parseFloat((decimal % 1).toFixed(2)) * 60);
  if (hours === 0 && minutes === 0) {
    return '';
  }
  if (hours === 0) {
    return `${sign}:${minutes < 10 ? `0${minutes}` : minutes}`;
  }
  if (minutes === 0) {
    return sign + hours;
  }
  return `${sign}${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const getFormattedDateWithTimezone = (datetime, tz) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  if (tz) {
    options.timeZone = tz;
  }
  return new Intl.DateTimeFormat('en-US', options).format(datetime);
};

export const getBrowserTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    console.error('Unable to get browser timezone: ', e);
    return null;
  }
};

export const getTimezoneName = (timezone) => {
  try {
    return new Intl.DateTimeFormat('default', {
      timeZoneName: 'short',
      timeZone: timezone,
    })
      .formatToParts(new Date())[6]
      .value.replace('GMT', 'UTC');
  } catch (e) {
    console.error('Error getting timezone name: ', e);
    return '?';
  }
};
