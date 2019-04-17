<template>
  <main
    class="container search-results"
    ref="searchResultsContainer"
    tabindex="-1"
  >
    <h1 class="visually-hidden">Search results</h1>
    <SearchScope />
    <template v-if="!this.$route.query.query">
      <p>You have not searched.</p>
    </template>
    <LoadingSpinner v-else-if="loading"></LoadingSpinner>
    <Error v-else-if="error">
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
        <p>An error occured while trying to load the search results</p>
        <p>
          <small
            >Please submit all bugs or issues to the project's GitHub issue
            repository (link in footer).</small
          >
        </p>
      </template>
    </Error>
    <template
      v-else-if="this.$route.query.query && results && results.total === 0"
    >
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
          <h2>
            No results found for <strong>{{ this.$route.query.query }}</strong>
          </h2>
          <p>Some suggestions include:</p>
          <ul>
            <li>Make sure that all words are spelled correctly.</li>
            <li>Try using different keywords or more general keywords.</li>
            <li>Try fewer keywords.</li>
          </ul>
        </template>
      </Error>
    </template>
    <template v-else-if="this.$route.query.query && results">
      <p>
        {{ results.total }} results for
        <strong>{{ this.$route.query.query }}</strong>
      </p>
      <SearchResultList :results="results"></SearchResultList>
    </template>
  </main>
</template>

<script>
import Error from '@/components/ui/Error.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import SearchResultList from '@/components/search/SearchResultList.vue';
import SearchScope from '@/components/search/SearchScope.vue';
import Fetcher from '@/assets/js/api';

const fetcher = new Fetcher({ failoverOn: [302] });

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
  watch: {
    $route: 'fetchData',
  },
  methods: {
    async fetchData() {
      this.error = null;
      this.post = null;
      this.loading = true;
      try {
        const params = new URLSearchParams([
          ['q', this.$route.query.query],
          ['w', this.$route.query.who],
        ]);
        const data = await fetcher.fetch(
          `/api/v4/search/simple/?${params.toString()}`,
        );
        const results = await data.json();
        this.results = results;
      } catch (e) {
        if (e instanceof TypeError && e.message.startsWith('NetworkError')) {
          window.location.reload();
          return;
        }
        this.error = e;
      }
      this.loading = false;
    },
  },
  updated() {
    if (this.$refs.searchResultsContainer) {
      this.$refs.searchResultsContainer.focus();
    }
  },
};
</script>

<style>
.search-results {
  padding-top: 1em;
  align-self: start;
}
</style>
