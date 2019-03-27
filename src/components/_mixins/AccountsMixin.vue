<script>
const EXTERNAL_ACCOUNTS = {
  'EA#AIM': { moz: false, text: 'AIM', icon: 'aim' },
  'EA#BITBUCKET': { moz: false, text: 'Bitbucket', icon: 'bitbucket' },
  'EA#BMO': { moz: true, text: 'Bugzilla (BMO)', icon: 'bmo' },
  'EA#DISCORD': { moz: false, text: 'Discord', icon: 'discord' },
  'EA#FACEBOOK': { moz: false, text: 'Facebook', icon: 'facebook' },
  'EA#LANYRD': { moz: false, text: 'Lanyrd', icon: 'lanyrd' },
  'EA#LINKEDIN': { moz: false, text: 'LinkedIn', icon: 'linkedin' },
  'EA#MDN': { moz: true, text: 'MDN', icon: 'mdn' },
  'EA#MASTODON': { moz: false, text: 'Mastodon', icon: 'mastodon' },
  'EA#AMO': { moz: true, text: 'Mozilla Add-ons', icon: 'amo' },
  'EA#DISCOURSE': { moz: true, text: 'Mozilla Discourse', icon: 'discourse' },
  'EA#MOZPHAB': { moz: true, text: 'Mozilla Phabricator', icon: 'mozphab' },
  'EA#MOZILLAPONTOON': {
    moz: true,
    text: 'Mozilla Pontoon',
    icon: 'mozillapontoon',
  },
  'EA#REMO': { moz: true, text: 'Mozilla Reps', icon: 'remo' },
  'EA#SUMO': { moz: true, text: 'Mozilla Support', icon: 'sumo' },
  'EA#WEBMAKER': { moz: true, text: 'Mozilla Webmaker', icon: 'webmaker' },
  'EA#MOZILLAWIKI': { moz: true, text: 'Mozilla Wiki', icon: 'mozillawiki' },
  'EA#Phone (Landline)': {
    moz: false,
    text: 'Phone (Landline)',
    icon: 'phone (landline)',
  },
  'EA#Phone (Mobile)': {
    moz: false,
    text: 'Phone (Mobile)',
    icon: 'phone (mobile)',
  },
  'EA#SKYPE': { moz: false, text: 'Skype', icon: 'skype' },
  'EA#SLIDESHARE': { moz: false, text: 'SlideShare', icon: 'slideshare' },
  'EA#TELEGRAM': { moz: false, text: 'Telegram', icon: 'telegram' },
  'EA#TRANSIFEX': { moz: false, text: 'Transifex', icon: 'transifex' },
  'EA#TWITTER': { moz: false, text: 'Twitter', icon: 'twitter' },
  'EA#WEBSITE': { moz: false, text: 'Website URL', icon: 'website' },
  'EA#JABBER': { moz: false, text: 'XMPP/Jabber', icon: 'jabber' },
  'EA#YAHOO': { moz: false, text: 'Yahoo! Messenger', icon: 'yahoo' },
};

export default {
  methods: {
    account([key, value]) {
      const { moz, text, icon } = EXTERNAL_ACCOUNTS[key] || {};
      if (text && icon && typeof moz === 'boolean') {
        return {
          moz,
          text,
          icon,
          value,
        };
      }
      return null;
    },
  },
  computed: {
    selectableAccounts() {
      const selectables = Object.entries(EXTERNAL_ACCOUNTS).map(([k, v]) => {
        return {
          label: v.text,
          value: k,
        };
      });

      return selectables;
    },
  },
};
</script>
