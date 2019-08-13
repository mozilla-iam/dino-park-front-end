<template>
  <div class="profile__team-location">
    <div class="profile__team-section profile__team">
      <h3 class="visually-hidden">Team</h3>
      <div class="profile__team-location-content">
        <strong>
          <RouterLink
            v-if="team && teamManager"
            :to="{
              name: 'Profile',
              params: { username: teamManager.username },
            }"
            >{{ team }}</RouterLink
          >
          <template v-else>{{ team }}</template>
        </strong>
        {{ entity }}
      </div>
    </div>
    <div class="profile__team-section profile__location">
      <h3 class="visually-hidden">Location</h3>
      <div class="profile__team-location-content">
        <template v-if="officeLocation">
          <RouterLink
            :to="{
              name: 'Search',
              query: {
                query: locationSearchString,
              },
            }"
          >
            {{ location || officeLocation }}
            {{ location && officeLocation && `(${officeLocation})` }}
          </RouterLink>
          <span
            class="timezone-print"
            v-bind:class="{ 'timezone-print': true, 'has-diff': timezoneDiff }"
            >{{ timezoneWithTime }}</span
          >
          <span class="timezone-diff">{{ timezoneDiff }}</span>
          <Tooltip
            v-if="hasTimezoneOffset"
            buttonText="Open timezone info"
            alternateButtonText="Close timezone info"
          >
            {{
              hasBrowserTimezone ? hasTimezoneInfoText : hasNoTimezoneInfoText
            }}
          </Tooltip>
        </template>
        <template v-else>
          <strong>
            {{ location || officeLocation }}
            {{ location && officeLocation && `(${officeLocation})` }}
          </strong>
          <span class="timezone-print">{{ timezoneWithTime }}</span>
          <span class="timezone-diff">{{ timezoneDiff }}</span>
          <Tooltip
            v-if="hasTimezoneOffset"
            buttonText="Open timezone info"
            alternateButtonText="Close timezone info"
          >
            {{
              hasBrowserTimezone ? hasTimezoneInfoText : hasNoTimezoneInfoText
            }}
          </Tooltip>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Tooltip from '@/components/ui/Tooltip.vue';
import {
  getHoursDiff,
  getFormattedDateWithTimezone,
  getBrowserTimezone,
  getTimezoneName,
} from '@/assets/js/timezone-utils';

