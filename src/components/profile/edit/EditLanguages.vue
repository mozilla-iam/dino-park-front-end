<template>
  <EditMutationWrapper
    :editVariables="{
      languages,
    }"
    :initialValues="initialValues"
    formName="Edit languages"
  >
    <header class="profile__section-header">
      <h2>Languages</h2>
    </header>
    <Tag
      v-for="(language, index) in languages"
      :tag="language"
      :key="`language-${index}`"
      :removable="true"
      @remove="removeLanguage(language)"
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
import Tag from '@/components/ui/Tag.vue';
import { displayLevelsFor } from '@/assets/js/display-levels';
import EditMutationWrapper from './EditMutationWrapper.vue';

export default {
  name: 'EditLanguages',
  props: {
    initialValues: Object,
    editVariables: Object,
  },
  components: {
    EditMutationWrapper,
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
      delete this.languages[index];
      this.$forceUpdate();
    },
  },
  data() {
    return {
      newLanguage: '',
      languages: this.initialValues.languages.values,
    };
  },
};
</script>
