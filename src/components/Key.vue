<template>
  <div class="key">
    <h5><strong>{{ type }}</strong>: {{ title }}</h5>
    <pre>{{ content }}</pre>
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
  padding: .5em;
}

.key + .key {
  margin-top: 1em;
}

.key h5 strong {
  color: var(--gray-50);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 400;
}
</style>
