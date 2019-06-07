<template>
  <Select
    class="privacy-setting"
    :label="label"
    :id="id"
    v-bind="privacySettings"
    v-model="profileFieldObject.display"
    :options="displayLevelsFor(profileFieldName)"
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
import { displayLevelsFor } from '@/assets/js/display-levels';

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

<style>
.privacy-setting {
  position: relative;
}
.privacy-setting .options__toggle {
  padding: 0.5em;
  display: flex;
  align-content: center;
}
.privacy-setting .options__toggle[disabled] {
  background-image: none;
  cursor: not-allowed;
  color: var(--gray-40);
  background-color: transparent;
  border-color: var(--gray-40);
  border-style: solid;
}
.privacy-setting--large .options__toggle {
  background-color: white;
  border-color: var(--gray-50);
  padding: 1.1em 3em 1.1em 2em;
  color: var(--black);
  border-radius: 2.5em;
  background-image: url('../../assets/images/chevron-down.svg');
  background-repeat: no-repeat;
  background-position: center right 1em;
  background-size: 1.25em;
}
.privacy-setting--large .options__toggle:not([disabled]):hover {
  background-color: var(--black);
  color: var(--white);
  border-color: transparent;
  background-image: url('../../assets/images/chevron-down-white.svg');
}
.privacy-setting--large .options__toggle svg {
  order: -1;
  margin: 0 0.5em 0 0;
}
.privacy-setting a:hover {
  color: var(--blue-60);
  background-color: var(--lightBlue);
}
</style>
