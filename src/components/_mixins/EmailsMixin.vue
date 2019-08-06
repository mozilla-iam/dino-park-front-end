e<script>
export default {
  methods: {
    isEmailKey(key) {
      return (key && this.destructEmailKey(key) !== null) || false;
    },
    destructEmailKey(key, index) {
      const [
        prefix,
        view = 'Alternative',
        num = index,
        contact = 'n',
      ] = key.split('#');
      if (prefix !== 'EMAIL') {
        return null;
      }
      return { view, num, contact: contact === 'y' };
    },
    constructEmailKey({ view = 'Alternative', num, contact = false }) {
      return `EMAIL#${view}#${num}#${contact ? 'y' : 'n'}`;
    },
  },
};
</script>
