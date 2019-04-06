<script>
export default {
  methods: {
    destructKey(key, index) {
      const [view = 'Mobile', num = index, contact = 'n'] = key.split('#');
      return { view, num, contact: contact === 'y' };
    },
    constructKey({ view, num, contact = false }) {
      return `${view}#${num}#${contact ? 'y' : 'n'}`;
    },
  },
};
</script>
