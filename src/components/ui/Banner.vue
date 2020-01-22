<template>
  <div class="banner">
    <p></p>
    <button @click="$emit('close')">
      <span class="visually-hidden">{{ fluent('close') }}</span>
      <Icon id="x" :width="20" :height="20" />
    </button>
  </div>
</template>

<script>
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'Banner',
  mixins: [LinksMixin],
  components: {
    Icon,
  },
};
</script>

<style>
.banner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--blue-60);
  color: var(--white);
  text-align: center;
}
.banner a {
  color: var(--gray-10);
}
.banner a:hover {
  color: inherit;
}
.banner button {
  border: none;
  background: none;
  color: inherit;
}
.banner button:focus {
  outline: 1px solid white;
}
.focus-styles .banner a:focus {
  box-shadow: 0px 0 0 1px var(--white), 0 0 0 3px var(--transparentWhite);
}
</style>
