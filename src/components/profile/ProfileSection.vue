<template>
  <section :class="cssClasses">
    <a :id="`nav-${section}`" class="profile__anchor"></a>
    <slot name="edit" v-if="editing"></slot>
    <template v-else>
      <header class="profile__section-header">
        <h2>{{ title }}</h2>
        <EditButton
          v-if="editable && userOnOwnProfile"
          :section="section"
          :sectionId="section"
        ></EditButton>
      </header>
      <p v-if="empty">{{ emptyMessageText }}</p>
      <slot name="view" v-else></slot>
    </template>
  </section>
</template>

<script>
import EditButton from '@/components/profile/edit/EditButton.vue';
import EmptyCard from '@/components/profile/view/EmptyCard.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';

export default {
  name: 'ProfileSection',
  props: {
    section: String,
    title: String,
    editable: {
      type: Boolean,
      default: true,
    },
    userOnOwnProfile: Boolean,
    empty: {
      type: Boolean,
      default: true,
    },
    message: String,
    messageOwn: String,
    editing: Boolean,
  },
  components: { EditButton, EmptyCard },
  computed: {
    cssClasses() {
      return {
        profile__section: true,
        'profile__section--editing': this.editing,
        'profile__section--disabled': !this.editing && this.empty,
      };
    },
    emptyMessageText() {
      if (
        !this.userOnOwnProfile ||
        (this.$route.query.pa !== undefined &&
          this.$route.query.pa !== DISPLAY_LEVELS.private.value)
      ) {
        return this.message;
      }
      return this.messageOwn;
    },
  },
};
</script>

<style>
.profile__section--disabled {
  background-color: var(--gray-20);
  color: var(--gray-50);
  border: 2px solid var(--gray-30);
}
</style>
