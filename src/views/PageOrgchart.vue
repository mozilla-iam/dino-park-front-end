<template>
  <main class="container org-chart">
    <div class="org-chart__chart">
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <Error v-else-if="error">
        <h2>{{ error.message }}</h2>
        <pre>{{ error }}</pre>
        <p>An error occured while trying to go to load the org chart.</p>
      </Error>
      <OrgRoot v-if="tree && !loading" :roots="tree" :trace="trace || ''"></OrgRoot>
      <OrgRoot v-if="loose && !loading" :roots="loose" :trace="looseTrace || ''" heading="People who need their manager set" modifier="org-root--loose"></OrgRoot>
      <LoadingSpinner v-else></LoadingSpinner>
    </div>
    <ApolloQuery v-if="username" :query="previewProfileQuery" :variables="{ username }" :tag="null">
      <template slot-scope="{ result: { loading, data, error } }">
        <div class="org-chart__preview">
          <LoadingSpinner v-if="loading"></LoadingSpinner>
          <template v-else-if="error">
            <Error>
              <h2>{{ error.message }}</h2>
              <pre>{{ error }}</pre>
              <p>An error occured while trying to view {{ previewUserId }}: </p>
            </Error>
          </template>
          <template v-else-if="data">
            <ProfilePreview v-if="desktopView" v-bind="data.profile"></ProfilePreview>
            <Modal v-else :initiallyOpen="true" :closeButton="false" ref="modalEl">
              <ProfilePreview v-bind="data.profile"></ProfilePreview>
            </Modal>
          </template>
          <LoadingSpinner v-else></LoadingSpinner>
        </div>
      </template>
    </ApolloQuery>
  </main>
</template>

<script>
import Error from '@/components/Error.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import OrgRoot from '@/components/OrgRoot.vue';
import Modal from '@/components/functional/Modal.vue';
import ProfilePreview from '@/components/ProfilePreview.vue';
import { PREVIEW_PROFILE } from '@/queries/profile';

export default {
  name: 'PageOrgchart',
  components: {
    Error,
    LoadingSpinner,
    Modal,
    OrgRoot,
    ProfilePreview,
  },
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      tree: [],
      loose: [],
      trace: '',
      looseTrace: '',
      previewProfileQuery: PREVIEW_PROFILE,
    };
  },
  created() {
    this.fetchData();
    window.addEventListener('resize', this.updateView);
    this.updateView();
  },
  async updated() {
    const { username } = this.$route.params;
    if (username && this.$route.name === 'OrgchartHighlight') {
      try {
        const data = await fetch(`/api/v3/orgchart/trace/${username}`);
        const { trace } = await data.json();
        if (trace.startsWith('-1-')) {
          this.looseTrace = trace.substr(3);
          this.trace = '';
        } else {
          this.looseTrace = '';
          this.trace = trace;
        }
      } catch (e) {
        this.error = e;
      }
    } else {
      this.trace = '';
    }
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    desktopView() {
      return this.$store.state.profilePreview.desktopView;
    },
  },
  watch: {
    desktopView: function toggleModal() {
      if (this.modalEl && this.desktopView === true) {
        this.modalEl.isOpen = true;
      }
    },
  },
  methods: {
    async fetchData() {
      this.error = null;
      this.post = null;
      this.loading = true;
      try {
        const data = await fetch('/api/v3/orgchart');
        const orgchart = await data.json();
        this.tree = orgchart.forrest;
        this.loose = orgchart.loose;
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    },
    updateView() {
      if (matchMedia('(min-width: 57.5em)').matches) {
        if (this.$store.state.profilePreview.desktopView !== true) {
          this.$store.commit('toggleProfilePreviewDesktopView', {
            desktopView: true,
          });
        }
      } else if (this.$store.state.profilePreview.desktopView !== false) {
        this.$store.commit('toggleProfilePreviewDesktopView', {
          desktopView: false,
        });
      }
    },
  },
};
</script>

<style>
.org-chart {
  padding: 0;
  width: 100%;
}
@media (min-width: 57.5em) {
  .org-chart {
    padding: 2em;
    display: grid;
    grid-template-columns: minmax(25em, 45em) auto;
    grid-template-rows: auto 1fr;
    align-items: start;
    grid-gap: 2em;
    max-width: 82em;
    margin: 0 auto;
    width: auto;
  }
  .org-chart::after /* so that there is space taken up underneath the preview, that is as much as the org chart column takes up in total. This lets us use position:sticky on the profile preview */ {
    content: "";
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  .org-chart__chart {
    grid-row: 1 / 3;
  }
  .org-chart__preview {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
}
@media (min-height: 36em) and (min-width: 57.5em) {
  .org-chart__preview {
    position: sticky;
    top: 6em;
  }
}
</style>
