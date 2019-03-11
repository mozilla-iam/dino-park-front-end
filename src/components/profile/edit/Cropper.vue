<template>
  <div />
</template>

<script>
import crop from 'cropd';

const props = {
  src: String,
};

export default {
  name: 'Crop',
  props,
  mounted() {
    this.cropper = crop(this.$el, this.$props);
  },
  watch: Object.keys(props).reduce((obj, key) => {
    obj[key] = function watchKey() {
      this.cropper.$destroy();
      this.cropper = crop(this.$el, this.$props);
    };
    return obj;
  }, {}),
};
</script>
