<template>
  <div class="key">
    <h5>
      <strong>{{ type }}</strong
      >: {{ title }}
    </h5>
    <textarea rows="2" v-model="content" readonly></textarea>
  </div>
</template>

<script>
export default {
  name: 'Key',
  props: {
    type: String,
    title: String,
    content: String,
  },
};
</script>

<style>
.key {
  border: 1px solid var(--gray-30);
  padding: 0.5em;
}

.key + .key,
.key + .visually-hidden + .key /* there could be a visually hidden heading between keys, in that case also add space */ {
  margin-top: 1em;
}

.key h5 {
  color: var(--gray-50);
  letter-spacing: 0.05em;
  font-weight: 400;
  margin-bottom: 0.25em;
}
.key h5 strong {
  text-transform: uppercase;
  font-weight: 400;
}

.key textarea {
  font: inherit;
  width: 100%;
  border: 0;
  resize: none;
}
</style>
