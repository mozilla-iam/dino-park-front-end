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
      <!-- Temporarily hidden for IAM-992 testing. Uncomment when Workday timezones are passed through unmodified. (atoll) -->
      <div class="profile-team-location__timezone">
        <span
          class="timezone-print"
          ><!-- {{ timezone }} --></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Tooltip from '@/components/ui/Tooltip.vue';

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
      // Temporarily hide location altogether, pending a more detailed removal.
      return false; // this.location || this.officeLocation; // || this.timezone;
    },
    officeLocationSearchString() {
      return 'officeLocation:"' + this.officeLocation + '"'; // eslint-disable-line
    },
    locationSearchString() {
      return 'location:"' + this.location + '"'; // eslint-disable-line
    },
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
