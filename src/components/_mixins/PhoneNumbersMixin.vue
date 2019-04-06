<script>
export default {
  methods: {
    destructPhoneKey(key, index) {
      const [view = 'Mobile', num = index, contact = 'n'] = key.split('#');
      return { view, num, contact: contact === 'y' };
    },
    constructPhoneKey({ view, num, contact = false }) {
      return `${view}#${num}#${contact ? 'y' : 'n'}`;
    },
  },
};
</script>
