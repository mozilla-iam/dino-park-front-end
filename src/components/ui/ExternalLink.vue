<template>
  <a
    :href="href"
    target="_blank"
    rel="noreferrer noopener"
    class="external-link"
  >
    <span>
      <slot></slot>
    </span>
    <Icon id="external" :width="17" :height="17"></Icon>
  </a>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'ExternalLink',
  components: { Icon },
  props: {
    href: String,
  },
};
</script>

<style>
.external-link > svg {
  margin-left: 0.2em;
  vertical-align: sub;
  width: 1em;
  height: 1em;
}
</style>
