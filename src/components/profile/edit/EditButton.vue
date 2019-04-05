<template>
  <button
    class="profile__edit-button"
    @click="
      $router.push({
        name: 'Edit Profile',
        query: {
          section: sectionId,
        },
      })
    "
  >
    <img src="@/assets/images/icon-pencil.svg" :alt="`Edit ${section}`" />
  </button>
</template>

<script>
export default {
  name: 'EditButton',
  props: {
    section: String,
    sectionId: String,
  },
};
</script>
