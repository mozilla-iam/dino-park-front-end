<template>
  <RouterLink
    class="edit-button"
    :to="{
      name: 'Edit Profile',
      query: {
        section: sectionId,
      },
    }"
  >
    <Icon id="pencil" :width="20" :height="20"></Icon>
    <span class="visually-hidden">Edit {{ section }}</span>
  </RouterLink>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'EditButton',
  props: {
    section: String,
    sectionId: String,
  },
  components: {
    Icon,
  },
};
</script>

<style>
.edit-button {
  border: none;
  background: none;
  color: var(--black);
}
.edit-button:hover {
  color: var(--blue-60);
}
.profile__section-header .edit-button {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
}
.profile__intro .edit-button {
  position: absolute;
  top: 1em;
  right: 0;
}
</style>
