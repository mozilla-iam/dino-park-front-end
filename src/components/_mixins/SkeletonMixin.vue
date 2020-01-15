<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.nextSkeletonHeight = getComputedStyle(this.$el).getPropertyValue(
        'height',
      );
    });
  },
  updated() {
    this.$nextTick(() => {
      if (this.skeleton) {
        this.$el.style.height = this.nextSkeletonHeight;
      } else {
        this.$el.style.height = null;
        this.nextSkeletonHeight = getComputedStyle(this.$el).getPropertyValue(
          'height',
        );
      }
    });
  },
};
</script>
