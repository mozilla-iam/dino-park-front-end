<template>
  <div class="input">
    <input
      :class="{
        'input--w-info': Boolean(infoMsg),
        'input--red': highlightError,
      }"
      :type="type"
      :min="min"
      :max="max"
      :id="id"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :pattern="pattern"
      :value="value"
      :required="required"
      @input="handleInput"
      @focus="handleInputFocus"
      ref="input"
    />
    <span v-if="maxlength">{{ value.length }}/{{ maxlength }}</span>
    <span v-if="infoMsg" class="input__info-msg">{{ custom || infoMsg }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    id: String,
    maxlength: Number,
    value: {
      type: [String, Number],
      default: '',
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    infoMsg: {
      type: String,
      default: '',
    },
    pattern: {
      type: String,
      default: '.*',
    },
    highlightError: {
      type: Boolean,
      default: false,
    },
    oneShotError: {
      type: String,
      default: '',
    },
    required: Boolean,
    selected: Boolean,
  },
  methods: {
    handleInputFocus() {
      this.$emit('focus');
    },
    handleInput(e) {
      if (this.custom) {
        this.custom = '';
        e.target.setCustomValidity('');
      }
      this.$emit('input', e.target.value);
    },
  },
  mounted() {
    if (this.selected) {
      this.$refs.input.focus();
      this.$refs.input.select();
    }
  },
  watch: {
    oneShotError(v) {
      if (v) {
        this.custom = v;
        this.$refs.input.setCustomValidity(v);
      }
    },
  },
  data() {
    return {
      custom: '',
    };
  },
};
</script>

<style>
.input {
  position: relative;
}
.input > input {
  border: 1px solid transparent;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  width: 100%;
  font-size: 1em;
  padding: 0.5em 0.9em;
}

.input > input:hover {
  border-color: var(--blue-60);
}

.input input[maxlength] {
  padding: 0.5em 4.5em 0.5em 0.9em;
}

.input input[maxlength] + span {
  position: absolute;
  right: 1em;
  top: 1em;
  color: var(--gray-50);
  letter-spacing: 0.1em;
}

input.input--w-info ~ .input__info-msg {
  color: var(--gray-50);
  padding: 0em 1em;
  font-size: small;
  display: inline-block;
}
input:invalid.input--red ~ .input__info-msg {
  color: var(--neon-red);
}

input:invalid:not(focus).input--red {
  border-color: var(--neon-red);
}
</style>
