<template>
  <li :id="data.username" :class="'org-node' + ( data.username === this.$route.params.username ? ' org-node--current' : '')">
    <RouterLink :to="{ name: 'OrgchartHighlight', params: { username: data.username } }" :id="`org-node-${prefix}`">
      <UserPicture :picture="data.picture" :username="data.username" :size="40" :isStaff="true"></UserPicture>
      <span class="org-node__name">{{ data.firstName }} {{ data.lastName }}</span>
      <span class="org-node__title">{{ data.title }}</span>
    </RouterLink>
    <ShowMore v-if="children.length > 0" :buttonText="`Expand ${data.firstName} ${data.lastName}`" :alternateButtonText="`Collapse ${data.firstName} ${data.lastName}`" buttonClass="org-node__toggle" :transition="false" :moveFocus="false" :overflowBefore="false" :expanded="expandAllChildren || orgNodeExpanded" @expand-all="handleExpandAll">
      <template slot="overflow">
        <ul v-for="(child, index) in children" :key="index">
          <OrgNode :children="child.children" :data="child.data" :prefix="`${prefix}-${index}`" :trace="trace" :expandAllChildren="shouldExpandAllChildren"></OrgNode>
        </ul>
      </template>
      <template slot="icon-expanded">
        <img src="@/assets/images/collapse.svg" alt="" width="16" aria-hidden="true" class="org-node__icon" />
      </template>
      <template slot="icon-collapsed">
        <img src="@/assets/images/expand.svg" alt="" width="16" aria-hidden="true" class="org-node__icon"/>
      </template>
    </ShowMore>
  </li>
</template>

<script>
import ShowMore from '@/components/functional/ShowMore.vue';
import UserPicture from '@/components/UserPicture.vue';

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
  },
  components: {
    ShowMore,
    UserPicture,
  },
  watch: {
    trace() {
      if (this.trace || this.prefix) {
        this.orgNodeExpanded = this.trace.startsWith(`${this.prefix}-`) || this.orgNodeExpanded;
      }
      return this.orgNodeExpanded;
    },
  },
  methods: {
    handleExpandAll() {
      this.shouldExpandAllChildren = !this.shouldExpandAllChildren;
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
    }
  },
  data() {
    const state = (this.trace && this.trace.startsWith(`${this.prefix}-`));

    return {
      orgNodeExpanded: state || (this.prefix && !this.prefix.includes('-')),
      shouldExpandAllChildren: this.expandAllChildren || false,
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
  padding-left: calc(((var(--nodeLevel) + 1) * 1em) + 1.25em);
  border-left: .25em solid transparent;
}
.org-node--current > a,
.org-node:target > a {
  border-left: .25em solid var(--blue-60);
  background-color: var(--lightBlue);
}
.org-node a:hover,
.org-node a:hover::after {
  background-color: var(--lightBlue);
}
.org-node a:focus,
.org-node:target > a {
  position: relative;
  z-index: calc(var(--layerTopBar) - 1);
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
  left: calc((var(--nodeLevel) - 1) * 1em + .5em);
  width: 2.5em;
  height: 2.5em;
  margin: .75em 0;
  padding: .65em;
  z-index: 1;
  border: 0;
  background-color: transparent;
  -webkit-appearance: none;
  appearance: none;
  border-radius: var(--imageRadius);
}
.org-node__toggle:hover {
  background-color: var(--gray-20);
}
  .org-node__toggle img {
    margin-right: 0;
    margin-bottom: -2px;
  }
.org-node .show-more {
  position: static; /* so that it is explicitly not a positioning context */
}
.org-node .show-more__button-text {
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
  margin-right: .75em;
}
</style>
