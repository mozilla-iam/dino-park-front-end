<template>
  <div class="profile__team-location">
    <div class="profile__team">
      <h3 class="visually-hidden">Team</h3>
      <strong>
        <RouterLink
          v-if="team && teamManager"
          :to="{ name: 'Profile', params: { username: teamManager.username } }"
          >{{ team }}</RouterLink
        >
        <template v-else>{{ team }}</template>
      </strong>
      {{ entity }}
    </div>
    <div class="profile__location">
      <h3 class="visually-hidden">Location</h3>
      <div>
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
          {{ timezoneWithTime }}
        </template>
        <template v-else>
          <strong>
            {{ location || officeLocation }}
            {{ location && officeLocation && `(${officeLocation})` }}
          </strong>
          {{ timezoneWithTime }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileTeamLocation',
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
    timezoneWithTime() {
      const getHoursDiff = (date1, date2) =>
        (new Date(date1) - new Date(date2)) / 36e5;

      if (!this.timezone || !this.currentTimezone) {
        return null;
      }
      // Get viewed profile timezone
      const profileDate = this.getFormattedDateWithTimezone(
        this.localtime,
        this.timezone,
      );

      // Get logged in profile timezone
      const currentLocalDate = this.getFormattedDateWithTimezone(
        this.localtime,
        this.currentTimezone,
      );

      // Get browser timezone
      const browserTimezone = this.getBrowserTimezone();
      let currentBrowserDate = null;
      let printedBrowserOffset = '';

      // Build browser timezone string
      if (browserTimezone && browserTimezone !== this.currentTimezone) {
        currentBrowserDate = this.getFormattedDateWithTimezone(
          this.localtime,
          browserTimezone,
        );
        const browserHoursDiff = getHoursDiff(profileDate, currentBrowserDate);
        if (browserHoursDiff !== null && browserHoursDiff !== 0) {
          printedBrowserOffset = `, ${
            browserHoursDiff > 0 ? '+' : ''
          }${browserHoursDiff}hrs to your current time`;
        }
      }

      // Build local timezone string;
      const hoursDiff = getHoursDiff(profileDate, currentLocalDate);
      let printedOffset = '';
      if (hoursDiff !== null && hoursDiff !== 0) {
        printedOffset = ` | ${
          hoursDiff > 0 ? '+' : ''
        }${hoursDiff}hrs to your local time`;
      }

      // Return final string
      if (this.timezone) {
        return `${this.getLocaltime()} local time (${this.getTimezoneName(
          this.timezone,
        )})${printedOffset}${printedBrowserOffset}`;
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
    getFormattedDateWithTimezone(datetime, tz) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: tz,
      }).format(datetime);
    },
    getBrowserTimezone() {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (e) {
        console.log('Unable to get browser timezone: ', e);
        return null;
      }
    },
    getTimezoneName(timezone) {
      try {
        return new Intl.DateTimeFormat('default', {
          timeZoneName: 'short',
          timeZone: timezone,
        })
          .formatToParts(new Date())[6]
          .value.replace('GMT', 'UTC');
      } catch (_) {
        return '?';
      }
    },
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
.profile__team-location div > a,
.profile__team-location div > strong {
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
  .profile__team-location div {
    padding-left: 0;
  }
  .profile__team-location div:first-child {
    border-right: 1px solid var(--gray-30);
    margin-right: 1em;
    padding-right: 1em;
    padding-left: 0;
  }
}
</style>
