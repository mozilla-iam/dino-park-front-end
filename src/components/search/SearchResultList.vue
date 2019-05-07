<template>
  <ul class="search-result-list">
    <SearchResult
      v-for="(dino, index) in dinos"
      :key="index"
      v-bind="dino"
    ></SearchResult>
  </ul>
</template>

<script>
import SearchResult from './SearchResult.vue';

export default {
  name: 'SearchResultList',
  props: {
    dinos: Array,
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
