<template>
  <Select
    class="privacy-setting"
    :label="label"
    :id="id"
    v-bind="privacySettings"
    v-model="profileField.display"
    :options="displayLevelsFor(profileField.value)"
    @input="$emit('input', $event)"
  >
    <template v-slot:extra-content
      ><a href="#">What do these mean?</a></template
    >
  </Select>
</template>

<script>
import Select from '@/components/ui/Select.vue';
import { displayLevelsFor } from '@/assets/js/display-levels';

export default {
  name: 'PrivacySetting',
  components: {
    Select,
  },
  props: {
    label: String,
    id: String,
    profileField: Object,
    value: String,
  },
  methods: {
    displayLevelsFor,
  },
  data() {
    return {
      privacySettings: {
        collapsedShowIcon: true,
        collapsedShowLabel: false,
        expandedShowIcon: true,
        expandedShowLabel: true,
      },
    };
  },
};
</script>

<style>
.privacy-setting {
  position: relative;
}
.privacy-setting .options__toggle {
  padding: 0.5em;
  display: flex;
  align-content: center;
}
</style>
