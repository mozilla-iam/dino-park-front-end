<template>
  <a class="button button_link" :href="href">
    <Icon v-if="iconLeft" :id="iconLeft" :width="24" :height="24" />
    <span v-if="text">{{ text }}</span>
    <Icon v-if="iconRight" :id="iconRight" :width="24" :height="24" />
  </a>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'ExternalButtonLink',
  components: { Icon },
  props: {
    href: String,
    text: String,
    iconLeft: String,
    iconRight: String,
  },
};
</script>

<style>
.button_link {
  width: max-content;
  height: max-content;
  display: inline-flex;
}
.button_link > svg + span {
  margin-left: 0.5em;
}
.button_link > span + svg {
  margin-left: 0.5em;
}
.button_link > svg {
  margin-right: 0;
}
</style>
