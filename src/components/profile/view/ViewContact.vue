<template>
  <div>
    <h3 class="visually-hidden">{{ fluent('profile_contact', 'options') }}</h3>
    <IconBlockList class="icon-block-list--multi-col">
      <IconBlock
        v-if="primaryEmail.value"
        :heading="fluent('profile_email')"
        :subHeading="fluent('profile_email_primary')"
        icon="email"
      >
        <a :href="`mailto:${primaryEmail.value}`">{{ primaryEmail.value }}</a>
      </IconBlock>
      <IconBlock
        v-if="secondaryEmail"
        :heading="fluent('profile_email')"
        :subHeading="fluent('profile_email_secondary')"
        icon="email"
      >
        <a :href="`mailto:${secondaryEmail}`">{{ secondaryEmail }}</a>
      </IconBlock>
      <IconBlock
        v-for="[key, value] in Object.entries(phoneNumbers.values || {})"
        :key="`phoneNumber-${key}`"
        :heading="fluent('profile_phone')"
        :subHeading="getTranslatedLabel(destructPhoneKey(key).view)"
        icon="phone"
      >
        <a :href="`tel:${value}`">{{ value }}</a>
      </IconBlock>
    </IconBlockList>
  </div>
</template>

<script>
import PhoneNumbersMixin from '@/components/_mixins/PhoneNumbersMixin.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';

export default {
  name: 'ViewContact',
  props: {
    identities: Object,
    primaryEmail: Object,
    phoneNumbers: Object,
    userOnOwnProfile: Boolean,
  },
  mixins: [PhoneNumbersMixin],
  components: {
    IconBlock,
    IconBlockList,
  },
  data() {
    return {
      secondaryEmail:
        this.identities.custom1PrimaryEmail.value ||
        this.identities.custom2PrimaryEmail.value,
    };
  },
};
</script>
