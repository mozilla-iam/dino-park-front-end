<template>
  <RouterView />
</template>

<script>
import { mapGetters } from 'vuex';
import store, { fetchProfile } from '@/store';

export default {
  name: 'AccessGroups',
  computed: {
    ...mapGetters({
      loading: 'getLoading',
    }),
    showAccessGroup() {
      return this.accessGroup;
    },
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.scope.isReady) {
      const { groupname } = to.params;
      store.dispatch('setLoading');
      fetchProfile(store, groupname)
        .then(() => {
          store.dispatch('completeLoading');
          next();
        })
        .catch((error) => {
          console.error('Loading profile/invitations error: ', error.message);
          store.dispatch('completeLoading');
          next();
        });
    } else {
      next();
    }
  },
  data() {
    return {};
  },
};
</script>

<style></style>