export default {
  name: 'ProfileTeamLocation',
  components: { Icon, Tooltip },
  props: {
    team: String,
    teamManager: Object,
    entity: String,
    location: String,
    officeLocation: String,
    timezone: String,
  },
  computed: {
    locationSearchString() {
      return 'officeLocation:"' + this.officeLocation + '"'; // eslint-disable-line
    },
    hasBrowserTimezone() {
      const profileDate = getFormattedDateWithTimezone(
        this.localtime,
        this.timezone,
      );
      const browserTimezone = getBrowserTimezone();
      if (browserTimezone && browserTimezone !== this.currentTimezone) {
        const currentBrowserDate = getFormattedDateWithTimezone(
          this.localtime,
          browserTimezone,
        );
        const browserHoursDiff = getHoursDiff(profileDate, currentBrowserDate);
        return browserHoursDiff !== null && browserHoursDiff !== 0;
      }
      return false;
    },
    hasTimezoneOffset() {
      return this.timezoneDiff !== '' && this.timezoneDiff !== null;
    },
    timezoneWithTime() {
      // Return final string
      if (this.timezone) {
        return `${this.getLocaltime()} local time (${getTimezoneName(
          this.timezone,
        )})`;
      }
      return null;
    },
    timezoneDiff() {
      if (!this.timezone || !this.currentTimezone) {
        return null;
      }

      // Get viewed profile timezone
      const profileDate = getFormattedDateWithTimezone(
        this.localtime,
        this.timezone,
      );

      // Get logged in profile timezone
      const currentLocalDate = getFormattedDateWithTimezone(
        this.localtime,
        this.currentTimezone,
      );

      // Get browser timezone
      const browserTimezone = getBrowserTimezone();
      let currentBrowserDate = null;
      let printedBrowserOffset = '';
      let browserHoursDiff = null;
      // Build browser timezone string
      if (browserTimezone && browserTimezone !== this.currentTimezone) {
        currentBrowserDate = getFormattedDateWithTimezone(
          this.localtime,
          browserTimezone,
        );
        browserHoursDiff = getHoursDiff(profileDate, currentBrowserDate);
        if (browserHoursDiff !== null && browserHoursDiff !== 0) {
          printedBrowserOffset = `${
            browserHoursDiff > 0 ? '+' : ''
          }${browserHoursDiff}hrs to your current time`;
        }
      }

      // Build local timezone string;
      const hoursDiff = getHoursDiff(profileDate, currentLocalDate);
      let printedLocalOffset = '';
      if (hoursDiff !== null && hoursDiff !== 0) {
        printedLocalOffset = `${
          hoursDiff > 0 ? '+' : ''
        }${hoursDiff}hrs to your local time`;
      }
      if (
        hoursDiff !== null &&
        browserHoursDiff !== null &&
        hoursDiff !== browserHoursDiff
      ) {
        return `${printedLocalOffset}${
          printedBrowserOffset === '' ? '' : ', ' + printedBrowserOffset
        }`;
      } else if (hoursDiff !== null && browserHoursDiff !== null) {
        return printedBrowserOffset;
      } else if (hoursDiff !== null) {
        return printedLocalOffset;
      } else if (browserHoursDiff !== null) {
        return browserHoursDiff;
      }
      return null;
    },
  },
  mounted() {
    this.interval = window.setInterval(() => {
      this.localtime = new Date();
    }, 1000);
  },
  beforeDestroy() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  },
  methods: {
    getLocaltime() {
      if (this.timezone) {
        try {
          const options = { timeZone: this.timezone };
          return this.localtime.toLocaleTimeString(navigator.language, options);
        } catch (e) {
          return 'unknown';
        }
      }
      return '';
    },
  },
  data() {
    return {
      localtime: new Date(),
      currentTimezone: this.$store.state.user.timezone.value,
      hasTimezoneInfoText:
        'Since your browser location and profile timezone are different, we get this from your browser',
      hasNoTimezoneInfoText:
        'We get this from what you set up in your profile as your primary location',
    };
  },
};
</script>

<style>
.profile__location,
.profile__team {
  color: var(--gray-50);
}
.profile__location a,
.profile__team a {
  color: inherit;
  text-decoration: none;
}
.profile__team {
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid var(--gray-30);
}
.profile__team-location a,
.profile__team-location strong {
  display: block;
  font-weight: 700;
  color: var(--gray-50);
  text-transform: uppercase;
}
.profile__team-location .profile__team-location-content > a,
.profile__team-location .profile__team-location-content > strong {
  font-size: 0.9em;
}
.profile__team-location a:hover {
  color: var(--blue-60);
}
@media (min-width: 60em) {
  .profile__team {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .profile__team-location {
    display: flex;
    margin: 2em 0;
  }
  .profile__team-location .profile__team-section {
    padding-left: 0;
  }
  .profile__team-location .profile__team {
    border-right: 1px solid var(--gray-30);
    margin-right: 1em;
    padding-right: 1em;
    padding-left: 0;
    width: 50%;
  }

  .profile__team-location .profile__location {
    width: 50%;
  }
}

.timezone-print {
  border-right: none;
  padding-right: 0.5em;
}

.timezone-print.has-diff {
  border-right: 1px solid var(--gray-30);
}

.timezone-diff {
  padding-left: 0.5em;
}

.profile__team-location-content .tooltip {
  margin-left: 0.25em;
}

.profile__team-location-content .tooltip button {
  color: var(--gray-50);
}
.profile__team-location-content .tooltip button:hover {
  color: var(--blue-60);
}
</style>
