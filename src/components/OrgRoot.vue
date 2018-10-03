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
    max-width: 40em;
    background-image: linear-gradient(var(--lightGrey) 0, var(--lightGrey) 50%, #fff 50%);
    background-size: auto 8em;
    box-shadow: rgba(0,0,0,0.4) 0 0 4px 0;
  }

  .org-root ul {
    padding: 0;
    margin: 0;
  }

</style>
