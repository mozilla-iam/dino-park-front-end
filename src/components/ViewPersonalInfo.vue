<template>
  <div class="profile__intro">
    <div class="profile__intro-photo">
      <div class="profile__headshot">
        <UserPicture
          :picture="picture.value"
          :username="username.value"
          :size="230"
          :isStaff="staffInformation.staff.value"
        ></UserPicture>
      </div>
      <div class="hide-mobile">
        <ContactMe
          :primaryEmail="primaryEmail.value"
          :phoneNumbers="phoneNumbers"
        ></ContactMe>
      </div>
      <button
        v-if="currentUser.primaryEmail == primaryEmail.value"
        @click="$emit('toggle-edit-mode')"
      >
        Edit
      </button>
    </div>
    <div class="profile__intro-main">
      <ProfileName
        :firstName="firstName.value"
        :lastName="lastName.value"
        :username="username.value"
        :pronouns="pronouns.value"
      ></ProfileName>
      <ProfileTitle
        :businessTitle="staffInformation.title.value"
        :funTitle="funTitle.value"
      ></ProfileTitle>
      <div class="hide-desktop">
        <ContactMe
          :primaryEmail="primaryEmail.value"
          :phoneNumbers="phoneNumbers.value"
        ></ContactMe>
      </div>
      <ProfileTeamLocation
        :team="staffInformation.team.value"
        :teamManager="manager || null"
        :entity="company(staffInformation, primaryEmail.value)"
        :location="location.value"
        :officeLocation="staffInformation.officeLocation.value"
        :timezone="timezone.value"
      ></ProfileTeamLocation>
      <h2 class="visually-hidden">About</h2>
      <div class="profile__description">
        <p>{{ description.value }}</p>
      </div>
      <ShowMore
        v-if="this.staffInformation.staff.value"
        buttonText="Show More"
        alternateButtonText="Show Less"
        :expanded="false"
        buttonClass="button button--text-only button--less-padding"
        :transition="true"
      >
        <template slot="overflow">
          <MetaList>
            <h3 class="visually-hidden">Meta</h3>
            <Meta
              metaKey="Worker type"
              :metaValue="staffInformation.workerType.value"
            />
            <Meta
              metaKey="Desk number"
              :metaValue="staffInformation.wprDeskNumber.value"
            />
            <Meta
              metaKey="Cost centre"
              :metaValue="staffInformation.costCenter.value"
            />
          </MetaList>
        </template>
        <template slot="icon-expanded">
          <Icon id="chevron-up" :width="24" :height="24" />
        </template>
        <template slot="icon-collapsed">
          <Icon id="chevron-down" :width="24" :height="24" />
        </template>
      </ShowMore>
    </div>
  </div>
</template>

<script>
import ContactMe from '@/components/ContactMe.vue';
import Icon from '@/components/Icon.vue';
import Meta from '@/components/Meta.vue';
import MetaList from '@/components/MetaList.vue';
import ProfileName from '@/components/ProfileName.vue';
import ProfileTitle from '@/components/ProfileTitle.vue';
import ProfileTeamLocation from '@/components/ProfileTeamLocation.vue';
import ShowMore from '@/components/functional/ShowMore.vue';
import UserPicture from '@/components/UserPicture.vue';

// mixins
import CompanyMixin from '@/components/mixins/CompanyMixin.vue';

export default {
  mixins: [CompanyMixin],
  name: 'ViewPersonalInfo',
  props: {
    tag: String,
    staffInformation: Object,
    username: Object,
    primaryEmail: Object,
    phoneNumbers: Object,
    timezone: Object,
    firstName: Object,
    lastName: Object,
    manager: Object,
    pronouns: Object,
    funTitle: Object,
    picture: Object,
    location: Object,
    description: Object,
  },
  components: {
    ContactMe,
    Icon,
    Meta,
    MetaList,
    ProfileName,
    ProfileTeamLocation,
    ProfileTitle,
    ShowMore,
    UserPicture,
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
.profile__intro {
  position: relative;
  padding-top: 5em;
  margin-top: 5em;
}
@media (min-width: 57.5em) {
  .profile__intro {
    padding: 3em;
    margin-top: 0;
    display: grid;
    grid-gap: 2em;
    grid-template-columns: 1fr 2fr;
  }
}

.profile__intro-photo {
  text-align: center;
}

.profile__headshot {
  width: 6.25em;
  height: 6.25em;
  position: absolute;
  top: -3.125em;
  left: 50%;
  margin-left: -3.125em;
  margin-bottom: 1em;
}
.profile__headshot img {
  width: 100%;
  border-radius: var(--imageRadius);
}
@supports (object-fit: cover) {
  .profile__headshot img {
    object-fit: cover;
    height: 100%;
  }
}
@media (min-width: 57.5em) {
  .profile__headshot {
    position: static;
    width: 15em;
    height: 15em;
    margin-left: 0;
  }
  .profile__intro-photo .profile__headshot {
    margin: 0 auto 4em;
  }
}

.profile__flag {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
}

.profile__description {
  color: var(--gray-50);
}

.profile__anchor {
  top: -8.5em;
  position: relative;
}
</style>
