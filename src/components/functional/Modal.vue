<template>
    <div class="modal" v-show="isOpen" tabindex="-1" @keyup.esc="isOpen = false">
      <div class="modal__content">
        <button @click="isOpen = false">Close</button>
        <slot></slot>
      </div>
    </div>
</template>

<script>
import { bindFocusTrap, unbindFocusTrap } from '@/assets/js/trapFocus';

export default {
  name: 'Modal',
  updated() {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';

      this.$el.focus();

      // @todo trap focus
      // bindFocusTrap(this.modalElement);
    } else {
      document.body.style.overflow = 'visible';

      // @todo unbind focus trap
      // unbindFocusTrap(this.modalElement);
      // @todo return focus to last focused element
    }
  },
  data() {
    return {
      isOpen: false,
      modalElement: this.$el,
    };
  },
};
</script>

<style>
  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0, .5);
    display: flex;
    align-items: center;
    padding: 1em;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: 2;
  }
  .modal--enter-active {
    transition: all .2s ease-in-out;
  }
  .modal--enter {
    opacity: 0;
  }
    .modal__content {
      max-width: 32em;
      background: var(--white);
      border: 1px solid var(--midGrey);
      padding: 1.5em;
      margin: auto;
      position: relative;
    }
</style>
