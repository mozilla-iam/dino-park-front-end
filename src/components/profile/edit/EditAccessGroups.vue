<template>
  <EditMutationWrapper
    :editVariables="{
      accessInformationMozilliansorg: editMozilliansorgGroups.display,
    }"
    :initialValues="initialAccessInformation"
    formName="Edit access groups"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Access Groups</h2>
    </header>
    <div class="profile__access-groups">
      <div v-if="initialAccessInformation.ldap.values">
        <div class="edit-access-groups__mozillians-header">
          <h3>LDAP</h3>
          <PrivacySetting
            class="privacy-setting--large"
            label="LDAP access groups privacy levels"
            id="section-access-groups-ldap-privacy"
            profileFieldName="accessInformation.ldap"
            :profileFieldObject="initialAccessInformation.ldap.metadata.display"
            :collapsedShowLabel="true"
            :disabled="true"
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
      </div>
      <div>
        <div class="edit-access-groups__mozillians-header">
          <h3>mozillas.org</h3>
          <PrivacySetting
            class="privacy-setting--large"
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
            icon="dino"
          >
            <ExternalLink
              :href="
                `https://mozillians.org/group/${encodeURIComponent(group)}`
              "
              >{{ group }}</ExternalLink
            >
          </IconBlock>
        </IconBlockList>
        <p v-else>
          You have not joined any mozilliansorg access group.
        </p>
        <p class="edit-access-groups__mozillians-footer">
          Mozillians access groups are currently managed at mozillians.org
        </p>
        <a
          id="access-information__external-link"
          class="button button--secondary button--action"
          href="https://mozillians.org/user/edit/#mygroups"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon id="external" :width="18" :height="18" />
          Manage
        </a>
      </div>
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
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';

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
  methods: {
    displayLevelsFor,
  },
  mounted() {
    this.$refs.header.focus();
  },
  data() {
    const {
      mozilliansorg: {
        values = {},
        metadata: { display = DISPLAY_LEVELS.private.value } = {},
      } = {},
    } = this.initialAccessInformation;
    return {
      editMozilliansorgGroups: {
        display,
      },
      mozilliansorgGroups: [...Object.entries(values)],
    };
  },
};
</script>

<style>
#access-information__external-link {
  margin-left: auto;
  max-width: max-content;
}
.edit-access-groups__mozillians-header {
  display: flex;
}
.edit-access-groups__mozillians-header .privacy-setting {
  margin-left: auto;
}
.edit-access-groups__mozillians-footer {
  margin-top: 1.5em;
  padding-left: 4em;
  text-align: right;
  color: var(--gray-50);
}
</style>
