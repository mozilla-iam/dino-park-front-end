<template>
  <form id="search-who-form" ref="searchScopeForm" class="search-who" method="GET" :action="this.$router.resolve({
    name: 'Search',
    query: {
      query: currentQuery,
      who:who
    },
  }).href">
    <fieldset>
      <legend class="visually-hidden">Set who to search for</legend>
      <input type="hidden" name="query" :value="currentQuery" />
      <div class="search-who__choices">
        <input id="search-who-all" type="radio" name="who" value="all" v-model="who">
        <label for="search-who-all">All</label>
        <input id="search-who-staff" type="radio" name="who" value="staff" v-model="who">
        <label for="search-who-staff">Staff</label>
        <input id="search-who-contributors" type="radio" value="contributors" name="who" v-model="who">
        <label for="search-who-contributors">Contributors</label>
      </div>
    </fieldset>
    <input type="submit" value="Set who to search for" class="visually-hidden" />
  </form>
</template>

<script>
export default {
  name: 'SearchScope',
  computed: {
    currentQuery() {
      return this.$route.query.query || null;
    },
    who: {
      get() {
        return this.$route.query.who || 'all';
      },
      set(w) {
        this.$router.replace({
          name: 'Search',
          query: {
            query: this.currentQuery,
            who: w,
          },
        });
      },
    },
  },
};
</script>

<style>
.search-who fieldset {
  border: 0;
  display: block;
  text-align: center;
}
.search-who__choices {
  display: inline-flex;
  justify-content: center;
  margin-right: -1px; /* to mitigate hack to not have double borders */
}
.search-who__choices:focus-within {
  outline: 1px solid var(--black);
}
  .search-who__choices input {
    position: absolute;
    opacity: 0;
  }
  .search-who__choices label {
    background-color: var(--white);
    padding: .75em 1em;
    color: var(--gray-60);
    border: 1px solid var(--gray-40);
    margin-left: -1px; /* hack to not have double borders */
    margin-right: -1px;
  }
  .search-who__choices input:checked + label {
    background-color: var(--blue-60);
    color: var(--white);
    border-color: var(--blue-60);
  }
  .search-who__choices label:first-of-type {
    border-radius: 2em 0em 0 2em;
    padding-left: 1.5em;
  }
  .search-who__choices label:last-of-type {
    border-radius: 0 2em 2em 0;
    padding-right: 1.5em;
  }
  .search-who + p {
    text-align: center;
  }
</style>
