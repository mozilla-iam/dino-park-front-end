<template>
  <div class="org-root">
    <ul v-for="(root, index) in roots" :key="index">
      <OrgNode :children="root.children" :data="root.data" :id="index" :prefix="`${index}`"></OrgNode>
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
  },
};
</script>

<style>
  .org-root {
    width: 80%;
    margin: 0 auto;
  }

  .org-root ul {
    padding-left: 1em;
  }

</style>
