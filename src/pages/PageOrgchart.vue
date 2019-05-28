<template>
  <main class="org-chart-main">
    <div class="org-chart-buttons" v-if="!loading">
      <button
        type="button"
        @click="expandAll"
        class="org-chart-buttons__row-left org-chart-buttons__control button--icon-only button"
        title="Expand all"
      >
        <Icon id="expand" :width="18" :height="18" />
        <span class="visually-hidden">Expand all</span>
      </button>
      <button
        type="button"
        @click="collapseAll"
        class="org-chart-buttons__row-right org-chart-buttons__control button--icon-only button"
        title="Collapse all"
      >
        <Icon id="collapse" :width="18" :height="18" />
        <span class="visually-hidden">Collapse all</span>
      </button>
      <button
        type="button"
        @click="expandFirst"
        class="org-chart-buttons__reset org-chart-buttons__control button--icon-only button"
        title="Reset to default view"
      >
        <Icon id="rotate" :width="18" :height="18" />
        <span class="visually-hidden">Reset to default view</span>
      </button>
    </div>
    <div class="org-chart">
      <div id="insert-here" class="org-chart__chart"></div>
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

function renderNode(node, l = []) {
  l.push(
    `<li id="${
      node.data.username
    }" class="org-node org-node--current" style="--nodeLevel:1;">
      <a href="/o/r--hbmUGvzNW1Ou0B6-kzkfcw==" class="router-link-exact-active router-link-active" id="org-node-0">
        <div class="user-picture user-picture--small">
          <img alt="" role="presentation" aria-hidden="true" width="40"><span class="dino-type">
            <span aria-hidden="true">S</span><span class="visually-hidden">Staff</span></span>
        </div>
        <span class="org-node__name">${node.data.firstName} ${
      node.data.lastName
    }</span>
        <span class="org-node__title">${node.data.title}</span>
      </a>
      <div class="org-node__expander org-node__expander--expanded">
      <button type="button" aria-expanded="true" aria-label="Collapse ${
        node.data.firstName
      } ${
      node.data.lastName
    }" class="org-node__expander-button org-node__toggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" role="presentation" focusable="false"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div tabindex="-1" class="org-node__expander-overflow"><ul>`,
  );
  node.children.forEach((child) => renderNode(child, l));
  l.push(`</div></li>`);
}

function renderOrgchart(orgchart) {
  const l = [];
  l.push(`<ul>`);
  orgchart.forrest.forEach((root) => renderNode(root, l));
  l.push(`</ul>`);
  l.push(`<ul>`);
  orgchart.loose.forEach((root) => renderNode(root, l));
  l.push(`</ul>`);
  return l.join();
}

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
    const { org } = this.$store.state;
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

      orgFromStore: Boolean(org),
      ...(org || { expanded: {}, collapsed: null }),
      subscribers: {},
    };
  },
  provide() {
    const orgChartPage = this;
    return {
      subscribeToExpanded(id, callback) {
        orgChartPage.subscribers[id] = () =>
          callback(orgChartPage.isExpanded(id));
        return orgChartPage.isExpanded(id);
      },
      toggle(id, value = null) {
        const useCollapsed = orgChartPage.expanded == null;
        const collection = useCollapsed
          ? orgChartPage.collapsed
          : orgChartPage.expanded;
        if (value != null && orgChartPage.isExpanded(id) === value) {
          return;
        }
        if (collection[id]) {
          delete collection[id];
        } else {
          collection[id] = true;
        }
        const subscriber = orgChartPage.subscribers[id];
        if (subscriber) {
          subscriber();
        }
      },
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
        document.querySelector('#insert-here').innerHTML = renderOrgchart(
          orgchart,
        );
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

    expandAll() {
      this.setOrgData({ expanded: null, collapsed: {} });
    },
    collapseAll() {
      this.setOrgData({ expanded: {}, collapsed: null });
    },
    expandFirst() {
      this.setOrgData({
        expanded: this.tree
          .map((node) => node.data.dinoId)
          .reduce((obj, key) => {
            obj[key] = true;
            return obj;
          }, {}),
        collapsed: null,
      });
    },
    setOrgData(org) {
      this.expanded = org.expanded;
      this.collapsed = org.collapsed;
      Object.values(this.subscribers).forEach((subscriber) => {
        subscriber();
      });
      this.$store.commit('setOrg', org);
    },
    isExpanded(id) {
      return this.expanded ? this.expanded[id] : !this.collapsed[id];
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
