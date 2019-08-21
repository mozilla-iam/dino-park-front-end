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
        :disabled="!dirty"
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
      <div class="org-chart__chart">
        <LoadingSpinner></LoadingSpinner>
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
              :desktopView="desktopView"
              @close="closeProfile"
            ></ProfilePreview>
            <Modal
              v-else-if="data"
              :initiallyOpen="true"
              :closeButton="true"
              @close="closeProfile"
              ref="modalEl"
            >
              <ProfilePreview
                v-bind="data.profile"
                :desktopView="desktopView"
              ></ProfilePreview>
            </Modal>
            <LoadingSpinner v-else></LoadingSpinner>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </main>
</template>

<script>
import Vue from 'vue';
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import Modal from '@/components/_functional/Modal.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import Toggle from '@/components/ui/Toggle.vue';
import { PREVIEW_PROFILE } from '@/queries/profile';
import Fetcher from '@/assets/js/fetcher';
import generateIdenticon from '@/assets/js/identicon-avatar';

const fetcher = new Fetcher({ failoverOn: [302] });
const IconClass = Vue.extend(Icon);
let icon = null;
function renderNode(node, level = 1) {
  const e = document.createElement('div');
  const hasChildren = node.children.length > 0;
  e.innerHTML = `
    <li class="org-node ${
      hasChildren ? 'org-node--expandable' : ''
    }" style="--nodeLevel: ${level};">
      <a class="router-link-exact-active router-link-active" id="org-node-0">
        <div class="user-picture user-picture--small">
          <span class="dino-type">
            <span class="visually-hidden">Staff</span>
          </span>
        </div>
        <span class="org-node__name"></span>
        <span class="org-node__title"></span>
      </a>

        ${
          hasChildren
            ? `
              <div class="org-node__expander">
                <button type="button" aria-expanded="true" class="org-node__expander-button org-node__toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" role="presentation" focusable="false"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div tabindex="-1" class="org-node__expander-overflow"><ul></ul></div>
              </div>`
            : `
              <svg
                class="org-node__no-children-indicator"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="2"
                  fill="#B1B1B3"
                  fill-rule="evenodd"
                  transform="translate(9 9.308)"
                />
              </svg>
            `
        }
    </li>`;
  const [dinoEl] = e.getElementsByClassName('dino-type');
  if (dinoEl) {
    dinoEl.appendChild(icon.$el.cloneNode(true));
  }

  const li = e.firstElementChild;
  const { picture, username } = node.data;
  li.id = username;
  e.querySelector('a').href = `/o/${username}`;
  const img = e.querySelector('.user-picture');
  if (
    picture === null ||
    picture === '' ||
    picture === 'default:' ||
    picture.startsWith('https://s3.amazonaws.com/')
  ) {
    generateIdenticon(username, 40).then((src) => {
      img.style.backgroundSize = 'cover';
      img.style.backgroundImage = `url("${src}")`;
    });
  } else {
    img.style.backgroundSize = 'cover';
    img.style.backgroundImage = `url("${picture}?size=40")`;
  }
  e.querySelector(
    '.org-node__name',
  ).textContent = `${node.data.firstName} ${node.data.lastName}`;
  e.querySelector('.org-node__title').textContent = node.data.title;
  const ul = e.querySelector('ul');
  if (ul) {
    node.children.forEach((child) =>
      ul.appendChild(renderNode(child, level + 1)),
    );
  }
  return li;
}

function renderOrgchart(orgchart) {
  const forrest = document.createElement('div');
  forrest.className = 'org-root org-root--forrest';
  const forrestInner = document.createElement('ul');
  forrest.appendChild(forrestInner);
  orgchart.forrest.forEach((root) =>
    forrestInner.appendChild(renderNode(root)),
  );
  const loose = document.createElement('div');
  loose.className = 'org-root org-root--loose';
  loose.innerHTML =
    '<h2 class="org-root__heading">People who do not have a manager set</h2>';
  const looseInner = document.createElement('ul');
  loose.appendChild(looseInner);
  orgchart.loose.forEach((root) => looseInner.appendChild(renderNode(root)));
  return [forrest, loose];
}

