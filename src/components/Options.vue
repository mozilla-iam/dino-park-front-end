<template>
  <div class="options">
    <button 
      @click="toggleOptions" 
      @keydown.up.down.prevent="toggleOptions" 
      type="button" 
      ref="optionToggle">
      <span class="visually-hidden">Open {{ label }}</span>
      {{ this.currentLabel }}
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
          :id="`option-${option.value}-${index}`" 
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
        this.$nextTick(() => {
          firstOption.focus();
        });
      }
    },
    honourChoice(data) {
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
