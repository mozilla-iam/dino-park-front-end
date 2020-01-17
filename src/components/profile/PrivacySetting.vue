<template>
  <Select
    class="privacy-select"
    :label="label"
    :id="id"
    v-bind="privacySettings"
    v-model="profileFieldObject.display"
    :options="fluentDisplayLevelsFor(profileFieldName, scope)"
    :nonOption="currentDisplayOption()"
    :disabled="disabled"
    @input="$emit('input', $event)"
  >
    <template v-slot:extra-content
      ><a
        :href="
          scope.isStaff || scope.isNda
            ? globalLinks.profilePrivacyNda
            : globalLinks.profilePrivacyPublic
        "
        target="_blank"
        rel="noopener noreferrer"
        >{{ fluent('privacy-setting_help') }}</a
      ></template
    >
  </Select>
</template>

<script>
import Select from '@/components/ui/Select.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

export default {
  name: 'PrivacySetting',
  mixins: [LinksMixin],
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
    fluentDisplayLevelsFor(...args) {
      return displayLevelsFor(...args).map((x) => {
        return {
          ...x,
          label: this.fluent(`display-levels_${x.value.toLowerCase()}`),
        };
      });
    },
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
