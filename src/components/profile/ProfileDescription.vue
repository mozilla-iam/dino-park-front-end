<template>
  <div class="profile-description">
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
        return insane(marked(value, { gfm: true }));
      }
      return '';
    },
  },
};
</script>

<style>
.profile-description {
  max-width: 100%;
  color: var(--gray-50);
}
.profile-description--faded {
  max-height: 7em;
  overflow: hidden;
  position: relative;
}
.profile-description--faded::after {
  content: '';
  display: block;
  position: absolute;
  top: 4em;
  height: 3em;
  width: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0) 0, var(--white) 100%);
  pointer-events: none;
}
</style>
