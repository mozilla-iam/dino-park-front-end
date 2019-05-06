<template>
  <main class="org-chart-main">
    <div class="org-chart-buttons" v-if="!loading">
      <button
        type="button"
        @click="expand"
        class="org-chart-buttons__row-left org-chart-buttons__control button--icon-only button"
        title="Expand all"
      >
        <Icon id="expand" :width="18" :height="18" />
        <span class="visually-hidden">Expand all</span>
      </button>
      <button
        type="button"
        @click="collapse"
        class="org-chart-buttons__row-right org-chart-buttons__control button--icon-only button"
        title="Collapse all"
      >
        <Icon id="collapse" :width="18" :height="18" />
        <span class="visually-hidden">Collapse all</span>
      </button>
      <button
        type="button"
        @click="reset"
        class="org-chart-buttons__reset org-chart-buttons__control button--icon-only button"
        title="Reset to default view"
      >
        <Icon id="rotate" :width="18" :height="18" />
        <span class="visually-hidden">Reset to default view</span>
      </button>
    </div>
    <div class="org-chart">
      <div class="org-chart__chart">
        <OrgRoot
          v-if="tree && !loading"
          :roots="tree"
          :trace="trace || ''"
          :baseState="baseState"
        ></OrgRoot>
        <OrgRoot
          v-if="loose && loose.length > 0 && !loading"
          :roots="loose"
          :trace="looseTrace || ''"
          heading="People who do not have a manager set"
          modifier="org-root--loose"
        ></OrgRoot>
        <LoadingSpinner v-else></LoadingSpinner>
      </div>
      <ApolloQuery
        v-if="username && (desktopView || openedFromOrgNode)"
        :query="previewProfileQuery"
        :variables="{ username }"
        :tag="null"
      >
        <template slot-scope="{ result: { loading, data } }">
          <div class="org-chart__preview">
            <ProfilePreview
              v-if="data && desktopView"
              v-bind="data.profile"
            ></ProfilePreview>
            <Modal
              v-else-if="data"
              :initiallyOpen="true"
              :closeButton="false"
              ref="modalEl"
            >
              <ProfilePreview v-bind="data.profile"></ProfilePreview>
            </Modal>
            <LoadingSpinner v-else></LoadingSpinner>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </main>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import OrgRoot from '@/components/org-chart/OrgRoot.vue';
import Modal from '@/components/_functional/Modal.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import Toggle from '@/components/ui/Toggle.vue';
import { PREVIEW_PROFILE } from '@/queries/profile';
import Fetcher from '@/assets/js/fetcher';

const fetcher = new Fetcher({ failoverOn: [302] });

export default {
  name: 'PageOrgchart',
  components: {
    Icon,
    LoadingSpinner,
    Modal,
    OrgRoot,
    ProfilePreview,
    Toggle,
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
      desktopView: false,
      baseState: 'normal',
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
        const data = await fetcher.fetch(
          `/api/v4/orgchart/trace/${encodeURIComponent(username)}`,
        );
        const { trace } = await data.json();
        if (trace && trace.startsWith('-1-')) {
          this.looseTrace = trace.substr(3);
          this.trace = '';
        } else {
          this.looseTrace = '';
          this.trace = trace;
        }
      } catch (e) {
        if (e instanceof TypeError && e.message.startsWith('NetworkError')) {
          window.location.reload();
          return;
        }
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
    openedFromOrgNode() {
      return this.$route.params.openedFromOrgNode;
    },
    expandAllChildren() {
      return this.expanded === 'expand-all';
    },
    collapseAllChildren() {
      return this.expanded === 'collapse-all';
    },
  },
  watch: {
    desktopView() {
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
        const data = await fetcher.fetch('/api/v4/orgchart');
        const orgchart = await data.json();
        this.tree = orgchart.forrest;
        this.loose = orgchart.loose;
      } catch (e) {
        if (e instanceof TypeError && e.message.startsWith('NetworkError')) {
          window.location.reload();
          return;
        }
        this.error = e;
      }
      this.loading = false;
    },
    updateView() {
      if (matchMedia('(min-width: 57.5em)').matches) {
        this.desktopView = true;
      } else {
        this.desktopView = false;
      }
    },
    expand() {
      this.baseState = 'expanded';
    },
    collapse() {
      this.baseState = 'collapsed';
    },
    reset() {
      this.baseState = 'normal';
    },
  },
  mounted() {
    const searchField = document.getElementById('search-query');

    searchField.focus();
  },
};
</script>

<style>
.org-chart-main {
  width: auto;
}
.org-chart-buttons {
  display: flex;
  justify-content: center;
  margin: 2em 0;
}
@media (min-width: 57.5em) {
  .org-chart-buttons {
    margin-bottom: 0;
  }
}
.org-chart-buttons__reset {
  margin-left: 2em;
}
.org-chart-buttons__control {
  background-color: var(--white);
  color: var(--black);
  padding: 0.25em 0.4em;
  border-radius: var(--imageRadius);
  border: 2px solid var(--gray-30);
  font-size: inherit;
  line-height: 1;
  width: 2.5em;
  height: 2.5em;
}
.org-chart-buttons__control:hover {
  background-color: var(--blue-60);
  border: 2px solid var(--gray-30);
  color: var(--white);
}
.org-chart-buttons__control > svg {
  margin: auto;
}

.org-chart-buttons__row-left {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right: 1px solid var(--gray-30);
}

.org-chart-buttons__row-right {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: 1px solid var(--gray-30);
}

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
    content: '';
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
    position: -webkit-sticky;
    position: sticky;
    top: 7.5em;
  }
}
</style>
