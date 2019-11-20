<script>
export default {
  computed: {
    tosUrl() {
      if (this.$route.path) {
        let tosPath = '/tos';
        if (this.$route.path.charAt(this.$route.path.length - 1) === '/') {
          tosPath = 'tos';
        }
        return `${this.$route.path}${tosPath}`;
      }
      return '';
    },
  },
  data() {
    return {
      globalLinks: {
        feedback: 'https://github.com/mozilla-iam/dino-park-issues/issues',
        profilePrivacyNda: 'https://discourse.mozilla.org/t/37906',
        profilePrivacyPublic: 'https://discourse.mozilla.org/t/50443',
        groupsAnnouncement:
          'https://discourse.mozilla.org/t/mozilla-people-directory-what-s-new/46994',
        ldapContributorsAnnouncement: 'https://discourse.mozilla.org/t/50448',
        participationGuidelines:
          'https://www.mozilla.org/en-US/about/governance/policies/participation/',
        faqNda: 'https://discourse.mozilla.org/t/dinopark-faq/33564',
        faqPublic: 'https://discourse.mozilla.org/t/50444',
        githubIssues: 'https://github.com/mozilla-iam/dino-park-issues',
        legal: 'https://www.mozilla.org/en-US/legal',
        privacy: 'https://www.mozilla.org/en-US/privacy/',
        hrEmail: 'mailto:peopleops@mozilla.com',
      },
    };
  },
};
</script>
