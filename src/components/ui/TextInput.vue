<template>
  <div class="input">
    <input
      :class="{ ['input--w-info']: Boolean(infoMsg) }"
      :type="type"
      :min="min"
      :id="id"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :pattern="pattern"
      :value="value"
      :required="required"
      @input="handleInput"
      @focus="handleInputFocus"
    />
    <span v-if="maxlength">{{ value.length }}/{{ maxlength }}</span>
    <span v-if="infoMsg" class="input__info-msg">{{ infoMsg }}</span>
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
    infoMsg: {
      type: String,
      default: '',
    },
    pattern: {
      type: String,
      default: '.*',
    },
    required: Boolean,
  },
  methods: {
    handleInputFocus() {
      this.$emit('focus');
    },
    handleInput(e) {
      if (!this.infoMsg) {
        e.target.reportValidity();
      }
      this.$emit('input', e.target.value);
    },
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
  top: 0.5em;
  color: var(--gray-50);
  letter-spacing: 0.1em;
}

input.input--w-info ~ .input__info-msg {
  color: var(--gray-50);
  padding: 0em 1em;
  font-size: small;
  display: inline-block;
}
input:invalid:not(focues).input--w-info ~ .input__info-msg {
  color: var(--neon-red);
}

input:invalid:not(focus).input--w-info {
  border-color: var(--neon-red);
}
</style>
