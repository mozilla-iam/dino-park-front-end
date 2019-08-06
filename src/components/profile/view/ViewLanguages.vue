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
      v-if="Object.entries(languages.values).length > 0"
      v-for="(language, index) in languages.values"
      :tag="language"
      :key="`language-${index}`"
    >
    </Tag>
    <p v-else>You have not added any languages yet.</p>
  </div>
</template>

<script>
import EditButton from '@/components/profile/edit/EditButton.vue';
import Tag from '@/components/ui/Tag.vue';

export default {
  name: 'ViewLanguages',
  props: {
    languages: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    EditButton,
    Tag,
  },
};
</script>
