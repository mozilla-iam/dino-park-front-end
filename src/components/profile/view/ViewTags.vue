<template>
  <div>
    <Tag v-for="(tag, index) in tags.values" :tag="tag" :key="`tag-${index}`" />
  </div>
</template>

<script>
import Tag from '@/components/ui/Tag.vue';

export default {
  name: 'ViewTags',
  props: {
    tags: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    Tag,
  },
};
</script>
