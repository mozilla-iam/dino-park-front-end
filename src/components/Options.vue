<template>
  <div class="options">
    <button
      @click="toggleOptions"
      @keydown.up.down.prevent="toggleOptions"
      type="button"
      ref="optionToggle">
      <span class="visually-hidden">Open {{ label }}</span>
      <template v-if="collapsedShowLabel">{{ this.currentLabel }}</template>
      <span v-else class="visually-hidden">{{ this.currentLabel }}</span>
      <template v-if="collapsedShowIcon">{{ this.currentIcon }}</template>
    </button>
    <fieldset>
      <legend class="visually-hidden">{{ label }}</legend>
      <ul class="contact-me" v-show="this.open" ref="optionList">
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
    Option,
  },
  methods: {
    toggleOptions() {
      if (this.open) {
        this.open = false;
      } else {
        const firstOption = this.$refs.optionList.querySelector('label, input');

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
      this.$refs.optionToggle.focus();
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
  }
  .options input:checked + label::before {
    content: '✔️';
    float: right;
  }
  .options input:focus + label {
    background-color: #f60;
  }
</style>
