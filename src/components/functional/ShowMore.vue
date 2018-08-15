<template>
  <div class="show-more">
    <slot name="base">
    </slot>
    <div class="show-more__more" v-if="expanded" tabindex="0">
      <slot name="more">
      </slot>
    </div>
    <button type="button" :aria-expanded="expanded ? 'true' : 'false'" v-on:click="toggleOverflow">{{ expanded ? alternateButtonText : buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'ShowMore',
  props: {
    buttonText: String,
    alternateButtonText: String,
  },
  methods: {
    toggleOverflow() {
      this.expanded = !this.expanded;
    },
  },
  updated() {;
    const el = this.$el.querySelector('.show-more__more');

    if (this.expanded) {
      el.focus();
    } 
  },
  data() {
    return {
      expanded: '',
    };
  },
};
</script>

