import Fluent from './fluent.js';

// Unicode bidi isolation characters.
const FSI = '\u2068';
const PDI = '\u2069';

describe('Fluent', () => {
  const fluent = new Fluent();

  it('renders a simple string', () => {
    const result = 'simple string';
    expect(fluent.get('simple')).toBe(result);
    expect(fluent.get({ id: 'simple' })).toEqual(result);
  });

  it('returns an id string for missing string', () => {
    expect(fluent.get('missing')).toEqual('[missing]');
  });

  it('renders a string with variables', () => {
    const result = `variable x: ${FSI}foo${PDI}, y: ${FSI}bar${PDI}`;
    expect(fluent.get('variables', { x: 'foo', y: 'bar' })).toEqual(result);
    expect(
      fluent.get({ id: 'variables', args: { x: 'foo', y: 'bar' } }),
    ).toEqual(result);
  });

  it('renders a simple attribute', () => {
    const result = 'simple attribute';
    expect(fluent.get('simple', 'attribute')).toEqual(result);
    expect(fluent.get({ id: 'simple', attr: 'attribute' })).toEqual(result);
  });

  it('renders an attribute with variables', () => {
    const result = `variable a: ${FSI}bar${PDI}, b: ${FSI}foo${PDI}`;
    expect(
      fluent.get({
        id: 'variables',
        attr: 'attribute',
        args: { b: 'foo', a: 'bar' },
      }),
    ).toEqual(result);
  });

  it('returns an id string for missing attribute', () => {
    expect(fluent.get('simple', 'missing')).toEqual('[simple.missing]');
    expect(fluent.get('missing', 'attribute')).toEqual('[missing.attribute]');
  });

  it('sanitizes html in strings', () => {
    const result = `html: <a title="one" href="https://example.com">one</a><a href="https://example.com">one</a>
<button aria-label="two" id="two">two</button>
`;
    expect(
      fluent.get({
        id: 'html',
        tags: {
          one: { tag: 'a', href: 'https://example.com' },
          two: { tag: 'button', id: 'two' },
        },
      }),
    ).toEqual(result);
  });

  it('allows globally whitelisted tags', () => {
    expect(fluent.get('whitelisted')).toEqual('lorem <i>ipsum</i>');
  });

  it("doesn't allow attributes on whitelisted tags", () => {
    expect(fluent.get('whitelisted', 'attributes')).toEqual(
      'lorem <i>ipsum</i>',
    );
  });

  it("doesn't allow whitelisted tags to steal from defined ones", () => {
    expect(
      fluent.get({
        id: 'whitelisted',
        attr: 'stealing',
        tags: {
          one: { tag: 'button', id: 'two', onclick: 'alert("hello")' },
        },
      }),
    ).toEqual('lorem <i>ipsum</i>');
  });
});
