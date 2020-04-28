<template>
  <transition name="modal-">
    <div class="modal" tabindex="-1" @keyup.esc="$emit('close')" ref="modalEl">
      <div class="modal__content">
        <header class="modal__header">
          <button
            v-if="closeButton"
            type="button"
            @click="$emit('close')"
            class="modal__close"
          >
            <span class="visually-hidden">{{ fluent('close') }}</span>
            <Icon id="x" :width="30" :height="30"></Icon>
          </button>
          <h1 v-if="heading">{{ heading }}</h1>
        </header>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import { bindFocusTrap, unbindFocusTrap } from '@/assets/js/trap-focus';

export default {
  name: 'Modal',
  props: {
    heading: String,
    closeButton: Boolean,
  },
  components: {
    Icon,
  },
  data() {
    return {
      lastFocusedElement: null,
    };
  },
  mounted() {
    this.lockFocus();
    this.preventBackgroundScrolling();
  },
  beforeDestroy() {
    this.undoLockFocus();
    this.enableBackgroundScrolling();
  },
  methods: {
    lockFocus() {
      this.lastFocusedElement = document.activeElement;
      bindFocusTrap(this.$refs.modalEl);
      this.$refs.modalEl.focus();
    },
    undoLockFocus() {
      unbindFocusTrap(this.$refs.modalEl);
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    },
    preventBackgroundScrolling() {
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    },
    enableBackgroundScrolling() {
      document.body.style.overflow = 'visible';
      document.body.style.width = 'auto';
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
  overflow: auto;
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
  display: grid;
  grid-template-columns: 30px auto 30px;
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
  grid-column: 2;
  grid-row: 1;
}
.modal__close {
  padding: 0em;
  grid-column: 3;
  grid-row: 1;
  align-self: flex-start;
  border: 0;
  background-color: transparent;
}
.modal__close:hover {
  color: var(--blue-60);
}
</style>
