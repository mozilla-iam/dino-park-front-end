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
      <PrivacySetting
        class="privacy-setting--large"
        label="Access groups privacy levels"
        id="section-access-groups-privacy"
        profileFieldName="accessInformation.mozilliansorg"
        :profileFieldObject="editMozilliansorgGroups"
        :collapsedShowLabel="true"
      />
    </header>
    <IconBlockList
      v-if="mozilliansorgGroups.length > 0"
      class="icon-block-list--multi-col"
    >
      <IconBlock
        v-for="[group] in mozilliansorgGroups"
        :key="`group-${group}`"
        icon="dino"
      >
        {{ group }}
      </IconBlock>
    </IconBlockList>
    <p v-else>
      You have not joined any mozilliansorg access group.
    </p>
    <a
      id="access-information__external-link"
      class="button button--secondary button--action"
      href="https://mozillians.org"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Icon id="external" :width="18" :height="18" />
      Manage
    </a>
  </EditMutationWrapper>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditMutationWrapper from './EditMutationWrapper.vue';

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
    console.log(JSON.stringify(this.initialAccessInformation));
    const {
      mozilliansorg: {
        metadata: { display = DISPLAY_LEVELS.private.value },
      },
    } = this.initialAccessInformation;
    return {
      editMozilliansorgGroups: {
        display,
      },
      mozilliansorgGroups: [
        ...Object.entries(
          this.initialAccessInformation.mozilliansorg.values || {},
        ),
      ],
    };
  },
};
</script>

<style>
#access-information__external-link {
  margin-left: auto;
  max-width: max-content;
}
</style>
