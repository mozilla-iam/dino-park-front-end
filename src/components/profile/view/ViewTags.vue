<template>
  <div>
    <header class="profile__section-header">
      <h2>Tags</h2>
      <EditButton
        v-if="userOnOwnProfile"
        section="tags"
        sectionId="tags"
      ></EditButton>
    </header>
    <Tag v-for="(tag, index) in tags.values" :tag="tag" :key="`tag-${index}`" />
  </div>
</template>

<script>
import EditButton from '@/components/profile/edit/EditButton.vue';
import Tag from '@/components/ui/Tag.vue';

export default {
  name: 'ViewTags',
  props: {
    tags: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    EditButton,
    Tag,
  },
};
</script>
