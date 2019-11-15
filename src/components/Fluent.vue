<template>
  <span v-html="getTranslation"></span>
</template>

<script>
export default {
  name: 'Fluent',
  props: {
    id: String,
    attr: String,
    args: Object,
    tags: Object,
  },
  computed: {
    getTranslation() {
      return this.fluent({
        id: this.id,
        attr: this.attr,
        args: this.args,
        tags: this.tags,
      });
    },
  },
};
</script>
