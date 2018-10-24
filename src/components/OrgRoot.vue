<template>
  <div class="org-root">
    <ul v-for="(root, index) in roots" :key="index">
      <OrgNode :children="root.children" :data="root.data" :id="index" :prefix="`${index}`" :trace="trace"></OrgNode>
    </ul>
  </div>
</template>

<script>
import OrgNode from '@/components/OrgNode.vue';

export default {
  name: 'OrgRoot',
  components: {
    OrgNode,
  },
  props: {
    roots: Array,
    trace: String,
  },
};
</script>

<style>
  .org-root {
    width: 100%;
    max-width: 40em;
    background-image: linear-gradient(var(--gray-10) 0, var(--gray-10) 50%, #fff 50%);
    background-size: auto 8em;
  }
  @media(min-width:50em) {
    .org-root {
      box-shadow: var(--shadowCard);
      margin: 0;
    }
  }
    .org-root ul {
      padding: 0;
      margin: 0;
    }

</style>
