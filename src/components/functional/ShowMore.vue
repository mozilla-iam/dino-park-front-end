<template>
  <ul>
    <slot></slot>
    <button v-if="items > initial" type="button" v-on:click="toggleOverflow" v-bind="">{{ buttonText }}</button>
  </ul>
</template>

<script>
export default {
  name: 'ShowMore',
  props: {
    initial: Number,
    buttonText: String,
    items: Number,
  },
  computed: {
    overflowingItems: function() {
      return this.$children.slice(this.initial);  
    }
  },
  methods: {
    setUpOverflow: function() {
      this.overflowingItems.forEach(function(item){
        item.setAttribute('hidden','true');
      });
    },
    toggleOverflow: function(event) {
      this.overflowingItems.forEach(function(item){
        item.$el.getAttribute('hidden') === 'true' ? item.$el.removeAttribute('hidden') : item.$el.setAttribute('hidden','true');
      });
      event.target.
    }
  }
};
</script>

