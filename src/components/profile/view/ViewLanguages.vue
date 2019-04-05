<template>
  <div>
    <header class="profile__section-header">
      <h2>Languages</h2>
      <EditButton
        v-if="userOnOwnProfile"
        section="languages"
        sectionId="languages"
      ></EditButton>
    </header>
    <Tag
      v-for="(language, index) in languages.values"
      :tag="language"
      :key="`language-${index}`"
    >
    </Tag>
  </div>
</template>

<script>
import Tag from '@/components/ui/Tag.vue';

export default {
  name: 'ViewLanguages',
  props: {
    languages: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    Tag,
  },
};
</script>
