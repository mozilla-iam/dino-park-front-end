<script>
const OFFICES = {
  BER: 'Berlin+Office+Floor+plan+-+BER',
  LON: 'London+Office+Floor+plan+-+LON',
  MTV: 'Mountain+View+Office+Floor+plans+-+MTV',
  PAR: 'Paris+Office+Floor+plans+-+PAR',
  PDX: 'Portland+Office+Floor+plan+-+PDX',
  SFO: 'San+Francisco+Office+Floor+plans+-+SFO',
  TPE: 'Taipei+Office+Floor+plan+-+TPE',
  TOR: 'Toronto+Office+Floor+plan-+TOR',
  VVR: 'Vancouver+Office+Floor+plan+-+YVR',
};

export default {
  methods: {
    deskNumberToOfficePlanLink(deskNumber) {
      if (typeof deskNumber === 'string') {
        const handle = deskNumber.startsWith('MV')
          ? 'MTV'
          : deskNumber.slice(0, 3);
        const name = handle && OFFICES[handle];
        if (name) {
          return `https://mana.mozilla.org/wiki/display/WPR/${name}`;
        }
      }
      return null;
    },
  },
};
</script>
