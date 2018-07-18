<template>
  <div class="key">
    <h5>{{ type }}: {{ title }}</h5>
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

