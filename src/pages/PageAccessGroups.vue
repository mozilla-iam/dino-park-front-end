<template>
  <RouterView />
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import store, { fetchProfile, resolvePromisesSerially } from '@/store';

export default {
  name: 'AccessGroups',
  components: { LoadingSpinner },
  computed: {
    ...mapGetters({
      loading: 'getLoading',
    }),
    showAccessGroup() {
      return this.accessGroup;
    },
  },
  beforeRouteEnter(to, from, next) {
    const { groupname } = to.params;
    store.dispatch('setLoading');
    const [profilePromises, profileResolvers] = fetchProfile(store, groupname);
    resolvePromisesSerially([...profilePromises], [...profileResolvers])
      .then((responseArray) => {
        store.dispatch('completeLoading');
        next();
      })
      .catch((error) => {
        console.error('Loading profile/invitations error: ', error.message);
        store.dispatch('completeLoading');
        next();
      });
  },
  data() {
    return {};
  },
};
</script>

<style></style>
