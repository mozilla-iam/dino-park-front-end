<template>
  <div v-if="parsedDescription" class="profile-description">
    <strong>Biography</strong>
    <p v-html="parsedDescription"></p>
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
  computed: {
    parsedDescription() {
      if (this.description) {
        return insane(marked(this.description, { gfm: true }));
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
  border: 1px solid var(--gray-30);
  border-radius: 0.3em;
  padding: 1em;
  padding-bottom: 0;
  margin-top: 2em;
}
.profile-description > strong {
  text-transform: uppercase;
  font-size: 0.9em;
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
