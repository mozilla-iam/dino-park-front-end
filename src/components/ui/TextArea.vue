<template>
  <div class="textarea">
    <textarea
      :id="id"
      :maxlength="maxlength"
      :rows="rows"
      :cols="cols"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <span v-if="maxlength">{{ value.length }}/{{ maxlength }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    id: String,
    placeholder: String,
    maxlength: Number,
    input: String,
    value: String,
    cols: Number,
    rows: Number,
  },
};
</script>

<style>
.textarea {
  position: relative;
}

.textarea > textarea {
  border: 1px solid transparent;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  padding: 0.5em 0.9em;
  padding-bottom: 0.5em;
  width: 100%;
  resize: none;
  font: inherit;
  margin: 0.5em 0;
}

.textarea > textarea:hover {
  border-color: var(--blue-60);
}

.textarea textarea[maxlength] {
  padding-bottom: 2em;
}

.textarea textarea[maxlength] + span {
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
  /* font-size: 0.85em; */
  color: var(--gray-50);
  letter-spacing: 0.1em;
}
</style>
