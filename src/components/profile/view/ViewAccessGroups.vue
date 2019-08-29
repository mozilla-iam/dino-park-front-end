<template>
  <IconBlockList class="icon-block-list--multi-col">
    <IconBlock
      v-for="[group] in Object.entries(accessInformation.mozilliansorg.values)"
      :key="`group-${group}`"
      icon="dino"
    >
      {{ group }}
    </IconBlock>
  </IconBlockList>
</template>

<script>
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';

export default {
  name: 'ViewAccessGroups',
  props: {
    accessInformation: Object,
  },
  components: {
    IconBlock,
    IconBlockList,
  },
};
</script>
