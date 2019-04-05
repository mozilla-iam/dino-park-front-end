<template>
  <ul class="search-result-list">
    <SearchResult
      v-for="(result, index) in results.dinos"
      :key="index"
      v-bind="result"
    ></SearchResult>
  </ul>
</template>

<script>
import SearchResult from './SearchResult.vue';

export default {
  name: 'SearchResultList',
  props: {
    results: Object,
  },
  components: {
    SearchResult,
  },
};
</script>

<style>
.search-result-list {
  padding: 0;
  margin: 0 -1em;
}
@media (min-width: 57.5em) {
  .search-result-list {
    margin: 0;
  }
}
.search-result-list li {
  list-style: none;
}
</style>
