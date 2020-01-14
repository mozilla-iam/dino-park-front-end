module.exports = `
simple = simple string
  .attribute = simple attribute
variables = variable x: { $x }, y: { $y }
  .attribute = variable a: { $a }, b: { $b }
html =
  html: <a data-l10n-name="one" id="one" title="one">one</a><a data-l10n-name="one" href="https://notexample.com">one</a>
  <button data-l10n-name="two" aria-label="two">two</button><a data-l10n-name="two">two</a>
  <button>three</button>
whitelisted = lorem <i>ipsum</i>
  .attributes = lorem <i href="http://example.com">ipsum</i>
  .stealing = lorem <i data-l10n-name="one" onclick="alert('oops')">ipsum</i>
localised = this string is localised
  .localised = so is this attribute
  .not-localised = but this isn't
`;
