<template>
  <section class="edit-information-container">
    <AccessGroupEditPanel :title="fluent('access-group_edit-details')">
      <template v-slot:content>
        <div class="content-area__row">
          <label class="content-area__label">{{ fluent('access-group_edit-details', 'name')}}</label>
          <p class="content-area__value">{{ groupName }}</p>
        </div>
        <div class="content-area__row multi-line markdown-outer-container">
          <label class="content-area__label">{{ fluent('access-group_edit-details', 'description')}}</label>
          <TextArea
            :rows="5"
            :maxlength="5000"
            v-model="groupDescriptionData"
            class="content-area__value"
          ></TextArea>
          <p class="content-area__value-description">
            {{ fluent('access-group_markdown', 'intro-part-1')}}
            <a
              href="#"
            >{{ fluent('access-group_markdown', 'intro-part-link')}}</a>
            {{ fluent('access-group_markdown', 'intro-part-2')}}
          </p>
          <AccessGroupMarkdownGuide />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupDescriptionDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleDescriptionUpdateClicked"
        >{{ fluent('access-group_edit-details', 'update-details')}}</Button>
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel
      :title="fluent('access-group_edit-type')"
      v-if="getFeature('edit-group-type')"
    >
      <template v-slot:content>
        <div class="content-area__row">
          <div class="radio-control" v-for="(type, idx) in groupTypes" :key="idx">
            <input type="radio" :value="type" v-model="groupTypeData" />
            {{ type }}
          </div>
        </div>
        <div class="content-area__row radio-control__description">
          <label class="description-label">{{ fluent('access-group_edit-type', 'reviewed-heading')}}</label>
          <p class="description-content">{{ fluent('access-group_edit-type', 'reviewed-content')}}</p>
        </div>
        <div class="content-area__row radio-control__description">
          <label class="description-label">{{ fluent('access-group_edit-type', 'closed-heading')}}</label>
          <p class="description-content">{{ fluent('access-group_edit-type', 'closed-content')}}</p>
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupTypeDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleTypeUpdateClicked()"
        >{{ fluent('access-group_edit-type', 'update-type')}}</Button>
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel :title="fluent('access-group_edit-terms')">
      <template v-slot:content>
        <div class="content-area__row">
          <div class="radio-control">
            <input type="checkbox" v-model="groupTermsRequiredData" />
            {{ fluent('access-group_edit-terms', 'terms-required')}}
          </div>
        </div>
        <div
          class="content-area__row multi-line markdown-outer-container"
          v-if="groupTermsRequiredData"
        >
          <label class="content-area__label">{{ fluent('access-group_edit-terms', 'terms-intro')}}</label>
          <TextArea
            :rows="5"
            :maxlength="5000"
            v-model="groupTermsData"
            class="content-area__value"
          ></TextArea>
          <p class="content-area__value-description">
            {{ fluent('access-group_markdown', 'intro-part-1')}}
            <a
              href="#"
            >{{ fluent('access-group_markdown', 'intro-part-link')}}</a>
            {{ fluent('access-group_markdown', 'intro-part-2')}}
          </p>
          <AccessGroupMarkdownGuide />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupTermsDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleTermsUpdateClicked()"
        >{{ fluent('access-group_edit-terms', 'update-terms')}}</Button>
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel :title="fluent('access-group_close-group')">
      <template v-slot:content>
        <div class="content-area__row">
          <p class="content-area__description">
            {{fluent('access-group_close-group', 'part-1')}}
            <span
              class="focus"
            >{{fluent('access-group_close-group', 'part-2')}}</span>
            {{fluent('access-group_close-group', 'part-3')}}
            <span
              class="focus"
            >{{fluent('access-group_close-group', 'part-4')}}</span>
            {{fluent('access-group_close-group', 'part-5')}}
          </p>
        </div>
        <div class="content-area__row close-group-container">
          <input type="checkbox" v-model="closeGroupConfirmed" />
          <label class="content-area__label">{{fluent('access-group_close-group', 'confirm-text')}}</label>
          <Button
            :disabled="!closeGroupConfirmed"
            class="button--primary primary-actdion"
            @click="handleCloseGroupClicked"
          >{{fluent('access-group_close-group', 'confirm-close')}}</Button>
        </div>
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
    ...mapActions({
      updateGroup: 'accessGroup/updateGroup',
      deleteTerms: 'accessGroup/deleteTerms',
      updateTerms: 'accessGroup/updateTerms',
      addTerms: 'accessGroup/addTerms',
      closeGroup: 'accessGroup/closeGroup',
    }),
    handleDescriptionUpdateClicked(e) {
      e.preventDefault();
      this.updateGroup({
        field: 'description',
        value: this.groupDescriptionData,
      }).then(() => {
        this.groupDescriptionDirty = false;
        this.$root.$emit('toast', {
          content: 'Group description updated',
        });
      });
      return false;
    },
    handleTypeUpdateClicked() {
      this.updateGroup({ field: 'type', value: this.groupTypeData }).then(
        () => {
          this.groupTypeDirty = false;
          this.$root.$emit('toast', {
            content: 'Group type updated',
          });
        }
      );
    },
    handleTermsUpdateClicked() {
      if (!this.groupTermsRequiredData && this.accessGroup.terms) {
        this.deleteTerms().then(() => {
          this.groupTermsDirty = false;
          this.$root.$emit('toast', {
            content: 'Group terms of service removed',
          });
        });
      } else if (!this.accessGroup.terms && this.groupTermsData.length > 0) {
        this.addTerms(this.groupTermsData).then(() => {
          this.groupTermsDirty = false;
          this.$root.$emit('toast', {
            content: 'Group terms of service updated',
          });
        });
      } else {
        this.updateTerms(this.groupTermsData).then(() => {
          this.groupTermsDirty = false;
          this.$root.$emit('toast', {
            content: 'Group terms of service updated',
          });
        });
      }
    },
    handleCloseGroupClicked() {
      const groupName = this.accessGroup.name;
      this.closeGroup().then(() => {
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
      accessGroup: 'accessGroup/getGroup',
      terms: 'accessGroup/getTerms',
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

.close-group-container .button--primary[disabled='disabled'] {
  border: 1px solid var(--gray-40);
  color: var(--black);
  background: var(--white);
}
</style>
