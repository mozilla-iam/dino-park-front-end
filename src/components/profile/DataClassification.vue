<template>
  <div :class="['data-classification', classificationClass]">
    <span class="data-classification__label">{{ label }}</span>
    <Tooltip
      :buttonText="'Open ' + label"
      :alternateButtonText="'Close ' + label"
    >
      This person has access to {{ fullClassifications }} data.<br />
      This was determined from profile information visible to you.<br />
      Read more about data classification
      <a
        href="https://wiki.mozilla.org/Security/Data_Classification"
        target="_blank"
        >on the wiki</a
      >.
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from '@/components/ui/Tooltip.vue';

export default {
  name: 'DataClassification',
  components: {
    Tooltip,
  },
  props: {
    staffInformation: Object,
    accessInformation: Object,
  },
  computed: {
    classification() {
      if (this.staffInformation.staff.value) {
        return 'staff';
      }
      if ('nda' in (this.accessInformation.mozilliansorg.values || {})) {
        return 'confidential';
      }
      return 'public';
    },
    classificationClass() {
      return `data-classification--${this.classification}`;
    },
    label() {
      switch (this.classification) {
        case 'staff':
          return 'Staff Only';
        case 'confidential':
          return 'Mozilla Confidential';
        default:
          return 'Public';
      }
    },
    fullClassifications() {
      const list = [];
      /* eslint-disable no-fallthrough */
      switch (this.classification) {
        case 'staff':
          list.push('Mozilla Confidential - Staff Only');
        case 'confidential':
          list.push("Mozilla Confidential - Staff and NDA'd Mozillians Only");
        default:
          list.push('Public');
      }
      /* eslint-enable no-fallthrough */
      return list.join(', ').replace(/,(?=[^,]*$)/, ', and');
    },
  },
};
</script>

<style>
.data-classification {
  border-radius: 0.2em;
  display: inline-flex;
  padding: 0.3em 0.5em;
  text-align: center;
  margin: 0.3em 0;
  align-items: center;
  background-color: #cccccc;
  color: #000;
}

.data-classification--confidential {
  background-color: #4a6785;
  color: #fff;
}

.data-classification--staff {
  background-color: #ffd351;
  color: #594300;
}

.data-classification__label {
  display: block;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: normal;
  font-weight: 700;
  margin-right: 0.2em;
}

.data-classification .tooltip button {
  color: inherit;
  display: flex;
}

/* .tooltip button:hover,
.tooltip button[aria-expanded='true'] {
  color: var(--blue-60);
} */
</style>
