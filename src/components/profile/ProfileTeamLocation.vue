<template>
  <div class="profile__team-location">
    <div v-if="showTeam" class="profile__team-section profile__team">
      <h3 class="visually-hidden">{{ fluent('profile_team') }}</h3>
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
      <span>{{ entity }}</span>
    </div>
    <div v-if="showLocation" class="profile__team-section profile__location">
      <h3 class="visually-hidden">{{ fluent('profile_location') }}</h3>
      <span class="profile-team-location-links" v-if="location">
        <RouterLink
          :to="{
            name: 'Search',
            query: {
              query: locationSearchString,
            },
          }"
          >{{ location }}</RouterLink
        >
        <RouterLink
          v-if="officeLocation"
          :to="{
            name: 'Search',
            query: {
              query: officeLocationSearchString,
            },
          }"
          >({{ officeLocation }})</RouterLink
        >
      </span>
      <span class="profile-team-location-links" v-else-if="officeLocation">
        <RouterLink
          class="profile-team-location-links"
          v-if="officeLocation"
          :to="{
            name: 'Search',
            query: {
              query: officeLocationSearchString,
            },
          }"
          >{{ officeLocation }}</RouterLink
        >
      </span>
      <div class="profile-team-location__timezone">
        <span
          class="timezone-print"
          v-bind:class="{ 'timezone-print': true, 'has-diff': timezoneDiff }"
          >{{ timezoneWithTime }}</span
        >
        <span class="timezone-diff">{{ timezoneDiff }}</span>
        <Tooltip
          v-if="hasTimezoneOffset"
          :buttonText="fluent('profile_timezone', 'tooltip-open')"
          :alternateButtonText="fluent('profile_timezone', 'tooltip-close')"
          >{{
            hasBrowserTimezone ? hasTimezoneInfoText : hasNoTimezoneInfoText
          }}</Tooltip
        >
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
  decimalToHours,
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
    showTeam() {
      return this.team || this.entity;
    },
    showLocation() {
      return this.location || this.officeLocation || this.timezone;
    },
    officeLocationSearchString() {
      return 'officeLocation:"' + this.officeLocation + '"'; // eslint-disable-line
    },
    locationSearchString() {
      return 'location:"' + this.location + '"'; // eslint-disable-line
    },
    hasBrowserTimezone() {
      const profileDate = getFormattedDateWithTimezone(
        this.localtime,
        this.timezone
      );
      const browserTimezone = getBrowserTimezone();
      if (browserTimezone && browserTimezone !== this.currentTimezone) {
        const currentBrowserDate = getFormattedDateWithTimezone(
          this.localtime,
          browserTimezone
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
        return this.fluent('profile_timezone_localtime', {
          time: this.getLocaltime(),
          timezone: getTimezoneName(this.timezone),
        });
      }
      return null;
    },
    /**
     * Get text for hour based time difference between user and viewing profile
     */
    timezoneDiff() {
      if (!this.timezone) {
        return null;
      }

      /**
       * Get all 3 different timezones
       */
      // Get viewed profile timezone
      const profileDate = getFormattedDateWithTimezone(
        this.localtime,
        this.timezone
      );

      // Get logged in profile timezone
      const currentLocalDate = getFormattedDateWithTimezone(
        this.localtime,
        this.currentTimezone
      );

      // Get browser timezone
      const browserTimezone = getBrowserTimezone();

      /**
       * Begin calculations
       */
      // Build browser timezone string
      let currentBrowserDate = null;
      let printedBrowserOffset = '';
      let browserHoursDiff = null;
      let validBrowserHoursDiff = false;
      if (browserTimezone && browserTimezone !== this.currentTimezone) {
        currentBrowserDate = getFormattedDateWithTimezone(
          this.localtime,
          browserTimezone
        );
        browserHoursDiff = getHoursDiff(profileDate, currentBrowserDate);
        validBrowserHoursDiff =
          browserHoursDiff !== null && browserHoursDiff !== 0;
        if (validBrowserHoursDiff) {
          printedBrowserOffset = this.fluent(
            'profile_timezone_offset_current',
            { difference: decimalToHours(browserHoursDiff) }
          );
        }
      }

      // Build local timezone string;
      const hoursDiff = getHoursDiff(profileDate, currentLocalDate);
      const validHoursDiff = hoursDiff !== null && hoursDiff !== 0;
      let printedLocalOffset = '';
      if (validHoursDiff) {
        printedLocalOffset = this.fluent('profile_timezone_offset_local', {
          difference: decimalToHours(hoursDiff),
        });
      }

      // Return appropriate text
      if (
        validHoursDiff &&
        validBrowserHoursDiff &&
        hoursDiff !== browserHoursDiff
      ) {
        return `${printedLocalOffset}${
          printedBrowserOffset === '' ? '' : `, ${printedBrowserOffset}`
        }`;
      }
      if (validHoursDiff && validBrowserHoursDiff) {
        return printedBrowserOffset;
      }
      if (validHoursDiff) {
        return printedLocalOffset;
      }
      if (validBrowserHoursDiff) {
        return printedBrowserOffset;
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
    const { timezone: { value: timezone = null } = {} } =
      this.$store.state.user || {};
    return {
      localtime: new Date(),
      currentTimezone: timezone,
      hasTimezoneInfoText: this.fluent(
        'profile_timezone_offset_current',
        'tooltip'
      ),
      hasNoTimezoneInfoText: this.fluent(
        'profile_timezone_offset_local',
        'tooltip'
      ),
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
  display: inline;
  font-weight: 700;
  color: var(--gray-50);
  text-transform: uppercase;
}
.profile__team-location .profile__team-location-content a,
.profile__team-location .profile__team-location-content strong {
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
  .profile__team-location > .profile__team-section {
    padding-left: 0;
    min-width: 50%;
    max-width: 100%;
  }
  .profile__team-location .profile__team {
    border-right: 1px solid var(--gray-30);
    margin-right: 1em;
    padding-right: 1em;
    padding-left: 0;
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
.profile__team-section {
  display: flex;
  flex-direction: column;
}

.profile__team-section .tooltip {
  margin-left: 0.25em;
}

.profile__team-section .tooltip button {
  color: var(--gray-50);
}
.profile__team-section .tooltip button:hover {
  color: var(--blue-60);
}
.profile-team-location-links {
  display: block;
}

.profile-team-location-links > a:first-child {
  padding-right: 0.25em;
}
</style>
