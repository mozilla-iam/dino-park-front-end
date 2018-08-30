<template>
    <transition name="modal-">
      <div class="modal" v-show="isOpen" tabindex="-1" @keyup.esc="isOpen = false">
        <div class="modal__content">
          <div class="modal__header">
            <button @click="isOpen = false">Close</button>
            <h1 v-if="heading">{{ heading }}</h1>
          </div>
          <slot></slot>
        </div>
      </div>
    </transition>
</template>

<script>
import { bindFocusTrap, unbindFocusTrap } from '@/assets/js/trapFocus';

export default {
  name: 'Modal',
  props: {
    heading: String,
  },
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
  .modal--enter-active,
  .modal--leave-active {
    transition: all .2s ease-in-out;
  }
  .modal--enter {
    opacity: 0;
  }
    .modal__content {
      max-width: 32em;
      background: var(--white);
      padding: 1.5em;
      margin: auto;
      position: relative;
    }
    .modal__header {
      padding: 1em;
      margin: -1.5em -1.5em 0;
      border: 1px solid var(--midGrey);
    }
      .modal__header h1 {
        font-size: 2.25em;
        margin-bottom: 0;
      }
      .modal__header button {
        float: right;
        margin-left: 1em;
      }
</style>
