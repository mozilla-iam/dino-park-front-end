<template>
  <div class="combobox" />
</template>

<script>
import pick from 'object.pick';
// lack of a better solution: https://github.com/downshift-js/downshift/pull/808#issuecomment-546994349
import { h, render } from 'hack/preact';
import Downshift from 'downshift/preact';
import avatarUrl from '@/assets/js/avatars';
import generateIdenticon from '@/assets/js/identicon-avatar';
import mozillaM from '@/assets/images/mozilla-m.svg';

const FILTERS = {
  includes: (value) => (entry) =>
    entry.toLowerCase().includes(value.toLowerCase()),
  startsWith: (value) => (entry) =>
    entry.toLowerCase().startsWith(value.toLowerCase()),
  none: () => () => true,
};

function itemToString(item) {
  return (item && item.display) || item;
}

const Combobox = ({
  id,
  filter,
  onChange,
  placeholder,
  value,
  source,
  onSelect = () => {},
  ...props
}) =>
  h(
    Downshift,
    {
      inputValue: value,
      selectedItem: value,
      onStateChange: onChange,
      onSelect,
      itemToString,
      ...props,
    },
    ({
      getInputProps,
      getItemProps,
      getMenuProps,
      highlightedIndex,
      isOpen,
      openMenu,
      closeMenu,
    }) =>
      h('div', { class: 'combobox__inner' }, [
        h('input', {
          id,
          value,
          type: 'text',
          class: 'combobox__input',
          autocomplete: 'off',
          onFocus: () => openMenu(),
          // onBlur: () => closeMenu(),
          placeholder,
          ...getInputProps(),
        }),
        source &&
          // isOpen &&
          h(
            'ul',
            {
              class: 'selector-auto-complete combobox__options',
              ...getMenuProps(),
            },
            source
              .filter((option) => option !== null)
              .filter(filter(value))
              .map((item, i) => {
                console.log(item);
                const option = itemToString(item);
                let src = '""';
                // check whether we are dealing with a user (which are displayed a little bit different)
                if (item.hasOwnProperty('username')) {
                  const picture = item.picture;
                  if (
                    picture === null ||
                    picture === '' ||
                    picture === 'default:' ||
                    picture.startsWith('https://s3.amazonaws.com/')
                  ) {
                    generateIdenticon(item.username, 40).then((src) => {
                      // small delay to make sure that the image is actually in the dom
                      setTimeout(() => {
                        let div = document.querySelector(
                          `div[data-uuid="${item.uuid}"]`,
                        );

                        // give up
                        if (div === null) {
                          return;
                        }

                        div.style.backgroundImage = `url("${src}")`;
                      }, 120);
                    });
                  } else {
                    src = `url("${avatarUrl(picture, 40)}")`;
                  }
                  const img = h(
                    'div',
                    {
                      class: 'curator-image user-picture user-picture--small',
                      'data-uuid': item.uuid,
                      style: `background-size: 'cover'; background-image: ${src}`,
                    },
                    // FIXME: item.isStaff is false for staff members?
                    item.isStaff &&
                      h('img', {
                        alt: 'Staff',
                        class: 'dino-type',
                        size: 'small',
                        src: mozillaM,
                      }),
                  );
                  const memberListDescription = h(
                    'div',
                    { class: 'member-list-description' },
                    h(
                      'p',
                      { class: 'member-list-description__header' },
                      option,
                    ),
                    h(
                      'p',
                      { class: 'member-list-description__sub' },
                      item.email || item.username,
                    ),
                  );

                  return h(
                    'li',
                    {
                      key: option,
                      class: `combobox__option ${
                        i === highlightedIndex
                          ? 'combobox__option--highlighted'
                          : ''
                      }`,
                      ...getItemProps({ item }),
                    },
                    h(
                      'div',
                      {
                        class:
                          'member-list-display selector-auto-complete__item',
                      },
                      img,
                      memberListDescription,
                    ),
                  );
                } else {
                  return h(
                    'li',
                    {
                      key: option,
                      class: `combobox__option ${
                        i === highlightedIndex
                          ? 'combobox__option--highlighted'
                          : ''
                      }`,
                      ...getItemProps({ item }),
                    },
                    option,
                  );
                }
              }),
          ),
      ]),
  );

export default {
  name: 'Combobox',
  props: {
    id: String,
    source: Array,
    value: String,
    placeholder: String,
    onSelect: Function,
    filter: {
      type: String,
      default: 'includes',
    },
  },
  methods: {
    renderPreact() {
      this.node = render(
        h(Combobox, {
          ...pick(this, ['id', 'source', 'value', 'placeholder', 'onSelect']),
          filter: FILTERS[this.filter],
          onChange: (changes) => {
            if (Object.prototype.hasOwnProperty.call(changes, 'inputValue')) {
              const value = changes.inputValue;
              this.$emit('input', value);
            }
          },
        }),
        this.$el,
        this.node,
      );
    },
  },
  mounted() {
    this.renderPreact();
    this.$watch(
      (instance) => Object.values(instance.$props).join(),
      () => {
        this.renderPreact();
      },
    );
  },
};
</script>

<style>
.combobox__input[aria-expanded='false'] + .combobox__options {
  display: none;
}
.combobox__input[aria-expanded='true'] + .combobox__options {
  display: block;
}
.combobox {
  display: flex;
  align-items: center;
}
.combobox__inner {
  position: relative;
  width: 100%;
}
.combobox__options {
  padding-left: 0;
  width: 100%;
  position: absolute;
  top: 2.5em;
  margin: 0;
  background-color: var(--white);
  box-shadow: 0 0 0.25em 0 var(--gray-30);
  max-height: 20em;
  overflow: auto;
  z-index: var(--layerOne);
}
.combobox__option {
  list-style: none;
  padding: 0.5em 1em;
}
.combobox__option--highlighted {
  background-color: var(--gray-20);
}
</style>
