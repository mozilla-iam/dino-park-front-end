<template>
  <EditMutationWrapper
    :editVariables="{
      accessInformationMozilliansorgDisplay: editMozilliansorgGroups.display,
      accessInformationLdapDisplay: editLdapGroups.display,
    }"
    :formName="fluent('profile_access-groups', 'edit')"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>{{ fluent('profile_access-groups') }}</h2>
    </header>
    <div class="edit-profile__access-groups">
      <template v-if="initialAccessInformation.ldap.values">
        <div class="edit-access-groups__header">
          <h3>{{ fluent('profile_access-groups_ldap') }}</h3>
          <Tooltip
            :buttonText="fluent('profile_access-groups_ldap', 'tooltip-open')"
            :alternateButtonText="
              fluent('profile_access-groups_ldap', 'tooltip-close')
            "
            >{{ fluent('profile_access-groups_ldap', 'tooltip') }}</Tooltip
          >
          <PrivacySetting
            class="privacy-select--large"
            :label="fluent('profile_access-groups_ldap', 'privacy')"
            id="section-access-groups-ldap-privacy"
            profileFieldName="accessInformation.ldap"
            :profileFieldObject="editLdapGroups"
            :collapsedShowLabel="true"
          />
        </div>
        <IconBlockList class="icon-block-list--multi-col">
          <IconBlock
            v-for="[group] in Object.entries(
              initialAccessInformation.ldap.values,
            )"
            :key="`group-${group}`"
            icon="idcard"
            >{{ group }}</IconBlock
          >
        </IconBlockList>
        <hr role="presentation" />
      </template>
      <div class="edit-access-groups__header">
        <h3>{{ fluent('profile_access-groups_mozillians') }}</h3>
        <Tooltip
          :buttonText="
            fluent('profile_access-groups_mozillians', 'tooltip-open')
          "
          :alternateButtonText="
            fluent('profile_access-groups_mozillians', 'tooltip-close')
          "
          >{{ fluent('profile_access-groups_mozillians', 'tooltip') }}</Tooltip
        >
        <PrivacySetting
          class="privacy-select--large"
          :label="fluent('profile_access-groups_mozillians', 'privacy')"
          id="section-access-groups-mozillians-privacy"
          profileFieldName="accessInformation.mozilliansorg"
          :profileFieldObject="editMozilliansorgGroups"
          :collapsedShowLabel="true"
        />
      </div>
      <IconBlockList
        v-if="mozilliansorgGroups.length > 0"
        class="icon-block-list--multi-col"
      >
        <IconBlock
          v-for="[group] in mozilliansorgGroups"
          :key="`group-${group}`"
          icon="moz"
        >
          <RouterLink
            target="_blank"
            :to="{
              path: `/a/${encodeURIComponent(group)}`,
            }"
            >{{ group }}</RouterLink
          >
        </IconBlock>
      </IconBlockList>
      <p v-else>{{ fluent('profile_access-groups_mozillians', 'none') }}</p>
    </div>
  </EditMutationWrapper>
</template>

<script>
import EditMutationWrapper from './EditMutationWrapper.vue';
import ExternalLink from '@/components/ui/ExternalLink.vue';
import Icon from '@/components/ui/Icon.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';
import Tooltip from '@/components/ui/Tooltip.vue';

export default {
  name: 'EditAccessGroups',
  props: {
    initialAccessInformation: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    EditMutationWrapper,
    ExternalLink,
    Icon,
    IconBlock,
    IconBlockList,
    PrivacySetting,
    Tooltip,
  },
  mounted() {
    this.$refs.header.focus();
  },
  data() {
    const {
      mozilliansorg: {
        values: mozilliansorgValues = {},
        metadata: {
          display: mozilliansorgDisplay = DISPLAY_LEVELS.staff.value,
        } = {},
      } = {},
      ldap: {
        metadata: { display: ldapDisplay = DISPLAY_LEVELS.private.value } = {},
      } = {},
    } = this.initialAccessInformation;
    return {
      editMozilliansorgGroups: {
        display: mozilliansorgDisplay,
      },
      editLdapGroups: {
        display: ldapDisplay,
      },
      mozilliansorgGroups: [...Object.entries(mozilliansorgValues || {})],
    };
  },
};
</script>

<style>
.edit-profile__access-groups h3 {
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 1em;
  padding-bottom: 1em;
}

.edit-access-groups__header:first-child {
  margin-top: unset;
}
.edit-access-groups__header {
  margin-top: 2em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.edit-access-groups__header .tooltip {
  margin-left: 0.5em;
}
.edit-access-groups__header .privacy-select {
  margin-left: auto;
}
.edit-profile__access-groups hr {
  margin-top: 1.5em;
  margin-left: 1em;
}
.edit-profile__access-groups .icon-block {
  color: var(--gray-50);
}

.access-information__actions {
  display: flex;
  flex-direction: row-reverse;
}

.access-information__actions .button--action {
  max-width: max-content;
  margin-left: 1em;
}
</style>
