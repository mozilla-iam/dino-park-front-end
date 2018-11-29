<template>
  <ApolloQuery :query="profileQuery" :variables="{ username }">
    <template slot-scope="{ result: { loading, data, error } }">
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <template v-else-if="data">
        <Profile v-bind="data.profile"></Profile>
      </template>
      <LoadingSpinner v-else></LoadingSpinner>
    </template>
  </ApolloQuery>
</template>

<script>
import Profile from '@/components/Profile.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { PROFILE } from '@/queries/profile';

export default {
  name: 'PageProfile',
  components: {
    Profile,
    LoadingSpinner,
  },
  computed: {
    username() { return this.$route.params.username; },
  },
  data() {
    return {
      profileQuery: PROFILE,
    };
  },
};
</script>
