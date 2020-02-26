<template>
  <section class="edit-invitations-container">
    <AccessGroupEditPanel
      :title="
        `${fluent(
          'access-group_pending-invitations'
        )} (${totalInvitationsAndRequests})`
      "
    >
      <template v-slot:content>
        <ul class="pending-invitations-container">
          <li
            class="pending-invitations-container__item"
            v-for="(invitation, idx) in groupInvitations"
            :key="idx"
          >
            <AccessGroupMemberListDisplay :member="invitation" />
            <div class="pending-invitations-container__actions">
              <Button
                class="tertiary-action delete"
                @click="handleRemoveClicked(invitation)"
              >
                <Icon id="x" :width="16" :height="16" />
              </Button>
            </div>
          </li>
        </ul>
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel :title="fluent('access-group_invite-member')">
      <template v-slot:content>
        <div class="members-list-container">
          <TagSelector
            v-model="newInvites"
            :getLabel="getTagLabel"
            :updateAutoComplete="updateAutoCompleteList"
          />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!newInvitesDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleAddNewInvitesClicked()"
          >{{ fluent('access-group_invite-member', 'invite') }}</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel
      :title="fluent('access-group_email-invite-text')"
      v-if="getFeature('customInvitationText')"
    >
      <template v-slot:content>
        <div class="members-expiration-container">
          <div class="content-area__row">
            <div class="radio-control">
              <input type="checkbox" v-model="emailInviteTextEnabled" />
              {{ fluent('access-group_email-invite-text', 'checkbox') }}
            </div>
          </div>
        </div>
        <div class="content-area__row multi-line" v-if="emailInviteTextEnabled">
          <label class="content-area__label">{{
            fluent('access-group_email-invite-text', 'description')
          }}</label>
          <TextArea
            :rows="5"
            :maxlength="5000"
            v-model="emailInviteText"
            class="content-area__value"
          ></TextArea>
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!emailInviteTextDirty"
          @click="handleUpdateInviteTextClicked"
          class="button--secondary button--action row-primary-action"
          >{{
            fluent('access-group_email-invite-text', 'update-invite-text')
          }}</Button
        >
      </template>
    </AccessGroupEditPanel>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import TagSelector from '@/components/ui/TagSelector.vue';
import AccessGroups from '@/assets/js/access-groups';
import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel';
import AccessGroupMemberListDisplay from '@/components/access_group/AccessGroupMemberListDisplay.vue';

export default {
  name: 'AccessGroupInvitationsEdit',
  components: {
    TextInput,
    TextArea,
    Button,
    Icon,
    AccessGroupEditPanel,
    TagSelector,
    AccessGroupMemberListDisplay,
  },
  props: [],
  mounted() {},
  data() {
    const invitationConfig = this.$store.getters[
      'accessGroup/getInvitationConfig'
    ];
    return {
      newInvites: [],
      newInvitesDirty: false,
      emailInviteTextEnabled: invitationConfig !== null,
      emailInviteText: invitationConfig,
      emailInviteTextDirty: false,
    };
  },
  watch: {
    newInvites(value) {
      if (value.length > 0) {
        this.newInvitesDirty = true;
      }
    },
    emailInviteTextEnabled(value) {
      this.emailInviteTextDirty = true;
    },
    emailInviteText(value) {
      this.emailInviteTextDirty = true;
    },
  },
  methods: {
    ...mapActions({
      resendInvitation: 'accessGroup/resendInvitation',
      deleteInvitation: 'accessGroup/deleteInvitation',
      sendInvitations: 'accessGroup/sendInvitations',
      updateInviteText: 'accessGroup/updateInviteText',
    }),
    handleResendClicked(invitation) {
      this.resendInvitation(invitation).then(result => {
        this.tinyNotification('access-group-invite-email-resent');
      });
    },
    handleRemoveClicked(invitation) {
      this.deleteInvitation(invitation).then(result => {
        this.tinyNotification('access-group-invite-deleted');
      });
    },
    getTagLabel(curator) {
      return curator.name;
    },
    updateAutoCompleteList(search) {
      return new Promise((res, rej) => {
        AccessGroups.getUsers(search, this.groupName).then(results => {
          res(
            results.map(profile => DisplayMemberViewModel.fromUserData(profile))
          );
        });
      });
    },
    handleAddNewInvitesClicked() {
      this.sendInvitations({
        invites: this.newInvites,
        expiration: this.groupExpiration,
      }).then(result => {
        this.tinyNotification('access-group-members-invite-success');
        this.newInvites = [];
        this.newInvitesDirty = false;
      });
    },
    handleUpdateInviteTextClicked() {
      this.updateInviteText(this.newInvites).then(result => {
        this.tinyNotification('access-group-invitation-text-updated');
        this.emailInviteTextDirty = false;
      });
    },
  },
  computed: {
    ...mapGetters({
      groupName: 'accessGroup/getGroupName',
      groupExpiration: 'accessGroup/getExpiration',
      groupInvitations: 'accessGroup/getInvitations',
    }),
    // TODO: Eventually include request numbers in this number
    totalInvitationsAndRequests() {
      return this.groupInvitations.length;
    },
  },
};
</script>

<style>
.edit-invitations-container {
  /* enable tag selector dropdown */
  overflow: visible;
}

.pending-invitations-container {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.pending-invitations-container .pending-invitations-container__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pending-invitations-container
  .pending-invitations-container__item:nth-child(odd) {
  background: var(--gray-20);
}

.pending-invitations-container__item .pending-invitations-container__actions {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pending-invitations-container__actions .secondary-button {
  border: 1px solid var(--gray-60);
  color: var(--gray-60);
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  height: 2em;
  background: var(--white);
}

.pending-invitations-container__actions .tertiary-action {
  border: none;
  background: none;
  color: #ff0039;
  padding-right: 0;
  display: inline-block;
}

.content-area__row.multi-line .content-area__value {
  width: 100%;
  margin-top: 1em;
}
</style>
