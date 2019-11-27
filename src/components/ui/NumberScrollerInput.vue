<template>
  <input class="number-scroller-input__value" type="number" />
</template>

<script>
export default {
  name: 'NumberScrollerInput',
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
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
