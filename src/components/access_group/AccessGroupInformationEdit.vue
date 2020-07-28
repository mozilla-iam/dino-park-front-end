<template>
  <section class="edit-information-container">
    <AccessGroupEditPanel
      form="descriptionForm"
      :handler="handleDescriptionUpdate"
      :title="fluent('access-group_details')"
    >
      <template v-slot:content>
        <div class="content-area__row">
          <label class="content-area__label">{{
            fluent('access-group_details', 'name')
          }}</label>
          <p class="content-area__value">{{ groupName }}</p>
        </div>
        <div class="content-area__row multi-line markdown-outer-container">
          <label class="content-area__label">{{
            fluent('access-group_details', 'description')
          }}</label>
          <TextArea
            :rows="5"
            :maxlength="1024"
            v-model="groupDescriptionData"
            class="content-area__value"
          ></TextArea>
          <AccessGroupMarkdownGuide />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          type="submit"
          :disabled="!groupDescriptionDirty"
          class="button--secondary button--action row-primary-action"
          >{{ fluent('access-group_details', 'update-details') }}</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel
      :title="fluent('access-group_type')"
      v-if="getFeature('editGroupType')"
    >
      <template v-slot:content>
        <div class="content-area__row">
          <div
            class="radio-control"
            v-for="(type, idx) in groupTypes"
            :key="idx"
          >
            <input type="radio" :value="type" v-model="groupTypeData" />
            {{ type }}
          </div>
        </div>
        <div class="content-area__row radio-control__description">
          <label class="description-label">{{
            fluent('access-group_type', 'closed-heading')
          }}</label>
          <p class="description-content">
            {{ fluent('access-group_type', 'closed-content') }}
          </p>
        </div>
        <div class="content-area__row radio-control__description">
          <label class="description-label">{{
            fluent('access-group_type', 'reviewed-heading')
          }}</label>
          <p class="description-content">
            {{ fluent('access-group_type', 'reviewed-content') }}
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupTypeDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleTypeUpdateClicked()"
          >{{ fluent('access-group_type', 'update-type') }}</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel
      form="termsForm"
      :handler="handleTermsUpdate"
      :title="fluent('access-group_terms')"
    >
      <template v-slot:content>
        <div class="content-area__row">
          <div class="radio-control">
            <input
              id="require-terms"
              type="checkbox"
              v-model="groupTermsRequiredData"
            />
            <label for="require-terms">{{
              fluent('access-group_terms', 'terms-required')
            }}</label>
          </div>
        </div>
        <div
          class="content-area__row multi-line markdown-outer-container"
          v-if="groupTermsRequiredData"
        >
          <label class="content-area__label">{{
            fluent('access-group_terms', 'terms-intro')
          }}</label>
          <TextArea
            :rows="5"
            :maxlength="7000"
            v-model="groupTermsData"
            class="content-area__value"
          ></TextArea>
          <AccessGroupMarkdownGuide />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          type="submit"
          :disabled="!groupTermsDirty"
          class="button--secondary button--action row-primary-action"
          >{{ fluent('access-group_terms', 'update-terms') }}</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel
      :title="fluent('access-group_email-invite-text')"
      form="invitationEmailForm"
      :handler="handleUpdateInviteTextClicked"
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
          <label class="content-area__label"
            ><p>
              {{ fluent('access-group_email-invite-text', 'description-1') }}
            </p>
            <p>
              {{ fluent('access-group_email-invite-text', 'description-2') }}
            </p></label
          >
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
          type="submit"
          class="button--secondary button--action row-primary-action"
          >{{
            fluent('access-group_email-invite-text', 'update-invite-text')
          }}</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel
      form="deleteFrom"
      :handler="handleDeleteGroup"
      :title="fluent('access-group_delete-group')"
    >
      <template v-slot:content>
        <div class="content-area__row">
          <p class="content-area__description">
            <Fluent
              id="access-group_delete-group"
              attr="info"
              :args="{ groupName }"
            />
          </p>
        </div>
        <div class="delete-group__action">
          <label>
            <input id="enable-delete" type="checkbox" v-model="enableDelete" />
            {{ fluent('access-group_delete-group', 'check-text') }}</label
          >
          <Button
            :disabled="!enableDelete"
            type="submit"
            class="button--red row-primary-action"
            >{{ fluent('access-group_delete-group', 'delete-group') }}</Button
          >
        </div>
      </template>
    </AccessGroupEditPanel>
  </section>
</template>

<script>
import { ACCESS_GROUP_INDEX_PAGE } from '@/router';
import { mapGetters, mapActions } from 'vuex';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import AccessGroupMarkdownGuide from '@/components/access_group/AccessGroupMarkdownGuide.vue';

