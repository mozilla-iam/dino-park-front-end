<template>
  <main class="search-results" ref="searchResultsContainer" tabindex="-1">
    <h1 class="visually-hidden">Search results</h1>
    <SearchToggle />
    <template v-if="!this.$route.query.query">
      <p>You have not searched.</p>
    </template>
    <LoadingSpinner v-else-if="loading && !more"></LoadingSpinner>
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
      <SearchResultList :dinos="results.dinos"></SearchResultList>
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <Button
        v-else-if="results.dinos.length < results.total"
        class="search-results__button-more"
        @click="fetchMore"
        >more</Button
      >
    </template>
  </main>
</template>

<script>
import Error from '@/components/ui/Error.vue';
import Button from '@/components/ui/Button.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import SearchResultList from '@/components/search/SearchResultList.vue';
import SearchToggle from '@/components/search/SearchToggle.vue';
import Fetcher from '@/assets/js/fetcher';

const fetcher = new Fetcher({ failoverOn: [302] });

export default {
  name: 'PageSearchResult',
  components: {
    Button,
    Error,
    LoadingSpinner,
    SearchResultList,
    SearchToggle,
  },
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      more: false,
      results: { dinos: [], total: 0, next: null },
    };
  },
  created() {
    this.fetchNew();
  },
  watch: {
    $route: 'fetchNew',
  },
  methods: {
    async fetchNew() {
      this.loading = true;
      const results = await this.fetchData();
      this.results = results;
      this.loading = false;
    },
    async fetchMore() {
      this.loading = true;
      const results = await this.fetchData(true);
      this.results.dinos.push(...results.dinos);
      this.results.next = results.next;
      this.loading = false;
    },
    async fetchData(more = false) {
      this.more = more;
      this.error = null;
      this.post = null;
      try {
        const params = new URLSearchParams([
          ['q', this.$route.query.query],
          ['w', this.$route.query.who],
        ]);
        if (more) {
          params.append('a', this.results.next);
        }
        const data = await fetcher.fetch(
          `/api/v4/search/simple/?${params.toString()}`,
        );
        const results = await data.json();
        return results;
      } catch (e) {
        if (e instanceof TypeError && e.message.startsWith('NetworkError')) {
          window.location.reload();
        }
        this.error = e;
      }
      return { dinos: [], total: 0, next: null };
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
  display: flex;
  flex-direction: column;
}
.search-results__button-more {
  margin: auto;
}
</style>
