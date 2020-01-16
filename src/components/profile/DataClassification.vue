<template>
  <div :class="['data-classification', classificationClass]">
    <span class="data-classification__label">{{ label }}</span>
    <Tooltip
      :buttonText="'Open ' + label + ' info'"
      :alternateButtonText="'Close ' + label + ' info'"
    >
      {{ infoText }}<br />
      {{ fluent('classification_info', 'how') }}<br />
      <Fluent
        id="classification_info"
        attr="wiki"
        :tags="{
          wiki: {
            tag: 'a',
            target: '_blank',
            href: 'https://wiki.mozilla.org/Security/Data_Classification',
          },
        }"
      />
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from '@/components/ui/Tooltip.vue';
import Fluent from '@/components/Fluent.vue';

export default {
  name: 'DataClassification',
  components: {
    Tooltip,
    Fluent,
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
    infoText() {
      switch (this.classification) {
        case 'staff':
          return this.fluent('classification_info', 'staff');
        case 'confidential':
          return this.fluent('classification_info', 'confidential');
        default:
          return this.fluent('classification_info');
      }
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
