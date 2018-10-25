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
      <div class="search-scope__choices">
        <input id="search-scope-all" type="radio" name="scope" value="all" v-model="scope" >
        <label for="search-scope-all">All</label>
        <input id="search-scope-staff" type="radio" name="scope" value="staff" v-model="scope">
        <label for="search-scope-staff">Staff</label>
        <input id="search-scope-contributors" type="radio" value="contributors" name="scope" v-model="scope">
        <label for="search-scope-contributors">Contributors</label>
      </div>
    </fieldset>
    <input type="submit" value="Set scope" class="visually-hidden" />
  </form>
</template>

- Got far in building this new SearchScope component that lets user pick between 'scopes' that then get added to the router's query parameter.
- lots of sync with Florian on that, because it ties into what we want to do with filters
- some sync with megan, received test template for user tests at mozfest
- made slides
- synced with roxana on testing

- finish searchscope in time for sprint review
- update my slides, Megan willl read

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
.search-scope fieldset {
  border: 0;
}
.search-scope__choices {
  display: flex;
  justify-content: center;
  margin-right: -1px; /* to mitigate hack to not have double borders */
}
  .search-scope__choices input {
    position: absolute;
    opacity: 0;
  }
  .search-scope__choices label {
    background-color: var(--white);
    padding: .75em 1em;
    border: 1px solid var(--blue-60);
    margin-left: -1px; /* hack to not have double borders */
  }
  .search-scope__choices input:checked + label {
    background-color: var(--blue-60);
    color: var(--white);
  }
  .search-scope__choices label:first-of-type {
    border-radius: 2em 0em 0 2em;
    padding-left: 1.5em;
  }
  .search-scope__choices label:last-of-type {
    border-radius: 0 2em 2em 0;
    padding-right: 1.5em;
  }
</style>
