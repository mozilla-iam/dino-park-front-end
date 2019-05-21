<template>
  <div>
    <header class="profile__section-header">
      <h2>Keys</h2>
      <EditButton
        v-if="userOnOwnProfile"
        section="keys"
        sectionId="keys"
      ></EditButton>
    </header>
    <template
      v-if="pgpPublicKeys && Object.keys(pgpPublicKeys.values).length > 0"
    >
      <h4 class="visually-hidden">PGP</h4>
      <Key
        v-for="[key, value] in Object.entries(pgpPublicKeys.values)"
        type="PGP"
        :title="key"
        :content="value"
        :key="`pgp-${key}`"
      />
    </template>
    <template
      v-if="sshPublicKeys && Object.keys(sshPublicKeys.values).length > 0"
    >
      <h4 class="visually-hidden">SSH</h4>
      <Key
        v-for="[key, value] in Object.entries(sshPublicKeys.values)"
        type="SSH"
        :title="key"
        :content="value"
        :key="`ssh-${key}`"
      />
    </template>
  </div>
</template>

<script>
import EditButton from '@/components/profile/edit/EditButton.vue';
import Key from '@/components/ui/Key.vue';

export default {
  name: 'ViewKeys',
  props: {
    pgpPublicKeys: Object,
    sshPublicKeys: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    EditButton,
    Key,
  },
};
</script>
