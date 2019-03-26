<template>
  <div>
    <header class="profile__section-header">
      <h2>Languages</h2>
      <button
        class="profile__edit-button"
        v-if="userOnOwnProfile"
        @click="
          $router.push({
            name: 'Edit Profile',
            query: {
              section: 'languages',
            },
          })
        "
      >
        <img src="@/assets/images/icon-pencil.svg" alt="Edit" />
      </button>
    </header>
    <Tag
      v-for="(language, index) in languages"
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
    languages: Array,
    userOnOwnProfile: Boolean,
  },
  components: {
    Tag,
  },
};
</script>
