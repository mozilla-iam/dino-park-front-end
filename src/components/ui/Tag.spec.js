import Tag from './Tag.vue';
import getRenderedText from '../../../tests/utils/getRenderedText.js';

describe('Tag.vue', () => {
  it('renders props.tag when passed', () => {
    const msg = 'test';
    const text = getRenderedText(Tag, { tag: msg }).trim();
    expect(text).toBe(msg);
  });
  it('renders button with "remove" text when props.removable is passed', () => {
    const vis = getRenderedText(
      Tag,
      { tag: 'test', removable: true },
      '.visually-hidden',
    );
    expect(vis).toBe('Remove test');
  });
});
