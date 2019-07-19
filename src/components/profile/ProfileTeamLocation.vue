<template>
  <div class="profile__team-location">
    <div class="profile__team">
      <h3 class="visually-hidden">Team</h3>
      <strong>
        <RouterLink
          v-if="team && teamManager"
          :to="{ name: 'Profile', params: { username: teamManager.username } }"
        >
          {{ team }}
        </RouterLink>
        <template v-else>
          {{ team }}
        </template>
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
            >{{ location || officeLocation }}
            {{ location && officeLocation && `(${officeLocation})` }}
          </RouterLink>
          {{ timezoneWithTime }}
        </template>
        <template v-else>
          <strong
            >{{ location || officeLocation }}
            {{ location && officeLocation && `(${officeLocation})` }}</strong
          >
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
      if (this.timezone) {
        return `${this.localtime} local time (${this.getTimezoneName(
          this.timezone,
        )})`;
      }
      return null;
    },
  },
  mounted() {
    this.interval = window.setInterval(() => {
      this.localtime = this.getLocaltime();
    }, 1000);
  },
  beforeDestroy() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  },
  methods: {
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
          return new Date().toLocaleTimeString(navigator.language, options);
        } catch (e) {
          return 'unknown';
        }
      }
      return '';
    },
  },
  data() {
    return {
      localtime: this.getLocaltime(),
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
