<template>
  <li :id="data.user_id" :class="'org-node' + ( data.user_id === this.$route.params.userId ? ' org-node--current' : '')">
    <router-link :to="{ name: 'Orgchart', params: { userId: data.user_id } }" :id="`org-node-${prefix}`">
      <span class="org-node__name">{{ data.first_name }} {{ data.last_name }}</span>
      <span class="org-node__title">{{ data.title }}</span>
    </router-link>
    <ShowMore v-if="children.length > 0" :buttonText="`Expand ${data.first_name} ${data.last_name}`" :alternateButtonText="`Collapse ${data.first_name} ${data.last_name}`" :trace="trace" :prefix="prefix" buttonClass="org-node__toggle" :transition="false">
      <template slot="overflow">
        <ul v-for="(child, index) in children" :key="index">
          <OrgNode :children="child.children" :data="child.data" :id="index" :prefix="`${prefix}-${id}`" :trace="trace"></OrgNode>
        </ul>
      </template>
      <template slot="icon-expanded">
        <img src="@/assets/images/collapse.svg" alt="" width="16" aria-hidden="true" />
      </template>
      <template slot="icon-collapsed">
        <img src="@/assets/images/expand.svg" alt="" width="16" aria-hidden="true" />
      </template>
    </ShowMore>
  </li>
</template>

<script>
import ShowMore from '@/components/functional/ShowMore.vue';

export default {
  name: 'OrgNode',
  props: {
    children: Array,
    data: Object,
    id: Number,
    prefix: String,
    trace: String,
  },
  components: {
    ShowMore,
  },
  mounted() {
    if (this.data.user_id === this.$route.params.userId) {
      const e = document.getElementById(`${this.data.user_id}`);
      if (e) {
        e.scrollIntoView(false);
      }
    }
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
  padding-left: calc((var(--nodeLevel) + 2) * 1em);
  border-left: 5px solid transparent;
}
.org-node--current > a,
.org-node:target > a {
  border-left: 5px solid var(--blue-60);
  background-color: var(--lightBlue);
}
.org-node a:hover,
.org-node a:hover::after {
  background-color: var(--lightBlue);
}
.org-node__name,
.org-node__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-size: 90%;
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
  left: calc((var(--nodeLevel) - 1) * 1em);
  width: 3em;
  height: 4em;
  z-index: 1;
  border: 0;
  background-color: transparent;
  -webkit-appearance: none;
  appearance: none;
}
  .org-node__toggle img {
    margin-right: 0;
  }
.org-node .show-more {
  position: static; /* so that it is explicitly not a positioning context */
}
.org-node .show-more__button-text {
  position: absolute;
  left: -9999em;
}
</style>
