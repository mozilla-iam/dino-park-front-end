<script>
export default {
  methods: {
    company(staffInformation, primaryEmail) {
      if (staffInformation && staffInformation.staff && primaryEmail) {
        if (primaryEmail.endsWith('mozillafoundation.org')) {
          return 'Mozilla Foundation';
        }
        return 'Mozilla Corporation';
      }
      return null;
    },
  },
};
</script>
