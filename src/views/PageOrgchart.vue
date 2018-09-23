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
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    async fetchData() {
      this.error = null;
      this.post = null;
      this.loading = true;
      // replace `getPost` with your data fetching util / API wrapper
      try {
        const data = await fetch('/orgchart');
        console.log(data);
        const tree = await data.json();
        console.log(tree);
        this.tree = tree;
      } catch (e) {
        console.log(`DOOM ${e}`);
        this.error = e;
      }
      this.loading = false;
    },
  },
};
</script>
