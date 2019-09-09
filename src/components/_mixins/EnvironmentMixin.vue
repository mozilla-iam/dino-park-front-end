<script>
const PROD_HOSTNAME = 'people.mozilla.org';
const prodEnv = window.location.hostname === PROD_HOSTNAME;

export default {
  data() {
    return {
      prodEnv,
    };
  },
};
</script>
