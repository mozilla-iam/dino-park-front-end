import { FluentBundle, FluentResource } from '@fluent/bundle';
import insane from 'insane';
import Strings from '@/locales/en-US/strings.ftl';

class Fluent {
  constructor(locale = 'en-US') {
    const resource = new FluentResource(Strings);
    const bundle = new FluentBundle(locale);
    const errors = bundle.addResource(resource);
    if (errors.length) {
      console.error(errors);
    }

    this.bundle = bundle;
  }

  get(...parameters) {
    if (typeof parameters[0] === 'string') {
      switch (parameters.length) {
        case 2:
          if (typeof parameters[1] === 'string') {
            return this.get({ id: parameters[0], attr: parameters[1] });
          }
          return this.get({ id: parameters[0], args: parameters[1] });
        default:
          return this.get({ id: parameters[0] });
      }
    }
    const { id, attr, args, tags } = parameters[0];
    const message = this.getMessage(id, attr, args);
    return Fluent.sanitize(message, tags);
  }

  static sanitize(message, tags = {}) {
    return insane(message, {
      filter(token) {
        const name = token.attrs['data-l10n-name'];
        if (Object.keys(tags).includes(name) && tags[name].tag === token.tag) {
          Object.keys(token.attrs).forEach((k) => {
            if (k !== 'title') delete token.attrs[k];
          });
          Object.entries(tags[name]).forEach(([k, v]) => {
            token.attrs[k] = v;
          });
          return true;
        }
        return false;
      },
    });
  }

  getMessage(id, attr = null, args = {}) {
    const message = this.bundle.getMessage(id);

    if (message) {
      if (attr) {
        const messageAttr = message.attributes[attr];
        if (messageAttr) {
          const errors = [];
          const msg = this.bundle.formatPattern(messageAttr, args, errors);
          if (errors.length) {
            console.error(errors);
          }
          return msg;
        }
        console.error(`string ${id} with ${attr} attribute doesn't exist`);
      }

      if (message.value) {
        return this.bundle.formatPattern(message.value);
      }
    }

    console.error(`string ${id} doesn't exist`);
    return '';
  }
}

export default Fluent;
