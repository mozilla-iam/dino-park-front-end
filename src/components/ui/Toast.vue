<template>
  <div class="toast" role="alert">
    <span
      v-if="displayedContent"
      :class="{ toast__content: true, 'toast__content--error': isToastBurning }"
      >{{ displayedContent }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    time: {
      type: Number,
      default: 3000,
    },
  },
  methods: {
    showToast(data) {
      if (data.hasOwnProperty('error') && data.error) {
        this.isToastBurning = true;
      }
      this.displayedContent = data.content;
      if (this.displayedContent.length > 0) {
        window.setTimeout(() => {
          this.$emit('reset-toast');
          this.isToastBurning = false;
          this.displayedContent = '';
        }, this.time);
      }
    },
  },
  mounted() {
    this.$root.$on('toast', (data) => this.showToast(data));
  },
  data() {
    return {
      displayedContent: '',
      isToastBurning: false,
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

.toast__content--error {
  background-color: var(--light-red);
  border: 1px solid var(--neon-red);
  color: var(--black);
}

.toast__content a {
  color: inherit;
}
</style>
