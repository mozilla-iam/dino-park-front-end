<template>
  <div class="input">
    <input
      :type="type"
      :min="min"
      :id="id"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="handleInputFocus"
      @keypress="handleInputKeyPress"
    />
    <span v-if="maxlength">{{ value.length }}/{{ maxlength }}</span>
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
  },
  methods: {
    handleInputFocus() {
      this.$emit('focus');
    },
    handleInputKeyPress(e) {
      // Check if type is number
      if (this.type === 'number') {
        // Since we know this is a number, just concat the keycode onto the current value to check the new value
        const pressed = parseInt(
          `${e.target.value}${String.fromCharCode(e.keyCode)}`,
        );
        // Confirm the value is still appropriate
        if (e.which < 48 || e.which > 57 || pressed < this.min) {
          e.preventDefault();
          return;
        } else {
          this.$emit('keypress', e);
        }
      }
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
  top: 50%;
  transform: translate(0, -50%);
  color: var(--gray-50);
  letter-spacing: 0.1em;
}
</style>
