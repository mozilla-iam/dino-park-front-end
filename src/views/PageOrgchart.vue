<template>
  <main class="container org-chart">
    <div class="org-chart__chart">
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <Error v-else-if="error">
        <h2>{{ error.message }}</h2>
        <pre>{{ error }}</pre>
        <p>An error occured while trying to go to load the Orgchart</p>
      </Error>
      <OrgRoot v-else-if="tree" :roots="tree"></OrgRoot>
      <LoadingSpinner v-else></LoadingSpinner>
    </div>
    <ApolloQuery v-if="previewUserId" :query="previewProfileQuery" :variables="{ previewUserId }">
      <template slot-scope="{ result: { loading, data, error } }">
        <LoadingSpinner v-if="loading"></LoadingSpinner>
        <template v-else-if="error">
          <Error><h2>{{ error.message }}</h2>
            <pre>{{ error }}</pre>
            <p>An error occured while trying to view {{ previewUserId }}: </p></Error>
          </template>
        <template v-else-if="data">
          <ProfilePreview v-bind="data.profile"></ProfilePreview>
        </template>
        <LoadingSpinner v-else></LoadingSpinner>
      </template>
    </ApolloQuery>
  </main>
</template>

<script>
import Error from '@/components/Error.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import OrgRoot from '@/components/OrgRoot.vue';
import ProfilePreview from '@/components/ProfilePreview.vue';
import { PREVIEW_PROFILE } from '@/queries/profile';

export default {
  name: 'PageOrgchart',
  components: {
    Error,
    LoadingSpinner,
    OrgRoot,
    ProfilePreview,
  },
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      previewProfileQuery: PREVIEW_PROFILE,
    };
  },
  created() {
    this.fetchData();
    this.honourUriFragments();
  },
  computed: {
    previewUserId() {
      return this.$store.state.profilePreview.userId;
    },
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    async fetchData() {
      this.error = null;
      this.post = null;
      this.loading = true;
      try {
        const data = await fetch('/orgchart');
        const tree = await data.json();
        this.tree = tree;
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    },
    honourUriFragments() {
      if (window.location.hash) {
        this.$store.commit('updatePreviewProfileId', {
          newId: window.location.hash.substr(1),
          trigger: document.body,
        });
      }
    },
  },
};
</script>

<style>
  @media(min-width:50em) {
    .org-chart {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: start;
      grid-gap: 2em;
      width: 100%;
    }
      @media(min-height:32em) {
        .org-chart .profile-preview {
          position: fixed;
          top: 6em;
          max-width: 32em;
        }
      }
  }
</style>
