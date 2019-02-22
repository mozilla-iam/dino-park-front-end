<template>
  <img v-bind="$props" />
</template>

<script>
import crop from './index';

export default {
  name: 'Crop',
  mounted() {
    crop(this.$el);
  },
};
</script>
