<template>
  <div class="profile__team-location">
    <div class="profile__team">
      <h3 class="visually-hidden">Team</h3>
      <strong>{{ team }}</strong>
      {{ entity }}
    </div>
    <div class="profile__location">
      <h3 class="visually-hidden">Location</h3>
      <div class="location"><strong>{{ locationPreference }} ({{ officeLocation }})</strong>{{ timezone }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileTeamLocation',
  props: {
    team: String,
    entity: String,
    locationPreference: String,
    officeLocation: String,
    timezone: String,
  },
};
</script>

<style>
.profile__location,
.profile__team {
  font-size: .875em;
  color: var(--gray-50);
}
.profile__team {
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid var(--gray-30);
}
    .profile__team-location strong {
      display: block;
      color: var(--gray-50);
      text-transform: uppercase;
    }
@media(min-width: 60em) {
  .profile__team {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .profile__team-location {
    display: flex;
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
