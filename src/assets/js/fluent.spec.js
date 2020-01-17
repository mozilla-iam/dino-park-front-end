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

  it("resolves to en-US when localised strings don't exist", async () => {
    expect.assertions(4);
    return Fluent.init(['abc'], [['abc']]).then((fluent) => {
      expect(fluent.get('localised')).toEqual('localised');
      expect(fluent.get('simple')).toEqual('simple string');
      expect(fluent.get('missing')).toEqual('[missing]');
      expect(fluent.get('localised_with_placeable')).toEqual(
        `this is ${FSI}localised${PDI}, but this isn't: ${FSI}simple string${PDI}`,
      );
    });
  });

  it("resolves to en-US when localised attributes don't exist", async () => {
    expect.assertions(3);
    return Fluent.init(['abc'], [['abc']]).then((fluent) => {
      expect(fluent.get('localised', 'localised')).toEqual('localised');
      expect(fluent.get('localised', 'not-localised')).toEqual(
        "but this isn't",
      );
      expect(fluent.get('missing', 'missing')).toEqual('[missing.missing]');
    });
  });

  describe('resolveLocale', () => {
    it('uses a more generic version of a requested lanauge', () => {
      expect(Fluent.resolveLocale(['a-a'], [['a'], ['b']])).toEqual([
        'a-a',
        'a',
      ]);
    });

    it('uses a different variant of a requested language', () => {
      expect(Fluent.resolveLocale(['a-a'], [['a-b'], ['b']])).toEqual([
        'a-a',
        'a-b',
      ]);
    });

    it('defaults to the first listed language', () => {
      expect(Fluent.resolveLocale(['a'], [['b'], ['c']])).toEqual(['a', 'b']);
    });

    it('resolves from localstorage first', () => {
      expect(
        Fluent.resolveLocale(['en'], [['en-GB'], ['en-US']], {
          locale: 'en-CA',
        }),
      ).toEqual(['en-CA', 'en-GB']);
    });
  });
});
