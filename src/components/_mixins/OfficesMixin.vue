<script>
const OFFICES = [
  'BER',
  'PAR',
  'PDX',
  'SF',
  'TOR',
];

export default {
  methods: {
    deskNumberToOfficePlanLink(deskNumber) {
      if (typeof deskNumber === 'string') {
        if (OFFICES.some(office => deskNumber.startsWith(office))) {
          return 'https://mana.mozilla.org/wiki/display/WPR/MozSpaces+Floor+Plans';
        }
      }
      return null;
    },
  },
};
</script>
