<template>
  <RouterLink
    class="profile__edit-button"
    :to="{
      name: 'Edit Profile',
      query: {
        section: sectionId,
      },
    }"
  >
    <img src="@/assets/images/icon-pencil.svg" :alt="`Edit ${section}`" />
  </RouterLink>
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
