<template>
  <ApolloQuery
    :query="displayProfile"
    :variables="{ username }"
    clientId="mutationClient"
  >
    <template slot-scope="{ result: { loading, data, error } }">
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <template v-else-if="data && data.displayProfile !== null">
        <Profile
          v-bind="data.displayProfile"
          :manager="{ value: 'richard58' }"
          :directs="[]"
        ></Profile>
      </template>
      <template v-else-if="data && data.displayProfile === null">
        <main class="container">
          <Error>
            <template slot="image">
              <img
                src="@/assets/images/dino-1.png"
                srcset="
                  @/assets/images/dino-1@2x.png 2x,
                  @/assets/images/dino-1@3x.png 3x
                "
              />
            </template>
            <template slot="message">
              <h1 class="visually-hidden">Error</h1>
              <h2>This page isn't available</h2>
              <p>
                Sorry, the link you followed may be broken or the page may have
                been removed.
              </p>
              <RouterLink :to="{ name: 'Home' }" class="button"
                >Go to homepage</RouterLink
              >
              <p>
                <small
                  >Please submit all bugs or issues to the team’s
                  Discourse.</small
                >
              </p>
            </template>
          </Error>
        </main>
      </template>
      <LoadingSpinner v-else></LoadingSpinner>
    </template>
  </ApolloQuery>
</template>

<script>
import Error from '@/components/Error.vue';
import Profile from '@/components/Profile.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { DISPLAY_PROFILE } from '@/queries/profile';

export default {
  name: 'PageProfile',
  components: {
    Error,
    Profile,
    LoadingSpinner,
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
  },
  data() {
    return {
      displayProfile: DISPLAY_PROFILE,
    };
  },
};
</script>
