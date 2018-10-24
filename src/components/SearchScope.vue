<template>
  <form ref="searchScopeForm" class="search-scope" method="GET" :action="this.$router.resolve({ 
    name: 'Search', 
    query: {
      query: currentQuery,
      scope: scope,
    },
  }).href">
    <fieldset>
      <legend class="visually-hidden">Set search scope</legend>
      <input type="hidden" name="query" :value="currentQuery" />
      <label for="search-scope-all">All</label>
      <input id="search-scope-all" type="radio" name="scope" value="all" v-model="scope" >
      <label for="search-scope-staff">Staff</label>
      <input id="search-scope-staff" type="radio" name="scope" value="staff" v-model="scope">
      <label for="search-scope-contributors">Contributors</label>
      <input id="search-scope-contributors" type="radio" value="contributors" name="scope" v-model="scope">
    </fieldset>
    <input type="submit" value="Set scope" />
  </form>
</template>

<script>
export default {
  name: 'SearchScope',
  data() {
    return {
      scope: this.$route.query.scope || null,
    };
  },
  computed: {
    currentQuery() {
      return this.$route.query.query || null;
    },
  },
  watch: {
    scope() {
      this.$router.replace({
        name: 'Search',
        query: {
          query: this.currentQuery,
          scope: this.scope,
        }
      });
    },
  },
};
</script>

<style>
.search-scope {

}
</style>
