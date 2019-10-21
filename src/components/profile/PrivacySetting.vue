<template>
  <Select
    class="privacy-select"
    :label="label"
    :id="id"
    v-bind="privacySettings"
    v-model="profileFieldObject.display"
    :options="displayLevelsFor(profileFieldName)"
    :nonOption="currentDisplayOption()"
    :disabled="disabled"
    @input="$emit('input', $event)"
  >
    <template v-slot:extra-content
      ><a
        href="https://discourse.mozilla.org/t/profile-privacy-display-levels-explained/37906"
        target="_blank"
        rel="noopener noreferrer"
        >What do these mean?</a
      ></template
    >
  </Select>
</template>

<script>
import Select from '@/components/ui/Select.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';

export default {
  name: 'PrivacySetting',
  components: {
    Select,
  },
  props: {
    label: String,
    id: String,
    profileFieldName: String,
    profileFieldObject: Object,
    collapsedShowLabel: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
  },
  methods: {
    displayLevelsFor,
    currentDisplayOption() {
      return (
        Object.values(DISPLAY_LEVELS).find(
          (v) => v.value === this.profileFieldObject.display,
        ) || null
      );
    },
  },
  data() {
    return {
      privacySettings: {
        collapsedShowIcon: true,
        collapsedShowLabel: this.collapsedShowLabel,
        expandedShowIcon: true,
        expandedShowLabel: true,
      },
    };
  },
};
</script>
