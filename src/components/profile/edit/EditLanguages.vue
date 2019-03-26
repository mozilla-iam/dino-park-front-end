<template>
  <EditMutationWrapper
    :editVariables="{
      languages: languagesUpdated,
    }"
    :initialValues="initialValues"
    formName="Edit languages"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Languages</h2>
      <PrivacySetting
        label="Languages privacy levels"
        id="section-languages-privacy"
        :profileField="languagesUpdated"
        :collapsedShowLabel="true"
        v-model="languagesUpdated.display"
      />
    </header>
    <Tag
      v-for="(language, index) in languages"
      :tag="language"
      :key="`language-${index}`"
      :removable="true"
      @removeTag="removeLanguage(index)"
    >
    </Tag>
    <input type="text" v-model="newLanguage" ref="inputLanguage" />
    <button
      type="button"
      @click="
        if (newLanguage.length > 0) {
          addLanguage(newLanguage);
        } else {
          $refs.inputLanguage.focus();
        }
      "
    >
      Add language
    </button>
  </EditMutationWrapper>
</template>

<script>
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Tag from '@/components/ui/Tag.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditMutationWrapper from './EditMutationWrapper.vue';

export default {
  name: 'EditLanguages',
  props: {
    initialValues: Object,
    editVariables: Object,
  },
  components: {
    EditMutationWrapper,
    PrivacySetting,
    Tag,
  },
  methods: {
    displayLevelsFor,
    addLanguage(language) {
      const id = Object.keys(this.languages).length + 1;

      this.languages = { ...this.languages, [id]: language };
      this.newLanguage = '';
    },
    removeLanguage(index) {
      const { [index]: deleted, ...remainingLanguages } = this.languages;
      this.languages = remainingLanguages;
    },
    formatAsKeyValues(item) {
      const [k, v] = item;

      return {
        k,
        v,
      };
    },
  },
  watch: {
    languages() {
      this.languagesUpdated.values = Object.entries(this.languages).map(
        this.formatAsKeyValues,
      );
    },
  },
  mounted() {
    this.$refs.header.focus();
  },
  data() {
    return {
      newLanguage: '',
      languages: this.initialValues.languages.values,
      languagesUpdated: {
        values: Object.entries(this.initialValues.languages.values).map(
          this.formatAsKeyValues,
        ),
        display:
          this.initialValues.languages.display || DISPLAY_LEVELS.public.value,
      },
    };
  },
};
</script>
