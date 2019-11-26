<template>
  <dl class="meta-list__item">
    <dt>{{ metaKey }}</dt>
    <dd v-if="link">
      <a :href="link" target="_blank" rel="noreferrer noopener">
        {{ metaValue }}
      </a>
    </dd>
    <dd v-else>
      <slot>
        {{ metaValue }}
      </slot>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'Meta',
  props: {
    metaKey: String,
    metaValue: String,
    link: {
      type: String,
      default: null,
    },
  },
};
</script>

<style>
.meta-list__item {
  margin: 0;
  color: var(--gray-50);
  box-sizing: content-box;
}

.meta-list__item dt {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.025em;
  font-size: 0.9em;
}

.meta-list__item dd {
  margin-left: 0;
}
</style>
