<template>
  <div>
    <header class="profile__section-header">
      <h2>Tags</h2>
      <button
        class="profile__edit-button"
        v-if="userOnOwnProfile"
        @click="
          $router.push({
            name: 'Edit Profile',
            query: {
              section: 'tags',
            },
          })
        "
      >
        <img src="@/assets/images/icon-pencil.svg" alt="Edit tags" />
      </button>
    </header>
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
