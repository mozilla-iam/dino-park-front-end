<template>
  <div class="edit-keys">
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Keys</h2>
    </header>
    <template
      v-if="pgpPublicKeys && Object.keys(pgpPublicKeys.values || {}).length > 0"
    >
      <div class="edit-keys__header">
        <h3>PGP keys</h3>
        <PrivacySetting
          class="privacy-setting--large"
          label="PGP keys privacy levels"
          id="section-pgp-keys-privacy"
          profileFieldName="pgpPublicKeys"
          :profileFieldObject="{ display: pgpPublicKeys.metadata.display }"
          :collapsedShowLabel="true"
          :disabled="true"
        />
      </div>
      <Key
        v-for="[key, value] in Object.entries(pgpPublicKeys.values)"
        type="PGP"
        :title="key"
        :content="value"
        :key="`pgp-${key}`"
        :copyable="false"
      />
    </template>
    <template
      v-if="sshPublicKeys && Object.keys(sshPublicKeys.values || {}).length > 0"
    >
      <div class="edit-keys__header">
        <h3>SSH keys</h3>
        <PrivacySetting
          class="privacy-setting--large"
          label="SSH keys privacy levels"
          id="section-ssh-keys-privacy"
          profileFieldName="sshPublicKeys"
          :profileFieldObject="{ display: sshPublicKeys.metadata.display }"
          :collapsedShowLabel="true"
          :disabled="true"
        />
      </div>
      <Key
        v-for="[key, value] in Object.entries(sshPublicKeys.values)"
        type="SSH"
        :title="key"
        :content="value"
        :key="`ssh-${key}`"
        :copyable="false"
      />
    </template>
    <div class="edit-keys__buttons">
      <a
        class="button button--secondary button--action"
        href="https://login.mozilla.com"
      >
        <Icon id="external" :width="18" :height="18" />
        Add / Remove
      </a>
    </div>
    <div class="button-bar">
      <button
        type="button"
        class="button button--secondary"
        @click="
          $router.push({
            name: 'Profile',
            params: {
              username,
            },
          })
        "
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Key from '@/components/ui/Key.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';

export default {
  name: 'EditKeys',
  props: {
    pgpPublicKeys: Object,
    sshPublicKeys: Object,
    username: String,
  },
  components: {
    Icon,
    Key,
    PrivacySetting,
  },
};
</script>

<style>
.edit-keys__buttons {
  display: flex;
  justify-content: flex-end;
  margin: 2em 0;
}
.edit-keys__header {
  display: flex;
  align-items: center;
  margin: 1em 0;
}
.edit-keys__header > h3 {
  margin: 0;
}
.edit-keys__header .privacy-setting {
  margin-left: auto;
}
</style>
