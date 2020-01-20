<template>
  <div>
    <Tag
      v-if="Object.entries(languages.values).length > 0"
      v-for="(language, index) in languages.values"
      :tag="language"
      :key="`language-${index}`"
    >
    </Tag>
    <p v-else>{{ fluent('profile_languages_none', 'self') }}</p>
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
