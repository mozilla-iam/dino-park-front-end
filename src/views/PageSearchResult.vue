<template>
  <main class="container">
    <h1>Search results</h1>
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <Error v-else-if="error">
      <h2>{{ error.message }}</h2>
      <pre>{{ error }}</pre>
      <p>An error occured while trying to go to load the search results</p>
    </Error>
    <template v-else-if="this.$route.params.query && results">
      <p>{{ results.total }} results for <strong>{{ this.$route.params.query }}</strong></p>
      <SearchResultList :results="results"></SearchResultList>
    </template>
    <template v-else>
      <p>You have not searched.</p>
    </template>
    <LoadingSpinner v-else></LoadingSpinner>
  </main>
</template>

<script>
import Error from '@/components/Error.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SearchResultList from '@/components/SearchResultList.vue';

export default {
  name: 'PageSearchResult',
  components: {
    Error,
    LoadingSpinner,
    SearchResultList,
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
        const data = await fetch('http://localhost:8889/search/simple/public/' + this.$route.params.query);
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
