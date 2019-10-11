<template>
  <IconBlock
    class="slack-block"
    heading="Mozilla Slack"
    subHeading="Verified"
    icon="slack"
  >
    <a v-if="uri" :href="uri" target="_blank" rel="noreferrer noopener">
      {{ text }}
    </a>
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
<style>
.slack-block .icon-block__heading {
  display: flex;
}
.slack-block .icon-block__heading > span {
  margin-left: auto;
  margin-right: 0.5em;
  color: var(--green-80);
}
</style>
