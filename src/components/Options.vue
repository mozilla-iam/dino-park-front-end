<template>
  <div class="options">
    <button
      @click="toggleOptions"
      @keydown.up.down.prevent="toggleOptions"
      type="button"
      :ref="`optionToggle-${id}`"
      <span class="visually-hidden">Open {{ label }}</span>
      <template v-if="collapsedShowLabel">{{ this.currentLabel }}</template>
      <span v-else class="visually-hidden">{{ this.currentLabel }}</span>
      <Icon v-if="collapsedShowIcon" :id="this.currentIcon" :width="24" :height="24" aria-hidden="true" role="presentation"></Icon>
    </button>
    <fieldset>
      <legend class="visually-hidden">{{ label }}</legend>
      <ul class="options__list" v-show="this.open" :ref="`optionList-${id}`">
        <Option
          v-for="(option, index) in options"
          :key="index"
          :groupId="id"
          :label="option.label"
          :value="option.value"
          :icon="option.icon"
          :id="`option-${option.value}-${index}`"
          :bind="{ expandedShowIcon, expandedShowLabel }"
          @option-picked="honourChoice"
          @close-list="closeList" />
      </ul>
    </fieldset>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import Option from '@/components/Option.vue';

export default {
  name: 'Options',
  props: {
    label: String,
    id: String,
    options: Array,
    defaultToFirst: {
      type: Boolean,
      default: false,
    },
    collapsedShowIcon: {
      type: Boolean,
      default: true,
    },
    collapsedShowLabel: {
      type: Boolean,
      default: true,
    },
    expandedShowIcon: {
      type: Boolean,
      default: true,
    },
    expandedShowLabel: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Icon,
    Option,
  },
  methods: {
    toggleOptions() {
      if (this.open) {
        this.open = false;
      } else {
        const firstOption = this.$refs[`optionList-${this.id}`].querySelector('input');

        this.open = true;

        if (firstOption) {
          this.$nextTick(() => {
            firstOption.focus();
          });
        }
      }
    },
    honourChoice(data) {
      this.currentIcon = data.icon;
      this.currentValue = data.value;
      this.currentLabel = data.label;
    },
    closeList() {
      const optionToggle = this.$refs[`optionToggle-${this.id}`];

      this.open = false;

      if (optionToggle) {
        this.$nextTick(() => {
          optionToggle.focus();
        });
      }
    },
  },
  data() {
    return {
      currentValue: '',
      currentLabel: '',
      currentIcon: '',
      open: false,
    };
  },
  created() {
    if (this.defaultToFirst) {
      this.currentLabel = this.options[0].label;
    }
  },
};
</script>

<style>
.options {
  position: relative;
}
  .options__toggle {
    background-color: transparent;
    font-size: inherit;
    border: 0;
  }
  .options__list {
    padding-left: 0;
    max-height: 25em;
    background-color: var(--white);
    box-shadow: 0 .125em .25em .125em rgba(210, 210, 210, .5);
    text-align: left;
    padding-left: 0;
    z-index: calc(var(--layerModal) - 1);
    position: absolute;
    top: 3.5em;
    left: 0;
    width: calc(100% + 4.5em);
    margin: 0 -2.25em;
    color: var(--gray-60);
  }
  @media(min-width:57.5em) {
    .options__list {
      left: 50%;
      width: 24em;
      margin: 0 .5em 0 -12em;
    }
  }
  .options__list::before {
    content: '';
    width: 1em;
    height: 1em;
    background-color: var(--white);
    position: absolute;
    left: 50%;
    margin-left: -.5em;
    margin-top: -.5em;
    transform: rotate(-45deg);
    box-shadow: 0 0 .25em 0 var(--gray-30);
  }
  .options__option {
    list-style: none;
    background-color: var(--white);
    position: relative;
    text-decoration: none;
    color: inherit;
    min-width: 20em;
  }
  .options__option svg {
    width: 2em;
    margin-right: .75em;
  }
  .options fieldset {
    padding: 0;
    border: 0;
  }
  .options input {
    position: absolute;
    opacity: 0;
  }
  .options label {
    padding: .5em 1em;
    margin: 0;
    display: flex;
    align-items: center;
  }
  .options input:checked + label::after {
    content: '✔️';
    float: right;
  }
  .options input:focus + label {
    position: relative;
    z-index: calc(var(--layerModal) - 1);
    box-shadow: 0px 0 0 1px var(--blue-60), 0 0 0 3px var(--transparentBlue);
  }
</style>
