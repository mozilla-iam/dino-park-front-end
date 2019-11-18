<script>
export default {
  computed: {
    tosUrl() {
      if (this.$route.path) {
        return `${this.$route.path}/tos`;
      }
      return '';
    },
  },
  data() {
    return {
      globalLinks: {
        feedback: 'https://github.com/mozilla-iam/dino-park-issues/issues',
        profilePrivacy: 'https://discourse.mozilla.org/t/37906',
        groupsAnnouncement:
          'https://discourse.mozilla.org/t/mozilla-people-directory-what-s-new/46994',
        participationGuidelines:
          'https://www.mozilla.org/en-US/about/governance/policies/participation/',
        faq: 'https://discourse.mozilla.org/t/dinopark-faq/33564',
        githubIssues: 'https://github.com/mozilla-iam/dino-park-issues',
        legal: 'https://www.mozilla.org/en-US/legal',
        privacy: 'https://www.mozilla.org/en-US/privacy/',
      },
    };
  },
};
</script>
