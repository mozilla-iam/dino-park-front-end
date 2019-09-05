<script>
const ENABLED_ACCOUNTS = ['SLACK', 'ZOOM', 'DISCOURSE', 'IRC'];
const EXTERNAL_ACCOUNTS = {
  AIM: { moz: false, text: 'AIM', icon: 'aim' },
  BITBUCKET: { moz: false, text: 'Bitbucket', icon: 'bitbucket' },
  BMO: { moz: true, text: 'Bugzilla (BMO)', icon: 'bmo' },
  DISCORD: { moz: false, text: 'Discord', icon: 'discord' },
  FACEBOOK: { moz: false, text: 'Facebook', icon: 'facebook' },
  LANYRD: { moz: false, text: 'Lanyrd', icon: 'lanyrd' },
  LINKEDIN: { moz: false, text: 'LinkedIn', icon: 'linkedin' },
  MDN: { moz: true, text: 'MDN', icon: 'mdn' },
  MASTODON: { moz: false, text: 'Mastodon', icon: 'mastodon' },
  AMO: { moz: true, text: 'Mozilla Add-ons', icon: 'amo' },
  DISCOURSE: {
    moz: true,
    text: 'Mozilla Discourse',
    icon: 'discourse',
    uri: 'https://discourse.mozilla.org/u/@@@',
  },
  MOZPHAB: { moz: true, text: 'Mozilla Phabricator', icon: 'mozphab' },
  MOZILLAPONTOON: {
    moz: true,
    text: 'Mozilla Pontoon',
    icon: 'mozillapontoon',
  },
  REMO: { moz: true, text: 'Mozilla Reps', icon: 'remo' },
  SUMO: { moz: true, text: 'Mozilla Support', icon: 'sumo' },
  WEBMAKER: { moz: true, text: 'Mozilla Webmaker', icon: 'webmaker' },
  MOZILLAWIKI: { moz: true, text: 'Mozilla Wiki', icon: 'mozillawiki' },
  'Phone (Landline)': {
    moz: false,
    text: 'Phone (Landline)',
    icon: 'phone (landline)',
  },
  'Phone (Mobile)': {
    moz: false,
    text: 'Phone (Mobile)',
    icon: 'phone (mobile)',
  },
  SKYPE: { moz: false, text: 'Skype', icon: 'skype' },
  SLIDESHARE: { moz: false, text: 'SlideShare', icon: 'slideshare' },
  TELEGRAM: { moz: false, text: 'Telegram', icon: 'telegram' },
  TRANSIFEX: { moz: false, text: 'Transifex', icon: 'transifex' },
  TWITTER: {
    moz: false,
    text: 'Twitter',
    icon: 'twitter',
    uri: 'https://twitter.com/@@@',
  },
  WEBSITE: { moz: false, text: 'Website URL', icon: 'website' },
  JABBER: { moz: false, text: 'XMPP/Jabber', icon: 'jabber' },
  YAHOO: { moz: false, text: 'Yahoo! Messenger', icon: 'yahoo' },
  IRC: { moz: true, text: 'IRC', icon: 'irc' },
  SLACK: { moz: true, text: 'Mozilla Slack', icon: 'slack' },
  ZOOM: {
    moz: true,
    text: 'Mozilla Zoom',
    icon: 'zoom',
    placeholder: 'Your Personal Meeting ID',
    uri: 'https://mozilla.zoom.us/j/@@@',
  },
};

export default {
  methods: {
    account([key, value]) {
      const { moz, text, icon, placeholder } = EXTERNAL_ACCOUNTS[key] || {};
      let { uri } = EXTERNAL_ACCOUNTS[key] || { uri: null };

      if (uri) {
        uri = uri.replace(/@@@/g, value);
      }

      if (text && icon && typeof moz === 'boolean') {
        return {
          moz,
          text,
          icon,
          placeholder,
          value,
          uri,
        };
      }
      return null;
    },
    isAccountKey(key) {
      return (key && key.startsWith('EA#')) || false;
    },
    isAccountUri(key) {
      return (key && key.startsWith('EA-URI#')) || false;
    },
    destructUriKey(key) {
      const [typ, name, contact = 'n'] = key.split('#');
      return { typ, name, contact: contact === 'y' };
    },
    constructUriKey({ typ = 'EA', name, contact = false }) {
      return `${typ}#${name}#${contact ? 'y' : 'n'}`;
    },
  },
  data() {
    return {
      availableAccounts: ENABLED_ACCOUNTS.filter(
        (account) => account in EXTERNAL_ACCOUNTS,
      ),
      EXTERNAL_ACCOUNTS,
    };
  },
};
</script>
