<template>
  <div class="toast" role="alert">
    <span v-if="displayedContent" class="toast__content">{{
      displayedContent
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    content: String,
    time: {
      type: Number,
      default: 3000,
    },
  },
  watch: {
    content() {
      this.displayedContent = this.content;

      if (this.content.length > 0) {
        window.setTimeout(() => {
          this.$emit('reset-toast');
        }, this.time);
      }
    },
  },
  data() {
    return {
      displayedContent: '',
    };
  },
};
</script>

<style>
.toast {
  position: absolute;
  width: 100%;
}
.toast__content {
  background-color: var(--black);
  color: var(--white);
  padding: 1em 2em;
  position: absolute;
  top: 3em;
  width: 30em;
  max-width: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: var(--layerModal);
  text-align: center;
}
.toast__content a {
  color: inherit;
}
</style>
