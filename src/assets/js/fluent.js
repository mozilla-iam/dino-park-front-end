import { FluentBundle, FluentResource } from '@fluent/bundle';
import insane from 'insane';
import Strings from '@/locales/en-US/strings.ftl';

const inlineTags = ['i'];

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
        .concat(['title', 'aria-label']);
    });

    return insane(
      message,
      {
        allowedAttributes,
        allowedTags: Object.values(tags)
          .map((t) => t.tag)
          .concat(inlineTags),
        allowedSchemes: ['http', 'https', 'mailto'],
        filter(token) {
          const name = token.attrs['data-l10n-name'];
          if (
            Object.keys(tags).includes(name) &&
            tags[name].tag === token.tag
          ) {
            Object.entries(tags[name]).forEach(([k, v]) => {
              token.attrs[k] = v;
            });
            return true;
          }
          if (inlineTags.includes(token.tag)) {
            return true;
          }
          return false;
        },
      },
      true,
    );
  }

  getMessage(id, attr = null, args = {}) {
    const parentMessage = this.bundle.getMessage(id);
    let message;

    if (!parentMessage) {
      console.error(`string ${id} doesn't exist`);
      return `[${id}${attr ? `.${attr}` : ''}]`;
    }

    if (attr) {
      message = parentMessage.attributes[attr];
      if (!message) {
        console.error(`string ${id} with ${attr} attribute doesn't exist`);
        return `[${id}.${attr}]`;
      }
    } else if (parentMessage.value) {
      message = parentMessage.value;
    }

    const errors = [];
    const formatted = this.bundle.formatPattern(message, args, errors);
    if (errors.length) {
      console.error(errors);
    }
    return formatted;
  }
}

export default Fluent;
