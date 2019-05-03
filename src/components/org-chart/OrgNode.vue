<template>
  <li
    :id="data.username"
    :class="
      'org-node' +
        (data.username === this.$route.params.username
          ? ' org-node--current'
          : '')
    "
  >
    <RouterLink
      :to="{
        name: 'Orgchart',
        params: { username: data.username, openedFromOrgNode: true },
      }"
      :id="`org-node-${prefix}`"
    >
      <UserPicture
        :picture="visible ? data.picture : 'default:'"
        :username="data.username"
        :size="40"
        :isStaff="true"
      ></UserPicture>
      <span class="org-node__name"
        >{{ data.firstName }} {{ data.lastName }}</span
      >
      <span class="org-node__title">{{ data.title }}</span>
    </RouterLink>
    <div
      v-if="children.length > 0"
      :class="
        'org-node__expander' +
          (orgNodeExpanded ? ' org-node__expander--expanded' : '')
      "
    >
      <button
        class="org-node__expander-button org-node__toggle"
        type="button"
        :aria-expanded="orgNodeExpanded ? 'true' : 'false'"
        :aria-label="
          orgNodeExpanded
            ? `Collapse ${data.firstName} ${data.lastName}`
            : `Expand ${data.firstName} ${data.lastName}`
        "
        v-on:click="toggleOverflow"
      >
        <svg
          v-if="orgNodeExpanded"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <transition name="org-node__expander-overflow-">
        <div
          :class="
            'org-node__expander-overflow' +
              (orgNodeExpanded ? '' : ' org-node__expander-overflow-hidden')
          "
          tabindex="-1"
        >
          <ul v-for="(child, index) in children" :key="index">
            <OrgNode
              v-if="loadNow || orgNodeExpanded"
              :children="child.children"
              :data="child.data"
              :prefix="`${prefix}-${index}`"
              :trace="trace"
              :visible="orgNodeExpanded"
              :expandAllChildren="propagateExpandAllChildren"
            ></OrgNode>
          </ul>
        </div>
      </transition>
    </div>
    <template v-else>
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
    </template>
  </li>
</template>

<script>
import UserPicture from '@/components/ui/UserPicture.vue';

export default {
  name: 'OrgNode',
  props: {
    children: Array,
    data: Object,
    prefix: String,
    trace: String,
    expandAllChildren: {
      type: Boolean,
      default: false,
    },
    baseState: String,
    visible: Boolean,
  },
  components: {
    UserPicture,
  },
  watch: {
    trace() {
      if (this.trace || this.prefix) {
        this.orgNodeExpanded =
          this.trace.startsWith(`${this.prefix}-`) || this.orgNodeExpanded;
      }
      return this.orgNodeExpanded;
    },
    expandAllChildren() {
      this.propagateExpandAllChildren = this.expandAllChildren;
      this.orgNodeExpanded = this.shouldBeExpanded();
    },
    baseState() {
      switch (this.baseState) {
        case 'normal':
          this.propagateExpandAllChildren = false;
          this.orgNodeExpanded = this.shouldBeExpanded();
          break;
        case 'expanded':
          this.propagateExpandAllChildren = true;
          this.orgNodeExpanded = this.shouldBeExpanded();
          break;
        case 'collapsed':
          this.orgNodeExpanded = false;
          break;
        default:
          console.warn('unknown orgchart state');
      }
    },
  },
  methods: {
    shouldBeExpanded() {
      const state = this.trace && this.trace.startsWith(`${this.prefix}-`);
      return (
        state ||
        (this.prefix && !this.prefix.includes('-')) ||
        this.expandAllChildren ||
        this.propagateExpandAllChildren
      );
    },
    toggleOverflow() {
      this.orgNodeExpanded = !this.orgNodeExpanded;
    },
  },
  mounted() {
    if (this.data.username === this.$route.params.username) {
      const e = document.getElementById(`${this.data.username}`);
      if (e) {
        // assume browsers with `scrollBehavior` support scrollIntoView
        // with object as arguments
        if ('scrollBehavior' in document.documentElement.style) {
          e.scrollIntoView({
            block: 'center',
          });
        } else {
          // scrolls into view with element at bottom of viewport (block: 'end')
          e.scrollIntoView(false);
        }
      }
      this.orgNodeExpanded = true;
    }
    setTimeout(() => {
      this.loadNow = true;
    }, 100);
  },
  data() {
    const orgNodeExpanded = this.shouldBeExpanded();
    return {
      propagateExpandAllChildren: this.expandAllChildren,
      orgNodeExpanded,
      loadNow: orgNodeExpanded,
    };
  },
};
</script>

<style>
.org-node {
  list-style: none;
  position: relative; /* positioning context for a::after */
  --nodeLevel: 1;
}
.org-node .org-node {
  --nodeLevel: 2;
}
.org-node .org-node .org-node {
  --nodeLevel: 3;
}
.org-node .org-node .org-node .org-node {
  --nodeLevel: 4;
}
.org-node .org-node .org-node .org-node .org-node {
  --nodeLevel: 5;
}
.org-node .org-node .org-node .org-node .org-node .org-node {
  --nodeLevel: 6;
}
.org-node .org-node .org-node .org-node .org-node .org-node .org-node {
  --nodeLevel: 7;
}
.org-node
  .org-node
  .org-node
  .org-node
  .org-node
  .org-node
  .org-node
  .org-node {
  --nodeLevel: 8;
}
.org-node a {
  display: block;
  height: 4em;
  padding: 0.75em 0;
  text-decoration: none;
  color: inherit;
  padding-left: 2em;
  padding-left: calc((var(--nodeLevel) * 2em) + 1.25em);
  border-left: 0.25em solid transparent;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.org-node__name {
  font-weight: 700;
}
.org-node__title {
  color: var(--gray-50);
  max-width: 90%;
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
.org-node .org-node__expander-button-text {
  border: 0;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
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
.org-node__expander-button-text {
  font-size: 0.9em;
}
.org-node__expander-overflow-hidden {
  display: none;
}
</style>
