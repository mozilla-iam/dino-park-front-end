<template>
  <section class="edit-information-container">
    <AccessGroupEditPanel title="Group details">
      <template v-slot:content>
        <div class="content-area__row">
          <label class="content-area__label">Group name</label>
          <p class="content-area__value">{{ groupName }}</p>
        </div>
        <div class="content-area__row multi-line markdown-outer-container">
          <label class="content-area__label">Group description</label>
          <TextArea
            :rows="5"
            :maxlength="5000"
            v-model="groupDescriptionData"
            class="content-area__value"
          ></TextArea>
          <p class="content-area__value-description">
            Use
            <a href="#">Markdown</a> for bold, italics, lists, and links.
          </p>
          <AccessGroupMarkdownGuide />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupDescriptionDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleDescriptionUpdateClicked()"
          >Update details</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel title="Group type">
      <template v-slot:content>
        <div class="content-area__row">
          <div class="radio-control">
            <input type="radio" value="reviewed" v-model="groupTypeData" />
            Reviewed
          </div>
          <div class="radio-control">
            <input type="radio" value="closed" v-model="groupTypeData" /> Closed
          </div>
        </div>
        <div class="content-area__row radio-control__description">
          <label class="description-label">Reviewed</label>
          <p class="description-content">
            When a group is set to "Reviewed", Mozillians are presented with a
            "Request to Join" button on the group page. Once clicked, Group
            Curators will receive a pending rquest notification, prompting them
            to review and accept or deny the membership. Group Curators can
            invite and/or remove people from the group if needed.
          </p>
        </div>
        <div class="content-area__row radio-control__description">
          <label class="description-label">Closed</label>
          <p class="description-content">
            "Closed" groups provide more tight control over a group. Mozillians
            cannot request membership, and can only be invited to join the group
            by Group Curators. Group Curators can, of course, remove people from
            the group if needed. Avoid using this group type unless you are
            absolutely sure it is necessary.
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupTypeDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleTypeUpdateClicked()"
          >Update type</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel title="Membership terms">
      <template v-slot:content>
        <div class="content-area__row">
          <div class="radio-control">
            <input
              type="checkbox"
              checked="true"
              v-model="groupTermsRequiredData"
            />
            New members should accept terms
          </div>
        </div>
        <div
          class="content-area__row multi-line markdown-outer-container"
          v-if="groupTermsRequiredData"
        >
          <label class="content-area__label">Terms and conditions text</label>
          <TextArea
            :rows="5"
            :maxlength="5000"
            v-model="groupTermsData"
            class="content-area__value"
          ></TextArea>
          <p class="content-area__value-description">
            Use
            <a href="#">Markdown</a> for bold, italics, lists, and links.
          </p>
          <AccessGroupMarkdownGuide />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupTermsDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleTermsUpdateClicked()"
          >Update terms</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel title="Close group">
      <template v-slot:content>
        <div class="content-area__row">
          <p class="content-area__description">
            This action will completely delete the access group and remove all
            members. To continue, please check the box labelled
            <span class="focus">I understand</span> and then click the
            <span class="focus">Close group</span> button.
          </p>
        </div>
        <div class="content-area__row close-group-container">
          <input type="checkbox" v-model="closeGroupConfirmed" />
          <label class="content-area__label"
            >I understand this action will delete the entire group</label
          >
          <Button
            :disabled="!closeGroupConfirmed"
            class="button--primary primary-action"
            @click="handleCloseGroupClicked"
            >Close group</Button
          >
        </div>
      </template>
    </AccessGroupEditPanel>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import AccessGroupMarkdownGuide from '@/components/access_group/AccessGroupMarkdownGuide.vue';

export default {
  name: 'AccessGroupInformationEdit',
  components: {
    TextInput,
    TextArea,
    Button,
    Icon,
    AccessGroupEditPanel,
    AccessGroupMarkdownGuide,
  },
  props: [],
  mounted() {},
  data() {
    const accessGroup = this.$store.getters['accessGroupV2/getGroup'];
    return {
      groupDescriptionData: accessGroup.description,
      groupDescriptionDirty: false,
      groupTermsData: this.$store.state.groupTOS,
      groupTermsRequiredData: accessGroup.terms,
      groupTermsDirty: false,
      groupTypeData: accessGroup.type,
      groupTypeDirty: false,
      closeGroupConfirmed: false,
    };
  },
  watch: {
    groupDescriptionData(val) {
      this.groupDescriptionDirty = true;
    },
    groupTermsData(val) {
      this.groupTermsDirty = true;
    },
    groupTypeData(val) {
      this.groupTypeDirty = true;
    },
    groupTermsRequiredData(val) {
      this.groupTermsDirty = true;
    },
  },
  methods: {
    handleDescriptionUpdateClicked() {
      this.$store
        .dispatch('updateAccessGroupDescription', this.groupDescriptionData)
        .then(() => {
          this.groupDescriptionDirty = false;
          this.$root.$emit('toast', {
            content: 'Group description updated',
          });
        });
    },
    handleTypeUpdateClicked() {
      this.$store
        .dispatch('updateAccessGroupType', this.groupTypeData)
        .then(() => {
          this.groupTypeDirty = false;
          this.$root.$emit('toast', {
            content: 'Group type updated',
          });
        });
    },
    handleTermsUpdateClicked() {
      if (!this.groupTermsRequiredData) {
        this.$store.dispatch('deleteTOS').then(() => {
          this.groupTermsDirty = false;
          this.$root.$emit('toast', {
            content: 'Group terms of service removed',
          });
        });
      } else {
        this.$store
          .dispatch('updateAccessGroupTOS', this.groupTermsData)
          .then(() => {
            this.groupTermsDirty = false;
            this.$root.$emit('toast', {
              content: 'Group terms of service updated',
            });
          });
      }
    },
    handleCloseGroupClicked() {
      const groupName = this.accessGroup.name;
      this.$store.dispatch('closeAccessGroup').then(() => {
        this.$root.$emit('toast', {
          content: `Access group ${groupName} has been closed`,
        });
        this.$router.push({
          path: '/',
        });
      });
    },
  },
  computed: {
    ...mapGetters({
      accessGroup: 'accessGroupV2/getGroup',
    }),
    groupName() {
      return this.accessGroup.name;
    },
  },
};
</script>

<style>
.edit-information {
  padding: 1em;
}

.content-area__row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2em 0;
  align-items: center;
}

.content-area__row.markdown-outer-container .markdown-guide-container {
  position: absolute;
  left: calc(100% + 1em);
  top: 2.9em;
  width: 20.5em;
}

.content-area__row .radio-control {
  margin: 0 1em 0 0;
  color: var(--gray-40);
}

.content-area__row .radio-control > input {
  margin: 0 0.5em 0 0;
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
  color: var(--gray-40);
  height: 1.5em;
}

.content-area .focus {
  font-weight: bold;
}

.content-area .content-area__value {
  width: 70%;
}

.content-area p.content-area__value {
  color: var(--gray-40);
}
.content-area .content-area__row.multi-line .content-area__value {
  width: 100%;
  margin-top: 1em;
}

.content-area .content-area__value-description {
  color: var(--gray-40);
}

.edit-information-section .edit-information-section__footer {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid var(--gray-40);
}

.edit-information-section .edit-information-section__footer .button {
  margin-top: 2em;
}
</style>
