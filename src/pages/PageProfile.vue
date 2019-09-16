<template>
  <ApolloQuery
    :query="displayProfile"
    :variables="variables"
    clientId="mutationClient"
  >
    <template slot-scope="{ result: { loading, data, error } }">
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <template v-else-if="data && data.profile !== null">
        <Profile
          v-bind="data.profile"
          :manager="related.manager"
          :directs="related.directs"
          :editing="
            $route.name === 'Edit Profile' && $route.query.section
              ? $route.query.section
              : null
          "
        ></Profile>
      </template>
      <Page404 v-else-if="error || (data && data.profile === null)"></Page404>
      <LoadingSpinner v-else></LoadingSpinner>
    </template>
  </ApolloQuery>
</template>

<script>
import Error from '@/components/ui/Error.vue';
import Profile from '@/components/profile/Profile.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import { DISPLAY_PROFILE } from '@/queries/profile';
import Related from '@/assets/js/related';
import Page404 from './PageUnknown.vue';

export default {
  name: 'PageProfile',
  components: {
    Error,
    Profile,
    Page404,
    LoadingSpinner,
  },
  computed: {
    variables() {
      if (
        this.$route.params.username ===
        this.$store.state.user.primaryUsername.value
      ) {
        return { username: null };
      }
      return { username: this.$route.params.username || null };
    },
  },
  data() {
    return {
      displayProfile: DISPLAY_PROFILE,
      related: new Related(),
    };
  },
};
</script>
