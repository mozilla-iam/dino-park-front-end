<template>
  <Toggle
    id="search-who-form"
    :label="fluent('search_toggle')"
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
  </Toggle>
</template>

<script>
import Toggle from '@/components/ui/Toggle.vue';

export default {
  name: 'SearchToggle',
  components: {
    Toggle,
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
          label: this.fluent('search_toggle', 'all'),
          value: 'all',
        },
        {
          id: 'search-who-staff',
          label: this.fluent('search_toggle', 'staff'),
          value: 'staff',
        },
        {
          id: 'search-who-contributors',
          label: this.fluent('search_toggle', 'contributors'),
          value: 'contributors',
        },
      ],
    };
  },
};
</script>
