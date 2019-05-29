<script>
export default {
  mounted() {
    if (this.data.username === this.$route.params.username) {
      const e = document.getElementById(`${this.data.username}`);
      if (e) {
        // assume browsers with `scrollBehavior` support scrollIntoView
        // with object as arguments
        if ('scrollBehavior' in document.documentElement.style) {
          e.scrollIntoView({
            block: 'center',
          });
        } else {
          // scrolls into view with element at bottom of viewport (block: 'end')
          e.scrollIntoView(false);
        }
      }
      this.toggle(this.data.dinoId, true);
    }
    this.checkTrace();
  },
  methods: {
    checkTrace() {
      if (
        !this.isExpanded &&
        this.trace &&
        this.prefix &&
        this.trace.startsWith(`${this.prefix}-`)
      ) {
        this.toggle(this.data.dinoId, true);
      }
    },
  },
};
</script>

<style></style>
