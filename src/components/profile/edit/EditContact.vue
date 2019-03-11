<template>
  <EditMutationWrapper
    :editVariables="{
      primaryEmail,
      phoneNumbers,
    }"
    :initialValues="initialValues"
    formName="Edit contact information"
  >
    <p>Edit contact fields be here</p>
  </EditMutationWrapper>
</template>

<script>
import EditMutationWrapper from './EditMutationWrapper.vue';

export default {
  name: 'EditContact',
  props: {
    primaryEmail: Object,
    phoneNumbers: Object,
    initialValues: Object,
    editVariables: Object,
  },
  components: {
    EditMutationWrapper,
  },
};
</script>
