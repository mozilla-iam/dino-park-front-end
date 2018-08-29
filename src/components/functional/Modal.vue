<template>
  <transition name="modal-">
    <div class="modal" v-if="isOpen">
      <div class="modal__content">
        <button @click="isOpen = false">Close</button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  watch: {
    isOpen() {
      if (this.isOpen) {
        // @todo lock body
        // @todo trap focus
      } else {
        // @todo return focus to last focused element
      }
    },
  },
  data() {
    return {
      isOpen: false,
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
