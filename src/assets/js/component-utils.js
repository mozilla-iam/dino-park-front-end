import marked from 'marked';
import insane from 'insane';

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
    [[], []]
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

export function expiryText(expiration) {
  const expiryDate = new Date(expiration);
  const currentDate = new Date();
  const difference = expiryDate.getTime() - currentDate.getTime();
  if (difference <= 0) {
    return '0 days';
  }
  const expDiffDays = Math.ceil(difference / (1000 * 3600 * 24));
  if (expDiffDays % 7 === 0 && expDiffDays !== 0 && expDiffDays !== null) {
    const weekNum = expDiffDays / 7;
    const weekLabel = weekNum === 1 ? 'week' : 'weeks';
    return `${weekNum} ${weekLabel}`;
  }
  const dayLabel = expDiffDays === 1 ? 'day' : 'days';
  return `${expDiffDays} ${dayLabel}`;
}
