<template>
  <main class="container">
    <h1 class="visually-hidden">Search results</h1>
    <SearchScope/>
    <template v-if="!this.$route.query.query">
      <p>You have not searched.</p>
    </template>
    <LoadingSpinner v-else-if="loading"></LoadingSpinner>
    <Error v-else-if="error">
      <h2>{{ error.message }}</h2>
      <pre>{{ error }}</pre>
      <p>An error occured while trying to go to load the search results</p>
    </Error>
    <template v-else-if="this.$route.query.query && results">
      <p>{{ results.total }} results for <strong>{{ this.$route.query.query }}</strong></p>
      <SearchResultList :results="results"></SearchResultList>
    </template>
  </main>
</template>

<script>
import Error from '@/components/Error.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SearchResultList from '@/components/SearchResultList.vue';
import SearchScope from '@/components/SearchScope.vue';

export default {
  name: 'PageSearchResult',
  components: {
    Error,
    LoadingSpinner,
    SearchResultList,
    SearchScope,
  },
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.error = null;
      this.post = null;
      this.loading = true;
      try {
        const data = await fetch(`/api/v3/search/simple/${this.$route.query.query}`);
        const results = await data.json();
        this.results = results;
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>