export default {
  name: 'AccessGroupInformationEdit',
  components: {
    TextArea,
    Button,
    AccessGroupEditPanel,
    AccessGroupMarkdownGuide,
  },
  props: [],
  mounted() {},
  data() {
    const invitationEmail = this.$store.getters[
      'accessGroup/getInvitationEmail'
    ];
    const accessGroup = this.$store.getters['accessGroup/getGroup'];
    const terms = this.$store.getters['accessGroup/getTerms'];
    return {
      groupDescriptionData: accessGroup.description,
      groupDescriptionDirty: false,
      groupTermsData: terms,
      groupTermsRequiredData: accessGroup.terms,
      groupTermsDirty: false,
      groupTypeData: accessGroup.type,
      groupTypeDirty: false,
      enableDelete: false,
      emailInviteTextEnabled: Boolean(invitationEmail),
      emailInviteText: invitationEmail,
      emailInviteTextDirty: false,
    };
  },
  watch: {
    groupDescriptionData() {
      this.groupDescriptionDirty = true;
    },
    groupTermsData() {
      this.groupTermsDirty = true;
    },
    groupTypeData() {
      this.groupTypeDirty = true;
    },
    groupTermsRequiredData() {
      this.groupTermsDirty = true;
    },
  },
  methods: {
    ...mapActions({
      updateGroup: 'accessGroup/updateGroup',
      deleteTerms: 'accessGroup/deleteTerms',
      updateTerms: 'accessGroup/updateTerms',
      addTerms: 'accessGroup/addTerms',
      deleteGroup: 'accessGroup/deleteGroup',
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
      updateInvitationEmail: 'accessGroup/updateInvitationEmail',
    }),
    async handleDescriptionUpdate() {
      await this.updateGroup({
        field: 'description',
        value: this.groupDescriptionData,
      });
      this.groupDescriptionDirty = false;
      this.tinyNotification('access-group-description-updated');
    },
    handleTypeUpdateClicked() {
      this.updateGroup({ field: 'type', value: this.groupTypeData }).then(
        () => {
          this.groupTypeDirty = false;
          this.tinyNotification('access-group-type-updated');
        },
      );
    },
    async handleTermsUpdate() {
      let tinyFluentSelector;
      if (!this.groupTermsRequiredData && this.accessGroup.terms) {
        await this.deleteTerms();
        tinyFluentSelector = 'access-group-terms-removed';
      } else if (!this.accessGroup.terms && this.groupTermsData.length > 0) {
        await this.addTerms(this.groupTermsData);
        tinyFluentSelector = 'access-group-terms-updated';
      } else {
        await this.updateTerms(this.groupTermsData);
        tinyFluentSelector = 'access-group-terms-updated';
      }
      this.groupTermsDirty = false;
      this.tinyNotification(tinyFluentSelector);
    },
    async handleDeleteGroup() {
      try {
        await this.deleteGroup();
        this.$root.$emit('toast', {
          content: this.fluent({
            id: 'access-group_delete-group',
            attr: 'success',
            args: { groupName: this.groupName },
          }),
        });
        this.$router.push({ name: ACCESS_GROUP_INDEX_PAGE });
      } catch (e) {
        this.$root.$emit('toast', {
          content: this.fluent({
            id: 'access-group_delete-group',
            attr: 'fail',
            args: { groupName: this.groupName },
          }),
        });
      }
    },
    handleUpdateInviteTextClicked() {
      const text = this.emailInviteTextEnabled ? this.emailInviteText : '';
      this.updateInvitationEmail(text).then(() => {
        this.tinyNotification('access-group-invitation-text-updated');
        this.emailInviteTextDirty = false;
      });
    },
  },
  computed: {
    ...mapGetters({
      accessGroup: 'accessGroup/getGroup',
      terms: 'accessGroup/getTerms',
    }),
    groupName() {
      return this.accessGroup.name;
    },
  },
};
</script>

<style scoped>
.edit-information {
  padding: 1em;
}

.edit-information-container {
  padding-bottom: 2em;
}

.content-area__row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2em 0;
  align-items: center;
}

.content-area__row.markdown-outer-container .markdown-guide-container {
  width: 100%;
}

@media (min-width: 57.5em) {
  .content-area__row.markdown-outer-container .markdown-guide-container {
    position: absolute;
    left: calc(100% + 1em);
    top: 2.9em;
    width: 20.5em;
  }
}

.content-area__row.action-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.content-area__row.radio-control__description {
  flex-direction: column;
  align-items: flex-start;
}

.radio-control__description .description-label {
  font-weight: bold;
  margin-bottom: 0.5em;
}

.radio-control__description .description-content {
  margin: 0;
}

.content-area__row.multi-line {
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
}

.content-area .content-area__label {
  flex: 1;
  color: var(--gray-50);
  height: 1.5em;
}

.content-area .focus {
  font-weight: bold;
}

.content-area .content-area__value {
  width: 70%;
}

.content-area p.content-area__value {
  color: var(--gray-50);
}
.content-area .content-area__row.multi-line .content-area__value {
  width: 100%;
  margin-top: 1em;
}

.content-area .content-area__value-description {
  color: var(--gray-50);
}

.edit-information-section .edit-information-section__footer {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid var(--gray-40);
}

.edit-information-section .edit-information-section__footer .button {
  margin-top: 2em;
}

.close-group__action .button[disabled='disabled'] {
  border: 1px solid var(--gray-40);
  color: var(--black);
  background: var(--white);
}

.delete-group__action {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.delete-group__action .button {
  margin-left: auto;
}
</style>
