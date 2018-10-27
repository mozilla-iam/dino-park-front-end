<template>
    <transition name="modal-">
      <div class="modal" v-show="isOpen" tabindex="-1" @keyup.esc="isOpen = false" ref="modalEl">
        <div class="modal__content">
          <div class="modal__header">
            <div class="modal__container">
              <button v-if="closeButton" @click="isOpen = false" class="button button--text-only button--secondary">Close <img src="@/assets/images/x.svg" alt="" width="20" aria-hidden="true" /></button>
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
    initiallyOpen: Boolean,
    closeButton: Boolean,
  },
  updated() {
    this.init();
  },
  data() {
    return {
      isOpen: false,
      lastFocusedElement: null,
    };
  },
  mounted() {
    if (this.initiallyOpen) {
      this.isOpen = true;
      this.init();
    }
  },
  beforeDestroy() {
    this.undoLockFocus();
    this.enableBackgroundScrolling();
  },
  methods: {
    init() {
      if (this.isOpen) {
        this.lockFocus();
        this.preventBackgroundScrolling();
      } else {
        this.undoLockFocus();
        this.enableBackgroundScrolling();
      }
    },
    lockFocus() {
      this.lastFocusedElement = document.activeElement;
      bindFocusTrap(this.$refs.modalEl);
      this.$refs.modalEl.focus();
    },
    undoLockFocus() {
      unbindFocusTrap(this.$refs.modalEl);
      this.lastFocusedElement.focus();
    },
    preventBackgroundScrolling() {
      document.body.style.overflow = 'hidden';
    },
    enableBackgroundScrolling() {
      document.body.style.overflow = 'visible';
    },
  },
};
</script>

<style>
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, .7);
    display: flex;
    align-items: center;
    padding: 1em;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: var(--layerModal);
    overflow: auto;
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
    .org-chart__preview .modal__content {
      min-height: calc( 100% + 1em);
      margin-bottom: -1em;
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
