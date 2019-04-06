<template>
  <div>
    <header class="profile__section-header">
      <h2>Contact</h2>
      <EditButton
        v-if="userOnOwnProfile"
        section="contact"
        sectionId="contact"
      ></EditButton>
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
        :subHeading="destructPhoneKey(key).view"
        icon="phone"
      >
        <a :href="`tel:${value}`">{{ value }}</a>
      </IconBlock>
    </IconBlockList>
  </div>
</template>

<script>
import PhoneNumbersMixin from '@/components/_mixins/PhoneNumbersMixin.vue';
import EditButton from '@/components/profile/edit/EditButton.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';

export default {
  name: 'ViewContact',
  props: {
    primaryEmail: Object,
    phoneNumbers: Object,
    userOnOwnProfile: Boolean,
  },
  mixins: [PhoneNumbersMixin],
  components: {
    EditButton,
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
