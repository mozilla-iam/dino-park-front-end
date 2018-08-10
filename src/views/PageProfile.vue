<template>
  <ApolloQuery :query="profileQuery">
    <template slot-scope="{ result: { loading, data, error } }">
      <template v-if="loading">Loading...</template>
      <template v-else-if="error">An error occured</template>
      <template v-else-if="data">
        <Profile v-bind="data.profiles[0]"></Profile>
      </template>
      <template v-else>No result :(</template>
    </template>
  </ApolloQuery>
</template>

<script>
import Profile from '@/components/Profile.vue';
import { PROFILE_QUERY } from '@/queries/profile';

export default {
  name: 'PageProfile',
  components: {
    Profile,
  },
  data() {
    return {
      profileQuery: PROFILE_QUERY,
    };
  },
};
</script>
