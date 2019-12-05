<template>
  <input
    class="number-scroller-input__value"
    type="number"
    v-model="scrollValue"
    @change="onUpdate"
  />
</template>

<script>
export default {
  name: 'NumberScrollerInput',
  props: {
    value: Number,
  },
  mounted() {},
  data() {
    return {
      scrollValue: this.value,
    };
  },
  methods: {
    onUpdate(e) {
      this.$emit('value', this.scrollValue);
    },
  },
  computed: {},
};
</script>

<style>
.number-scroller-input {
}

.number-scroller-input__value {
  background: var(--gray-20);
  border: none;
  border-radius: var(--formElementRadius);
  width: 8em;
  height: 1.5em;
  padding: 0.5em 1em;
  font-size: 1em;
  line-height: 1em;
  box-sizing: content-box;
}
</style>
