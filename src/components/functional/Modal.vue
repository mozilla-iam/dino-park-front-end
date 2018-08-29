<template>
  <div class="modal" v-if="isOpen">
    <div class="modal__content">
      <button @click="isOpen = false">Close</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  watch: {
    isOpen: function() {
      if (this.isOpen) {
        // lock body
        // trap focus
      }
      else {
        // return focus to last focused element
      }
    },
  },
  data() {
    return {
      isOpen: false
    }
  }
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
    transition: opacity .5s;
    z-index: 2;
  }
  .modal--off-screen {
    opacity: 0;
    position: absolute;
    left: -100%;
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