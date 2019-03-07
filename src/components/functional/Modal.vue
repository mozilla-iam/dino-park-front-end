<template>
  <transition name="modal-">
    <div
      class="modal"
      v-show="isOpen"
      tabindex="-1"
      @keyup.esc="isOpen = false"
      ref="modalEl"
    >
      <div class="modal__content">
        <div class="modal__header">
          <button
            v-if="closeButton"
            @click="isOpen = false"
            class="modal__close"
          >
            <span class="visually-hidden">Close</span>
            <Icon id="x" :width="30" :height="30"></Icon>
          </button>
          <h1 v-if="heading">{{ heading }}</h1>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from '@/components/Icon.vue';
import { bindFocusTrap, unbindFocusTrap } from '@/assets/js/trap-focus';

export default {
  name: 'Modal',
  props: {
    heading: String,
    initiallyOpen: Boolean,
    closeButton: Boolean,
  },
  components: {
    Icon,
  },
  updated() {
    this.init();
  },
  data() {
    return {
      isOpen: false,
      focusLocked: false,
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
    if (this.focusLocked) {
      this.undoLockFocus();
      this.enableBackgroundScrolling();
    }
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
      console.log('locking ocus');
      this.lastFocusedElement = document.activeElement;
      console.log(this.$refs.modalEl);
      bindFocusTrap(this.$refs.modalEl);
      this.$refs.modalEl.focus();
      this.focusLocked = true;
    },
    undoLockFocus() {
      unbindFocusTrap(this.$refs.modalEl);
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
      this.focusLocked = false;
    },
    preventBackgroundScrolling() {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.documentElement.style.position = 'fixed';
    },
    enableBackgroundScrolling() {
      document.body.style.overflow = 'visible';
      document.body.style.position = 'static';
      document.documentElement.style.position = 'static';
    },
    preventDefault(e) {
      e.preventDefault();
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
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
  transition: all 0.2s ease-in-out;
}
.modal--enter {
  opacity: 0;
}
.modal__content {
  width: 100%;
  height: 100%;
  background: var(--white);
  margin: auto;
  max-width: 50em;
  position: relative;
}
@media (min-width: 57.5em) {
  .modal__content {
    height: auto;
  }
}
.org-chart__preview .modal__content {
  min-height: calc(100% + 1em);
  margin-bottom: -1em;
}
.modal__container {
  max-width: 32em;
  margin: 0 auto;
}
.modal__header {
  padding: 1.5em;
  margin-bottom: 2em;
  border-bottom: 1px solid var(--gray-30);
  position: relative;
}
@media (min-width: 57.5em) {
  .modal__header {
    padding: 1.15em;
  }
}
.modal__header h1 {
  font-size: 1.5em;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 0;
  text-align: center;
}
.modal__close {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
  border: 0;
  background-color: transparent;
}
.modal__close:hover {
  color: var(--blue-60);
}
</style>
