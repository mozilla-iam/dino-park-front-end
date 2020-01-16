import Vue from 'vue';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import insane from 'insane';
import USStrings from '@/locales/en-US/strings.ftl';

const languages = [
  ...(Vue.config.devtools ? [['__ids', 'Show IDs']] : []),
  ['en-US', 'English'],
  ['en-GB', 'English (British)'],
];

const whitelistedTags = ['i', 'strong'];
const whitelistedAttributes = ['title', 'aria-label'];

class Fluent {
  constructor(locale = 'en-US', resources = []) {
    this.usBundle = Fluent.constructBundle(new FluentBundle(locale), [
      USStrings,
    ]);

    if (resources.length > 0) {
      this.bundle = Fluent.constructBundle(new FluentBundle(locale), [
        USStrings,
        ...resources,
      ]);
    }
  }

  static constructBundle(bundle, resources = []) {
    resources.forEach((r) => {
      const errors = bundle.addResource(new FluentResource(r), {
        allowOverrides: true,
      });
      if (errors.length) {
        console.error(errors);
      }
    });
    return bundle;
  }

  static init(requested = navigator.languages, available) {
    this.locales = this.resolveLocale(requested, available);
    return this.load(...this.locales);
  }

  static resolveLocale(
    requested,
    available = languages,
    localStorage = window.localStorage,
  ) {
    const locales = available.map((x) => x[0]);
    const storedLocale = localStorage.locale;
    if (storedLocale) {
      requested = [storedLocale];
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const requestedTag of requested) {
      if (locales.includes(requestedTag)) {
        return [requestedTag, requestedTag];
      }
      const parent = requestedTag.match(/[A-Za-z]*/)[0];
      const regex = RegExp(`^${parent}(-|$)`);
      const foundTag = locales.find((l) => regex.test(l));
      if (foundTag) {
        return [requestedTag, foundTag];
      }
    }
    return [requested[0], locales[0]];
  }

  static async load(locale, stringsLocale) {
    try {
      const strings = await import(
        /* webpackChunkName: "i18n.[request]" */ `@/locales/${stringsLocale}/strings.ftl`
      );
      return new Fluent(locale, [strings.default]);
    } catch (e) {
      console.error(e);
    }
    return new Fluent(locale);
  }

  static languages() {
    return languages;
  }

  get(...parameters) {
    if (typeof parameters[0] === 'string') {
      const id = parameters[0];
      switch (parameters.length) {
        case 2:
          if (typeof parameters[1] === 'string') {
            return this.get({ id, attr: parameters[1] });
          }
          return this.get({ id, args: parameters[1] });
        default:
          return this.get({ id });
      }
    }
    const { id, attr, args, tags } = parameters[0];
    const message = this.getMessage(id, attr, args);
    return Fluent.sanitize(message, tags);
  }

  static sanitize(message, tags = {}) {
    const allowedAttributes = {};
    Object.values(tags).forEach((t) => {
      allowedAttributes[t.tag] = Object.keys(t)
        .filter((x) => x !== 'tag')
        .concat(whitelistedAttributes);
    });

    return insane(
      message,
      {
        allowedAttributes,
        allowedTags: Object.values(tags)
          .map((t) => t.tag)
          .concat(whitelistedTags),
        allowedSchemes: ['http', 'https', 'mailto'],
        filter(token) {
          const name = token.attrs['data-l10n-name'];
          if (name) {
            Object.entries(tags[name]).forEach(([k, v]) => {
              token.attrs[k] = v;
            });
          }
          if (
            whitelistedTags.includes(token.tag) ||
            (Object.keys(tags).includes(name) && tags[name].tag === token.tag)
          ) {
            return true;
          }
          return false;
        },
      },
      true,
    );
  }

  getMessage(id, attr = null, args = {}, bundle = this.bundle, us = false) {
    const parentMessage = bundle ? bundle.getMessage(id) : undefined;
    let message;

    if (Fluent.locales && Fluent.locales[1] === '__ids') {
      return `[${id}${attr ? `.${attr}` : ''}]`;
    }

    if (!parentMessage) {
      if (us) {
        console.error(`string ${id} doesn't exist`);
        return `[${id}${attr ? `.${attr}` : ''}]`;
      }
      return this.getMessage(id, attr, args, this.usBundle, true);
    }

    if (attr) {
      message = parentMessage.attributes[attr];
      if (!message) {
        if (us) {
          console.error(`string ${id} with ${attr} attribute doesn't exist`);
          return `[${id}.${attr}]`;
        }
        return this.getMessage(id, attr, args, this.usBundle, true);
      }
    } else if (parentMessage.value) {
      message = parentMessage.value;
    }

    const errors = [];
    const formatted = bundle.formatPattern(message, args, errors);
    if (errors.length) {
      console.error(errors);
    }
    return formatted;
  }
}

export default Fluent;
