<template>
  <EditMutationWrapper
    :editVariables="{
      languages,
    }"
    :initialValues="initialValues"
    formName="Edit languages"
    class="add-languages"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Languages</h2>
      <PrivacySetting
        class="privacy-select--large"
        label="Languages privacy levels"
        id="section-languages-privacy"
        profileFieldName="languages"
        :profileFieldObject="languages"
        :collapsedShowLabel="true"
      />
    </header>
    <div class="add-languages__list">
      <Tag
        v-for="({ k, v }, index) in languages.values"
        :tag="v"
        :key="`language-${index}`"
        :removable="true"
        @removeTag="removeLanguage(index)"
      >
      </Tag>
    </div>
    <input
      v-if="addingLanguage"
      type="text"
      v-model="newLanguage"
      ref="inputLanguage"
      class="add-languages__input"
      @keydown.enter="handleAddLanguage"
    />
    <button
      type="button"
      class="add-languages__add-more button button--secondary button--action"
      @click="handleAddLanguage"
    >
      <template v-if="addingLanguage && newLanguage.length > 0">
        <Icon id="check" :width="18" :height="18" />
        Submit
      </template>
      <template v-else>
        <Icon id="plus" :width="18" :height="18" />
        Add Language
      </template>
    </button>
  </EditMutationWrapper>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Tag from '@/components/ui/Tag.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditMutationWrapper from './EditMutationWrapper.vue';

export default {
  name: 'EditLanguages',
  props: {
    initialValues: Object,
    editVariables: Object,
    initialLanguages: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    EditMutationWrapper,
    Icon,
    PrivacySetting,
    Tag,
  },
  methods: {
    handleAddLanguage() {
      if (!this.addingLanguage) {
        this.addingLanguage = true;
        this.$nextTick(() => this.$refs.inputLanguage.focus());
        return;
      }
      if (this.newLanguage.length > 0) {
        this.addLanguage(this.newLanguage);
        this.addingLanguage = false;
      } else {
        this.$refs.inputLanguage.focus();
      }
    },
    addLanguage(language) {
      const highestId = this.languages.values.reduce(
        (max, { k }) => (Number(k) > max ? Number(k) : max),
        0,
      );
      const newLanguage = {
        k: `${highestId + 1}`,
        v: language,
      };

      this.languages.values.push(newLanguage);
      this.newLanguage = '';
    },
    removeLanguage(index) {
      if (this.languages.values.length > index) {
        this.languages.values.splice(index, 1);
      }
    },
  },
  mounted() {
    this.$refs.header.focus();
  },
  data() {
    const {
      values: initialLanguages,
      metadata: { display = DISPLAY_LEVELS.private.value },
    } = this.initialLanguages;
    return {
      newLanguage: '',
      languages: {
        values: Object.entries(initialLanguages || {}).map(([k, v]) => {
          return { k, v };
        }),
        display,
      },
      addingLanguage: false,
    };
  },
};
</script>

<style>
.add-languages__input,
.add-languages__input {
  margin-top: 1em;
}
.add-languages__list {
  margin-bottom: 2em;
}
.add-languages__add-more {
  margin-left: auto;
}
</style>
