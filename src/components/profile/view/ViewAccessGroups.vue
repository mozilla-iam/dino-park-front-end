<template>
  <div>
    <header class="profile__section-header">
      <h2>Access Groups</h2>
    </header>
    <a id="nav-access-groups" class="profile__anchor"></a>
    <IconBlockList modifier="icon-block-list--multi-col">
      <IconBlock
        v-for="[group] in Object.entries(
          accessInformation.mozilliansorg.values,
        )"
        :key="`group-${group}`"
        icon="dino"
      >
        {{ group }}
      </IconBlock>
    </IconBlockList>
  </div>
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
