<template>
  <main class="search-results" ref="searchResultsContainer" tabindex="-1">
    <h1 class="visually-hidden">{{ fluent('search_results') }}</h1>
    <SearchToggle />
    <template v-if="!this.$route.query.query">
      <p>{{ fluent('search_none') }}</p>
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
        <h1 class="visually-hidden">{{ fluent('error') }}</h1>
        <h2>{{ fluent('error_404') }}</h2>
        <p>{{ fluent('search_error') }}</p>
        <p>
          <small>
            <Fluent
              id="error_issues"
              :tags="{
                github: { tag: 'a', href: globalLinks.githubIssues },
              }"
            />
          </small>
        </p>
      </template>
    </Error>
    <template
      v-else-if="this.$route.query.query && results && results.total === 0"
    >
      <Error>
        <template slot="image">
          <img
            src="@/assets/images/target.png"
            srcset="
              @/assets/images/target@2x.png 2x,
              @/assets/images/target@3x.png 3x
            "
          />
        </template>
        <template slot="message">
          <h1 class="visually-hidden">{{ fluent('error') }}</h1>
          <h2>
            <Fluent
              id="search_no-results"
              :args="{ query: this.$route.query.query }"
            />
          </h2>
          <p>{{ fluent('search_suggestions') }}</p>
          <ul>
            <li>{{ fluent('search_suggestions', 'spelling') }}</li>
            <li>{{ fluent('search_suggestions', 'different') }}</li>
            <li>{{ fluent('search_suggestions', 'fewer') }}</li>
          </ul>
        </template>
      </Error>
    </template>
    <template v-else-if="this.$route.query.query && results">
      <p>
        <Fluent
          id="search_results"
          attr="total"
          :args="{
            total: results.total,
            query: this.$route.query.query,
          }"
        />
      </p>
      <SearchResultList :dinos="results.dinos"></SearchResultList>
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <Button
        v-else-if="results.dinos.length < results.total"
        type="button"
        class="search-results__button-more button button--text-only button--icon-only"
        @click="fetchMore"
      >
        <Icon id="chevron-down" :width="24" :height="24" />
        <span>{{ fluent('search_results', 'more') }}</span>
      </Button>
    </template>
  </main>
</template>

<script>
import Error from '@/components/ui/Error.vue';
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import SearchResultList from '@/components/search/SearchResultList.vue';
import SearchToggle from '@/components/search/SearchToggle.vue';
import Fetcher from '@/assets/js/fetcher';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

const fetcher = new Fetcher({
  isError: (e) =>
    e instanceof TypeError && e.message.startsWith('NetworkError'),
});

export default {
  name: 'PageSearchResult',
  mixins: [LinksMixin],
  components: {
    Icon,
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
        if (!results.error) {
          return results;
        }
      } catch (e) {
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
  border: none;
  font-size: 0.9em;
}
.search-results__button-more > svg {
  margin-right: 0.5em;
}
</style>
