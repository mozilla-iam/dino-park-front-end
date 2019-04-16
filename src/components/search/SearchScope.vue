<template>
  <Scope
    id="search-who-form"
    label="Set who to search for"
    :action="
      this.$router.resolve({
        name: 'Search',
        query: {
          query: currentQuery,
          who: who,
        },
      }).href
    "
    :choices="choices"
    name="who"
    v-model="who"
  >
    <input type="hidden" name="query" :value="currentQuery" />
  </Scope>
</template>

<script>
import Scope from '@/components/ui/Scope.vue';

export default {
  name: 'SearchScope',
  components: {
    Scope,
  },
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
  data() {
    return {
      choices: [
        {
          id: 'search-who-all',
          label: 'All',
          value: 'all',
        },
        {
          id: 'search-who-staff',
          label: 'Staff',
          value: 'staff',
        },
        {
          id: 'search-who-contributors',
          label: 'Contributors',
          value: 'contributors',
        },
      ],
    };
  },
};
</script>
