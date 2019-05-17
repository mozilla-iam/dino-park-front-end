<template>
  <EditMutationWrapper
    :editVariables="{
      pgpPublicKeys,
      sshPublicKeys,
    }"
    :initialValues="initialValues"
    formName="Edit keys"
    class="edit-keys"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Keys</h2>
      <PrivacySetting
        class="privacy-setting--large"
        label="PGP keys privacy levels"
        id="section-keys-privacy"
        profileFieldName="sshPublicKeys"
        :profileFieldObject="sshPublicKeys"
        :collapsedShowLabel="true"
      />
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
    <div class="edit-keys__buttons">
      <a
        class="button button--secondary button--action"
        href="https://login.mozilla.com"
      >
        <Icon id="external" :width="18" :height="18" />
        Add / Remove
      </a>
    </div>
  </EditMutationWrapper>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Key from '@/components/ui/Key.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditMutationWrapper from './EditMutationWrapper.vue';

export default {
  name: 'EditKeys',
  props: {
    pgpPublicKeys: Object,
    sshPublicKeys: Object,
    initialValues: Object,
  },
  components: {
    EditMutationWrapper,
    Icon,
    Key,
    PrivacySetting,
  },
  methods: {
    displayLevelsFor,
  },
};
</script>

<style>
.edit-keys__buttons {
  display: flex;
  justify-content: flex-end;
  margin: 2em 0;
}
</style>
