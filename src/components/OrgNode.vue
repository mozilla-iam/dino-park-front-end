<template>
  <li :id="data.user_id" class="org-node">
    <a :href="`/profile/${data.user_id}`" @click.prevent="previewProfile(data.user_id)">
      <span class="org-node__name">{{ data.first_name }} {{ data.last_name }}</span>
      <span class="org-node__title">{{ data.title }}</span>
    </a>
    <ShowMore v-if="children.length > 0" :buttonText="`Expand ${data.first_name} ${data.last_name}`" :alternateButtonText="`Collapse ${data.first_name} ${data.last_name}`" :expanded="false" buttonClass="org-node__toggle" :transition="true">
      <template slot="overflow">
        <ul v-for="(child, index) in children" :key="index">
          <OrgNode :children="child.children" :data="child.data" :id="index" :prefix="`${prefix}-${id}`"></OrgNode>
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
  },
  components: {
    ShowMore,
  },
  methods: {
    previewProfile(userId) {
      this.$store.commit('updatePreviewProfileId', {
        newId: userId,
      });
    },
  },
};
</script>

<style>
.org-node {
  list-style: none;
  position: relative; /* positioning context for a::after */
  padding-left: 3em;
}
  .org-node a {
    display: block;
    height: 4em;
    padding: .75em 0;
    text-decoration: none;
    color: inherit;
  }
  .org-node:target > a {
    background-color: blue;
  }
  .org-node:target > a::after {
    content: '';
    width: 5px;
    height: 100%;
    background-color: var(--blue);
    position: absolute;
    left: 0;
    top: 0;
  }
  .org-node a::before {
    content: '';
    width: 100%;
    height: 4em;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    color: var(--darkGrey);
    max-width: 90%;
  }
  .org-node__toggle {
    font-size: inherit; 
    position: absolute;
    top: 0;
    left: 0;
    width: 3em;
    height: 4em;
    z-index: 1;
    border: 0;
    background-color: transparent;
    -webkit-appearance: none;
    appearance: none;
  }
  .org-node .show-more {
    position: static; /* so that it is explicitly not a positioning context */
  }
  .org-node .show-more__button-text {
    position: absolute;
    left: -9999em;
  }
</style>
