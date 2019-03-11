<template>
  <EditMutationWrapper
    :editVariables="{
      languages,
    }"
    :initialValues="initialValues"
    formName="Edit languages"
  >
    <p>Edit languages fields be here</p>
  </EditMutationWrapper>
</template>

<script>
import EditMutationWrapper from './EditMutationWrapper.vue';

export default {
  name: 'EditLanguages',
  props: {
    languages: Object,
    initialValues: Object,
    editVariables: Object,
  },
  components: {
    EditMutationWrapper,
  },
};
</script>
