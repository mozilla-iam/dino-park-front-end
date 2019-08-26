<template>
  <section :class="cls">
    <a :id="`nav-${section}`" class="profile__anchor"></a>
    <slot name="edit" v-if="editing"></slot>
    <div v-else>
      <header class="profile__section-header">
        <h2>{{ title }}</h2>
        <EditButton
          v-if="editable && userOnOwnProfile"
          :section="section"
          :sectionId="section"
        ></EditButton>
      </header>
      <p v-if="empty">{{ userOnOwnProfile ? messageOwn : message }}</p>
      <slot name="view" v-else></slot>
    </div>
  </section>
</template>

<script>
import EditButton from '@/components/profile/edit/EditButton.vue';
import EmptyCard from '@/components/profile/view/EmptyCard.vue';

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
    cls() {
      let cls = 'profile__section';
      if (this.editing) {
        cls += ' profile__section--editing';
      } else if (this.empty) {
        cls += ' profile__section--disabled';
      }
      return cls;
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
