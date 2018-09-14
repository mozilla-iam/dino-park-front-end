<template>
    <transition name="modal-">
      <div class="modal" v-show="isOpen" tabindex="-1" @keyup.esc="isOpen = false" ref="modalEl">
        <div class="modal__content">
          <div class="modal__header">
            <div class="modal__container">
              <button @click="isOpen = false" class="button button--text-only button--secondary">Close <img src="@/assets/images/x.svg" alt="" width="20" aria-hidden="true" /></button>
              <h1 v-if="heading">{{ heading }}</h1>
            </div>
          </div>
          <div class="modal__container">
            <slot></slot>
          </div>
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
      this.lastFocusedElement = document.activeElement;
      document.body.style.overflow = 'hidden';
      this.$el.focus();
      bindFocusTrap(this.$refs.modalEl);
    } else {
      document.body.style.overflow = 'visible';
      unbindFocusTrap(this.$refs.modalEl);
      this.lastFocusedElement.focus();
    }
  },
  data() {
    return {
      isOpen: false,
      lastFocusedElement: null,
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
    z-index: var(--layerModal);
  }
  .modal--enter-active,
  .modal--leave-active {
    transition: all .2s ease-in-out;
  }
  .modal--enter {
    opacity: 0;
  }
    .modal__content {
      max-width: 50em;
      width: 100%;
      background: var(--white);
      padding: 1.5em;
      margin: auto;
      position: relative;
    }
    .modal__container {
      max-width: 32em;
      margin: 0 auto;
    }
    .modal__header {
      padding: 1em;
      margin: -1.5em -1.5em 0;
      border: 1px solid var(--midGrey);
      position: relative;
    }
    @media (min-width: 50em) {
      .modal__header {
        padding: 3em 1em 1em;
      }
    }
      .modal__header h1 {
        font-size: 2.25em;
        margin-bottom: 0;
      }
      .modal__header button {
        position: absolute;
        top: 1em;
        right: 1em;
      }
</style>
