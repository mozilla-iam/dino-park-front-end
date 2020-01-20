<script>
export default {
  methods: {
    destructPhoneKey(key, index) {
      const [view = 'Mobile', num = index, contact = 'n'] = key.split('#');
      return { view, num, contact: contact === 'y' };
    },
    constructPhoneKey({ view = 'Mobile', num, contact = false }) {
      return `${view}#${num}#${contact ? 'y' : 'n'}`;
    },
    getTranslatedLabel(label) {
      if (this.allOptions().includes(label)) {
        return this.fluent('profile_phone', label.toLowerCase());
      }
      return label;
    },
    allOptions() {
      return ['Primary', 'Personal', 'Work', 'Home', 'Mobile'];
    },
  },
};
</script>
