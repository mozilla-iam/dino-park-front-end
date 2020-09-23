<template>
  <div
    :class="['access-label', classificationClass]"
    v-if="labelType === 'classification'"
  >
    <span class="data-access__label">{{ label }}</span>
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
  <div
    class="access-label access-label--slack"
    v-else-if="labelType === 'slack-access' && isVolunteerWithSlackAccess"
  >
    <span class="slack__label">{{ slackLabel }}</span>
    <Tooltip
      :buttonText="'Open Slack access info'"
      :alternateButtonText="'Close Slack access info'"
    >
      {{ fluent('slack_access_info') }}<br />
      <Fluent
        id="slack_access_info"
        attr="wiki"
        :tags="{
          wiki: {
            tag: 'a',
            target: '_blank',
            href: 'https://wiki.mozilla.org/NDA-Slack',
          },
        }"
      />
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from '@/components/ui/Tooltip.vue';

export default {
  name: 'AccessLabel',
  components: {
    Tooltip,
  },
  props: {
    staffInformation: Object,
    accessInformation: Object,
    labelType: String,
  },
  data: function () {
    return {
      slackLabel: 'Slack',
    };
  },
  computed: {
    classification() {
      if (this.staffInformation.staff.value) {
        return 'staff';
      }
      if (
        'nda' in (this.accessInformation.mozilliansorg.values || {}) ||
        'contingentworkernda' in
          (this.accessInformation.mozilliansorg.values || {})
      ) {
        return 'confidential';
      }
      return 'public';
    },
    classificationClass() {
      return `access-label--data-${this.classification}`;
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
    isVolunteerWithSlackAccess() {
      return (
        !this.staffInformation.staff.value &&
        'slack-access' in (this.accessInformation.mozilliansorg.values || {})
      );
    },
  },
};
</script>

<style>
.access-label:not(:last-child) {
  margin-right: 0.3em;
}

.access-label {
  border-radius: 0.2em;
  display: inline-flex;
  padding: 0.3em 0.5em;
  text-align: center;
  margin: 0.3em 0;
  align-items: center;
  background-color: #cccccc;
  color: #000;
}

.access-label--data-confidential {
  background-color: #4a6785;
  color: #fff;
}

.access-label--data-staff {
  background-color: #ffd351;
  color: #594300;
}

.access-label--slack {
  background-color: #611f69;
  color: #fff;
}

.data-access__label,
.slack__label {
  display: block;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: normal;
  font-weight: 700;
  margin-right: 0.2em;
}

.access-label .tooltip button {
  color: inherit;
  display: flex;
}

/* .tooltip button:hover,
.tooltip button[aria-expanded='true'] {
  color: var(--blue-60);
} */
</style>
