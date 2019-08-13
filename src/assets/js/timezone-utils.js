export const getHoursDiff = (date1, date2) =>
  (new Date(date1) - new Date(date2)) / 36e5;

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
    console.log('Unable to get browser timezone: ', e);
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
  } catch (_) {
    return '?';
  }
};
