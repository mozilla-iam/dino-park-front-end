<template>
  <div class="input">
    <input
      :type="type ? type : 'text'"
      :id="id"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :value="value ? value : ''"
      @input="$emit('input', $event.target.value)"
    />
    <span v-if="maxlength">{{ value.length }}/{{ maxlength }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    type: String,
    placeholder: String,
    id: String,
    maxlength: Number,
    input: String,
    value: String,
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
