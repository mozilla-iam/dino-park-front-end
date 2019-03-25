<template>
  <div>
    <header class="profile__section-header">
      <h2>Contact</h2>
      <button
        v-if="userOnOwnProfile"
        class="profile__edit-button"
        @click="
          $router.push({
            name: 'Edit Profile',
            query: {
              section: 'contact',
            },
          })
        "
      >
        <img src="@/assets/images/icon-pencil.svg" alt="Edit" />
      </button>
    </header>
    <h3 class="visually-hidden">Contact options</h3>
    <IconBlockList modifier="icon-block-list--multi-col">
      <IconBlock heading="Email" subHeading="primary" icon="email">
        <a :href="`mailto:${primaryEmail.value}`">{{ primaryEmail.value }}</a>
      </IconBlock>
      <IconBlock
        v-for="[key, value] in Object.entries(phoneNumbers.values || {})"
        :key="`phoneNumber-${key}`"
        heading="Phone"
        :subHeading="key"
        icon="phone"
      >
        <a :href="`tel:${value}`">{{ value }}</a>
      </IconBlock>
    </IconBlockList>
  </div>
</template>

<script>
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';

export default {
  name: 'ViewContact',
  props: {
    primaryEmail: Object,
    phoneNumbers: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    IconBlock,
    IconBlockList,
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
};
</script>
