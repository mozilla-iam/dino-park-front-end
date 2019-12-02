<template>
  <EditMutationWrapper
    :editVariables="{
      accessInformationMozilliansorgDisplay: editMozilliansorgGroups.display,
      accessInformationLdapDisplay: editLdapGroups.display,
    }"
    formName="Edit access groups"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Access Groups</h2>
    </header>
    <div class="edit-profile__access-groups">
      <template v-if="initialAccessInformation.ldap.values">
        <div class="edit-access-groups__header">
          <h3>LDAP</h3>
          <PrivacySetting
            class="privacy-select--large"
            label="LDAP access groups privacy levels"
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
          >
            {{ group }}
          </IconBlock>
        </IconBlockList>
        <hr role="presentation" />
      </template>
      <div class="edit-access-groups__header">
        <h3>mozillians.org</h3>
        <PrivacySetting
          class="privacy-select--large"
          label="Mozillians.org access groups privacy levels"
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
          <ExternalLink
            :href="`https://mozillians.org/group/${encodeURIComponent(group)}`"
            >{{ group }}</ExternalLink
          >
        </IconBlock>
      </IconBlockList>
      <p v-else>
        You have not joined any mozilliansorg access group.
      </p>
      <a
        id="access-information__external-link"
        class="button button--secondary button--action"
        href="https://mozillians.org/user/edit/#mygroups"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon id="external" :width="18" :height="18" />
        Manage at mozillians.org
      </a>
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
#access-information__external-link {
  margin-left: auto;
  max-width: max-content;
}
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
}
.edit-access-groups__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
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
</style>
