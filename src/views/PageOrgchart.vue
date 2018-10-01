<template>
  <div class="orgchart">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div v-else-if="error" class="error">
      <Error>
        <h2>{{ error.message }}</h2>
        <pre>{{ error }}</pre>
        <p>An error occured while trying to go to load the Orgchart</p>
      </Error>
    </div>

    <div v-else-if="tree" class="content">
      <OrgRoot :roots="tree"></OrgRoot>
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
  </div>
</template>

<script>
import Error from '@/components/Error.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import OrgRoot from '@/components/OrgRoot.vue';

export default {
  name: 'PageOrgchart',
  components: {
    Error,
    LoadingSpinner,
    OrgRoot,
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
        const data = await fetch('/orgchart');
        const tree = await data.json();
        this.tree = tree;
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    },
  },
};
</script>
