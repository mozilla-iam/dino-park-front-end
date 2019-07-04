<template>
  <div class="combobox"></div>
</template>

<script>
import pick from 'object.pick';
import { h, render } from 'preact';
import Downshift from 'downshift/preact';

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
          onBlur: () => closeMenu(),
          placeholder,
          ...getInputProps(),
        }),
        source &&
          isOpen &&
          h(
            'ul',
            { class: 'combobox__options', ...getMenuProps() },
            source
              .filter((option) => option !== null)
              .filter(filter(value))
              .map((item, i) => {
                const option = itemToString(item);
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
  background-color: var(--blue-60);
  color: var(--white);
}
</style>
