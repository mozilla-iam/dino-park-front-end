<template>
  <IconBlock :heading="'Mozilla Slack'" :icon="'slack'">
    <a v-if="uri" :href="uri" target="_blank" rel="noreferrer noopener">{{
      text
    }}</a>
    <template v-else>{{ text }}</template>
  </IconBlock>
</template>
<script>
import IconBlock from '@/components/ui/IconBlock.vue';

export default {
  name: 'ViewSlack',
  components: { IconBlock },
  props: {
    slack: Object,
  },
  computed: {
    uri() {
      return this.slack.value.substring(0, this.slack.value.indexOf('#'));
    },
    text() {
      return this.slack.value.substring(this.slack.value.indexOf('#') + 1);
    },
  },
};
</script>
<style></style>
