<template>
  <ApolloQuery
    :query="displayProfile"
    :variables="variables"
    :fetchPolicy="viewAs.filter ? 'no-cache' : 'cache-first'"
    clientId="mutationClient"
  >
    <template slot-scope="{ result: { loading, data, error } }">
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <template v-else-if="data && data.profile !== null">
        <PreviewAs v-if="showPreviewAs" :viewAsFilter="viewAs"></PreviewAs>
        <Profile
          v-bind="data.profile"
          :manager="related.manager"
          :directs="related.directs"
          :editing="editing"
          :viewAs="variables.viewAsActive"
        ></Profile>
      </template>
      <Page404 v-else-if="error || (data && data.profile === null)"></Page404>
      <LoadingSpinner v-else></LoadingSpinner>
    </template>
  </ApolloQuery>
</template>

<script>
import EnvironmentMixin from '@/components/_mixins/EnvironmentMixin.vue';
import Error from '@/components/ui/Error.vue';
import Profile from '@/components/profile/Profile.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import { DISPLAY_PROFILE } from '@/queries/profile';
import Related from '@/assets/js/related';
import Page404 from './PageUnknown.vue';
import PreviewAs from '@/components/profile/PreviewAs.vue';

export default {
  name: 'PageProfile',
  components: {
    Error,
    Profile,
    Page404,
    PreviewAs,
    LoadingSpinner,
  },
  mixins: [EnvironmentMixin],
  computed: {
    variables() {
      if (
        this.$route.params.username ===
        this.$store.state.user.primaryUsername.value
      ) {
        return {
          username: null,
          viewAs: this.viewAs.filter || null,
          viewAsActive: this.viewAs.active,
        };
      }
      return {
        username: this.$route.params.username || null,
        viewAs: null,
        viewAsActive: false,
      };
    },
    editing() {
      if (this.$route.name === 'Edit Profile' && this.$route.query.section) {
        return this.$route.query.section;
      }
      return null;
    },
    showPreviewAs() {
      return (
        !this.prodEnv &&
        this.variables.username === null &&
        this.editing === null
      );
    },
  },
  data() {
    return {
      displayProfile: DISPLAY_PROFILE,
      related: new Related(),
      viewAs: { filter: null, active: false },
    };
  },
};
</script>
