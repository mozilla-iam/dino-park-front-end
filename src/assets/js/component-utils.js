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
  if (expiration % 7 === 0 && expiration !== 0 && expiration !== null) {
    const weekNum = expiration / 7;
    const weekLabel = weekNum === 1 ? 'week' : 'weeks';
    return `${weekNum} ${weekLabel}`;
  }
  const dayLabel = expiration === 1 ? 'day' : 'days';
  return `${expiration} ${dayLabel}`;
}
