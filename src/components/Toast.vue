<template>
  <div class="toast" role="alert">
    <span v-if="content" class="toast__content">{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    content: String,
  },
  watch: {
    content() {
      if (this.content.length > 0) {
        window.setTimeout(() => {
          this.content = '';
        }, 1000);
      }
    },
  },
};
</script>

<style>
.toast {
  position: absolute;
}
.toast__content {
  background-color: var(--black);
  color: var(--white);
  padding: 1em 2em;
  position: fixed;
  top: 5.5em;
  width: 30em;
  left: 50%;
  margin-left: -15em;
  z-index: var(--layerModal);
  }
  .toast__content a {
    color: inherit;
  }
</style>
