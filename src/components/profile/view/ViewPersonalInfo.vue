<template>
  <div class="profile__intro">
    <EditButton
      v-if="userOnOwnProfile && editable"
      section="personal info"
      sectionId="personal-info"
    ></EditButton>
    <div class="profile__intro-photo">
      <div class="profile__headshot">
        <UserPicture
          :avatar="{ picture: picture.value, username: primaryUsername.value }"
          :size="264"
          :isStaff="staffInformation.staff.value"
        ></UserPicture>
      </div>
      <div class="hide-mobile profile__contact-me-container">
        <ContactMe
          :primaryEmail="primaryEmail.value"
          :phoneNumbers="phoneNumbers"
          :uris="uris"
        ></ContactMe>
      </div>
    </div>
    <div class="profile__intro-main">
      <ProfileName
        :firstName="firstName.value"
        :lastName="lastName.value"
        :username="primaryUsername.value"
        :alternativeName="alternativeName.value"
        :pronouns="pronouns.value"
      ></ProfileName>
      <ProfileTitle
        :businessTitle="staffInformation.title.value"
        :funTitle="funTitle.value"
      ></ProfileTitle>
      <div class="hide-desktop">
        <ContactMe
          :primaryEmail="primaryEmail.value"
          :phoneNumbers="phoneNumbers"
          :uris="uris"
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
      <ProfileDescription :description="description.value"></ProfileDescription>
      <ShowMore
        v-if="this.staffInformation.staff.value"
        buttonText="Show More"
        alternateButtonText="Show Less"
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
              :link="
                deskNumberToOfficePlanLink(staffInformation.wprDeskNumber.value)
              "
            />
            <Meta
              metaKey="Cost center"
              :metaValue="
                staffInformation.costCenter.value &&
                  staffInformation.costCenter.value.replace(/\.0$/, '')
              "
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
import CompanyMixin from '@/components/_mixins/CompanyMixin.vue';
import OfficesMixin from '@/components/_mixins/OfficesMixin.vue';
import ContactMe from '@/components/ui/ContactMe.vue';
import EditButton from '@/components/profile/edit/EditButton.vue';
import Icon from '@/components/ui/Icon.vue';
import Meta from '@/components/ui/Meta.vue';
import MetaList from '@/components/ui/MetaList.vue';
import ShowMore from '@/components/_functional/ShowMore.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import ProfileDescription from '../ProfileDescription.vue';
import ProfileName from '../ProfileName.vue';
import ProfileTitle from '../ProfileTitle.vue';
import ProfileTeamLocation from '../ProfileTeamLocation.vue';

export default {
  mixins: [CompanyMixin, OfficesMixin],
  name: 'ViewPersonalInfo',
  props: {
    alternativeName: Object,
    tag: String,
    staffInformation: Object,
    primaryUsername: Object,
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
    uris: Object,
    userOnOwnProfile: Boolean,
    editable: Boolean,
  },
  components: {
    ContactMe,
    EditButton,
    Icon,
    Meta,
    MetaList,
    ProfileDescription,
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
  word-wrap: anywhere;
}
@media (min-width: 57.5em) {
  .profile__intro {
    padding: 1em;
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
    width: 18.75em;
    height: 18.75em;
    margin-left: 0;
  }
  .profile__contact-me-container {
    width: 18.75em;
  }
  .profile__intro-photo .profile__headshot {
    margin: 0 0 4em;
  }
}

.profile__flag {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
}
</style>