export default {
  name: 'PageOrgchart',
  components: {
    Icon,
    LoadingSpinner,
    Modal,
    ProfilePreview,
    Toggle,
  },
  data() {
    return {
      loading: false,
      previewProfileQuery: PREVIEW_PROFILE,
      desktopView: false,
      dirty: false,
      rawJson: null,
    };
  },
  async created() {
    window.addEventListener('resize', this.updateView);
    this.updateView();
    await this.fetchData();
    await this.highlight();
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
    $route() {
      this.updateCurrentNode();
    },
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const data = await fetcher.fetch('/api/v4/orgchart');
        const orgchart = await data.json();
        this.initiallyExpanded = orgchart.forrest
          .map((node) => node.data.username)
          .reduce((obj, key) => {
            obj[key] = true;
            return obj;
          }, {});
        const orgChartRoot = document.querySelector('.org-chart__chart');
        let chartFromStore = Boolean(this.$store.state.org);
        this.rawJson = JSON.stringify(orgchart);
        if (chartFromStore && this.rawJson !== this.$store.state.org.rawJson) {
          chartFromStore = false;
        }
        const [f, t] = chartFromStore
          ? this.$store.state.org.nodes
          : renderOrgchart(orgchart);
        this.dirty = chartFromStore ? this.$store.state.org.dirty : false;
        orgChartRoot.innerHTML = '';
        orgChartRoot.appendChild(f);
        orgChartRoot.appendChild(t);
        this.updateCurrentNode();

        this.expandables = Array.from(
          orgChartRoot.querySelectorAll('.org-node--expandable'),
        ).reduce((obj, li) => {
          obj[li.id] = li;
          return obj;
        }, {});

        if (!chartFromStore) {
          this.expandFirst();
        }

        orgChartRoot.addEventListener('click', (event) => {
          const li = event.target.closest('li');

          if (event.target.closest('button')) {
            this.toggle(li);
            this.saveOrgTree();
            return;
          }

          const anchor = event.target.closest('a');
          if (anchor) {
            this.$router.push({
              name: 'Orgchart',
              params: {
                username: li.id,
                openedFromOrgNode: true,
              },
            });
            event.preventDefault();
          }
        });
      } catch (e) {
        if (e instanceof TypeError && e.message.startsWith('NetworkError')) {
          window.location.reload();
          return;
        }
        console.error(e);
      }
      this.loading = false;
    },
    async highlight() {
      const { username } = this.$route.params;
      if (!(username && this.$route.name === 'OrgchartHighlight')) {
        return;
      }

      try {
        const data = await fetcher.fetch(
          `/api/v4/orgchart/trace/${encodeURIComponent(username)}`,
        );
        const { trace } = await data.json();
        const isLoose = trace && trace.startsWith('-1-');

        const root = this.$el.querySelector(
          `.org-root--${isLoose ? 'loose' : 'forrest'}`,
        );
        const indices = (isLoose ? trace.substr(3) : trace)
          .split('-')
          .map(Number);
        const li = this.toggleTrace(root.firstElementChild, indices);
        // assume browsers with `scrollBehavior` support scrollIntoView
        // with object as arguments
        const card = li.querySelector('a') || li;
        if ('scrollBehavior' in document.documentElement.style) {
          card.scrollIntoView({
            block: 'center',
          });
        } else {
          // scrolls into view with element at bottom of viewport (block: 'end')
          card.scrollIntoView(false);
        }

        this.saveOrgTree();
      } catch (e) {
        if (e instanceof TypeError && e.message.startsWith('NetworkError')) {
          window.location.reload();
          return;
        }
        console.error(e);
      }
    },
    toggleTrace(ul, indices) {
      const index = indices.shift();
      const li = ul.children[index];
      this.toggle(li, true);
      return indices.length > 0
        ? this.toggleTrace(li.querySelector('ul'), indices)
        : li;
    },
    updateView() {
      if (matchMedia('(min-width: 57.5em)').matches) {
        this.desktopView = true;
      } else {
        this.desktopView = false;
      }
    },

    toggle(li, shouldExpand) {
      const ul = li.querySelector('ul');
      if (!ul) return;
      shouldExpand =
        shouldExpand === undefined ? ul.style.display === 'none' : shouldExpand;

      ul.style.display = shouldExpand ? 'inline-block' : 'none';
      const expander = li.querySelector('.org-node__expander');
      const button = li.querySelector('button');
      if (shouldExpand) {
        expander.classList.add('org-node__expander--expanded');
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-label', 'Collapse');
        button.style.transform = '';
      } else {
        expander.classList.remove('org-node__expander--expanded');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Expand');
        button.style.transform = 'rotateZ(-90deg)';
      }
      this.dirty = true;
    },
    saveOrgTree() {
      requestIdleCallback(() => {
        const orgchart = document.querySelector('.org-chart__chart');
        if (orgchart) {
          this.$store.commit('setOrg', {
            nodes: Array.from(
              document.querySelector('.org-chart__chart').children,
            ).map((n) => n.cloneNode(true)),
            dirty: this.dirty,
            rawJson: this.rawJson,
          });
        }
      });
    },
    expandAll() {
      Object.entries(this.expandables).forEach(([, li]) => {
        this.toggle(li, true);
      });
      this.saveOrgTree();
    },
    collapseAll() {
      Object.entries(this.expandables).forEach(([, li]) => {
        this.toggle(li, false);
      });
      this.saveOrgTree();
    },
    expandFirst() {
      const ids = Object.keys(this.initiallyExpanded);
      Object.entries(this.expandables).forEach(([id, li]) => {
        this.toggle(li, ids.includes(id));
      });
      this.dirty = false;
      this.saveOrgTree();
    },
    updateCurrentNode() {
      const CURRENT_CLASS = 'org-node--current';
      const previous = this.$el.querySelector(`.${CURRENT_CLASS}`);
      if (previous) {
        previous.classList.remove(CURRENT_CLASS);
      }
      const { username } = this.$route.params;
      if (username) {
        document.getElementById(username).classList.add(CURRENT_CLASS);
      }
    },
    closeProfile() {
      this.$router.push({ name: 'Orgchart' });
    },
  },
  mounted() {
    document.getElementById('search-query').focus();
    icon = new IconClass({
      propsData: {
        id: 'staff',
        width: 10,
        height: 10,
      },
    }).$mount();
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
.org-chart-buttons__reset[disabled] {
  visibility: hidden;
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
.org-chart-buttons__control:hover:disabled {
  cursor: not-allowed;
}
.org-chart-buttons__control:hover:enabled {
  background-color: var(--gray-30);
  border: 2px solid var(--gray-30);
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

.org-root {
  width: 100%;
  max-width: 45em;
  background-image: linear-gradient(
    var(--gray-10) 0,
    var(--gray-10) 50%,
    #fff 50%
  );
  background-size: auto 8em;
  border-radius: var(--cardRadius);
  position: relative;
  overflow-x: scroll;
}
@media (min-width: 57.5em) {
  .org-root {
    box-shadow: var(--shadowCard);
    margin: 0;
    overflow-x: hidden;
  }
}
.org-root ul {
  padding: 0;
  margin: 0;
  width: 100%;
}

.org-root > ul {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  min-width: 100%;
}

.org-root--loose {
  margin-top: 5em;
  background-image: linear-gradient(
    var(--white) 0,
    var(--white) 50%,
    var(--gray-10) 50%
  );
  background-position-y: bottom;
}
.org-root--loose > h2 {
  font-size: 1em;
  background: var(--white);
  padding: 0.75em 3em;
  color: var(--gray-50);
  line-height: 1;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: var(--cardRadius) var(--cardRadius) 0 0;
  margin-bottom: 0px;
}

.org-node {
  list-style: none;
  position: relative; /* positioning context for a::after */
}
.org-node a {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-rows: max-content max-content;
  height: 4em;
  padding: 0.75em 0;
  text-decoration: none;
  color: inherit;
  padding-left: 2em;
  padding-right: 1em;
  padding-left: calc((var(--nodeLevel) * 2em) + 1.25em);
  border-left: 0.25em solid transparent;
}
@media (min-width: 57.5em) {
  .org-node a {
    grid-template-columns: auto 1fr;
  }
}
.org-node a > div {
  grid-row: 1/3;
}
.org-node--current > a,
.org-node:target > a {
  border-left: 0.25em solid var(--blue-60);
  background-color: var(--lightBlue);
}
.org-node a:hover,
.org-node a:hover::after {
  background-color: var(--lightBlue);
}
.org-node a:focus,
.org-node:target > a {
  position: relative;
  z-index: var(--layerTwo);
}
.org-node__name,
.org-node__title {
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  grid-column: 2/3;
  max-width: 100vw;
}
@media (min-width: 57.5em) {
  .org-node__name,
  .org-node__title {
    max-width: 100%;
  }
}
.org-node__name {
  font-weight: 700;
}
.org-node__title {
  color: var(--gray-50);
  grid-row: 2/3;
}
.org-node__toggle {
  font-size: inherit;
  position: absolute;
  top: 0;
  left: 0;
  left: calc((var(--nodeLevel) * 2em) - 1.5em);
  width: 2.5em;
  height: 2.5em;
  margin: 0.75em 0;
  padding: 0.65em;
  z-index: var(--layerOne);
  border: 0;
  background-color: transparent;
  -webkit-appearance: none;
  appearance: none;
  border-radius: var(--imageRadius);
  z-index: var(--layerThree);
}
.org-node__toggle:hover {
  background-color: var(--gray-20);
}
.org-node__toggle img {
  margin-right: 0;
  margin-bottom: -2px;
}
.org-node .org-node__expander {
  position: static; /* so that it is explicitly not a positioning context */
}
.org-node .user-picture {
  float: left;
  margin-right: 0.75em;
}
.org-node__no-children-indicator {
  position: absolute;
  top: 1.125em;
  left: calc((var(--nodeLevel) * 2em) - 1.125em);
}

.org-node__expander {
  position: relative;
}
.org-node__expander-button {
  font: inherit;
}
.org-node__expander-button > svg,
.org-node__expander-button > img {
  margin-right: 1.5em;
}
</style>
