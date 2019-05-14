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
.input input[maxlength] {
  padding-right: 5em;
}
.input input[maxlength] + span {
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
  font-size: 0.85em;
  color: var(--gray-50);
  letter-spacing: 0.1em;
}
</style>
