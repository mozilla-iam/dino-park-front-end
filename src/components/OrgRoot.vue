<template>
  <div :class="'org-root' + ( modifier ? ' ' + modifier : '')">
    <h2 class="org-root__heading" v-if="heading">{{ heading }}</h2>
    <ul v-for="(root, index) in roots" :key="index">
      <OrgNode :children="root.children" :data="root.data" :prefix="`${index}`" :trace="trace"></OrgNode>
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
    heading: String,
    modifier: String,
  },
};
</script>

<style>
  .org-root {
    width: 100%;
    max-width: 40em;
    background-image: linear-gradient(var(--gray-10) 0, var(--gray-10) 50%, #fff 50%);
    background-size: auto 8em;
    border-radius: var(--cardRadius);
    position: relative;
  }
  .org-root--loose {
    margin-top: 5em;
  }
    .org-root > h2 {
      font-size: 1em;
      background: var(--white);
      padding: .75em 3em;
      color: var(--gray-50);
      position: absolute;
      top: -2.5em;
      line-height: 1;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  @media(min-width:57.5em) {
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
