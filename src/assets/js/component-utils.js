import marked from 'marked';
import insane from 'insane';
import {
  MEMBER_EXPIRATION_ONE_WEEK,
  MEMBER_EXPIRATION_ONE_YEAR,
} from '../../view_models/AccessGroupViewModel';

// eslint-disable-next-line
export function getTwoColumnGridArraySplitFromArray(list) {
  return list.reduce(
    (acc, curr, idx) => {
      if (idx % 2 === 0) {
        acc[0].push(curr);
      } else {
        acc[1].push(curr);
      }
      return acc;
    },
    [[], []],
  );
}

insane.defaults.allowedTags = [
  'a',
  'blockquote',
  'br',
  'code',
  'del',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'ol',
  'p',
  'pre',
  'small',
  'strong',
  'sub',
  'sup',
  'ul',
];

// eslint-disable-next-line
export function parseMarkdown(text) {
  if (!text || text === '') {
    return '';
  }
  return insane(marked(text, { gfm: true }));
}

export function expiryTextFromDate(fluent, expirationDate) {
  const expiryDate = new Date(expirationDate);
  const currentDate = new Date();
  const difference = expiryDate.getTime() - currentDate.getTime();

  const expDiffDays = Math.ceil(difference / (1000 * 3600 * 24));
  return expiryText(fluent, expDiffDays);
}

export function expiryText(fluent, days) {
  if (days <= 0) {
    return `0 ${fluent('date-day', 'plural')}`;
  }

  if (days % MEMBER_EXPIRATION_ONE_YEAR === 0 && days !== 0 && days !== null) {
    const yearNum = days / MEMBER_EXPIRATION_ONE_YEAR;
    const yearLabel =
      yearNum === 1 ? fluent('date-year') : fluent('date-year', 'plural');
    return `${yearNum} ${yearLabel}`;
  }
  if (days % MEMBER_EXPIRATION_ONE_WEEK === 0 && days !== 0 && days !== null) {
    const weekNum = days / MEMBER_EXPIRATION_ONE_WEEK;
    const weekLabel =
      weekNum === 1 ? fluent('date-week') : fluent('date-week', 'plural');
    return `${weekNum} ${weekLabel}`;
  }

  const dayLabel =
    days === 1 ? fluent('date-day') : fluent('date-day', 'plural');
  return `${days} ${dayLabel}`;
}

export function getExpirationDate(expiration) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + expiration);
  return currentDate.toLocaleDateString();
}
