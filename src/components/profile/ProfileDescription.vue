<template>
  <div class="profile__description">
    <h2 class="visually-hidden">About</h2>
    <p v-html="marked(description)"></p>
  </div>
</template>

<script>
import marked from 'marked';
import insane from 'insane';

export default {
  name: 'ProfileDescription',
  props: {
    description: String,
  },
  methods: {
    marked(value) {
      if (value) {
        return insane(marked(value));
      }
      return '';
    },
  },
};
</script>

<style>
.profile__description {
  max-width: 100%;
  color: var(--gray-50);
}
</style>
