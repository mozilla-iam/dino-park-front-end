<template>
  <div class="profile__intro">
    <EditButton
      v-if="userOnOwnProfile && editable"
      :sendTo="{
        name: 'Edit Profile',
        query: {
          section: sectionId,
        },
      }"
      :section="section"
      :sectionId="sectionId"
    ></EditButton>
    <div class="profile__intro-photo">
      <div class="profile__headshot">
        <UserPicture
          :avatar="{ picture: picture.value, username: primaryUsername.value }"
          :size="264"
          :showLabel="staffInformation.staff.value"
        ></UserPicture>
      </div>
      <div class="hide-mobile profile__contact-me-container">
        <ContactMe
          :identities="identities"
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
          :identities="identities"
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
      <MetaList>
        <MetaItem :metaKey="fluent('profile_access-to')">
          <AccessLabel
            :staffInformation="staffInformation"
            :accessInformation="accessInformation"
            labelType="classification"
          />
          <AccessLabel
            :staffInformation="staffInformation"
            :accessInformation="accessInformation"
            labelType="slack-access"
          />
        </MetaItem>
        <MetaItem
          :metaKey="fluent('profile_worker-type')"
          v-if="staffInformation.workerType.value"
          :metaValue="staffInformation.workerType.value"
        />
        <MetaItem
          :metaKey="fluent('profile_desk-number')"
          v-if="staffInformation.wprDeskNumber.value"
          :metaValue="staffInformation.wprDeskNumber.value"
          :link="
            deskNumberToOfficePlanLink(staffInformation.wprDeskNumber.value)
          "
        />
        <MetaItem
          :metaKey="fluent('profile_cost-center')"
          v-if="staffInformation.costCenter.value"
          :metaValue="
            staffInformation.costCenter.value &&
            staffInformation.costCenter.value.replace(/\.0$/, '')
          "
        />
      </MetaList>
      <ProfileDescription :description="description.value"></ProfileDescription>
    </div>
  </div>
</template>

<script>
import CompanyMixin from '@/components/_mixins/CompanyMixin.vue';
import OfficesMixin from '@/components/_mixins/OfficesMixin.vue';
import ContactMe from '@/components/ui/ContactMe.vue';
import EditButton from '@/components/ui/EditButton.vue';
import Icon from '@/components/ui/Icon.vue';
import MetaItem from '@/components/ui/Meta.vue';
import MetaList from '@/components/ui/MetaList.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import ProfileDescription from '../ProfileDescription.vue';
import ProfileName from '../ProfileName.vue';
import ProfileTitle from '../ProfileTitle.vue';
import ProfileTeamLocation from '../ProfileTeamLocation.vue';
import AccessLabel from '../AccessLabel.vue';

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
    identities: Object,
    userOnOwnProfile: Boolean,
    editable: Boolean,
    accessInformation: Object,
  },
  components: {
    ContactMe,
    EditButton,
    Icon,
    MetaItem,
    MetaList,
    ProfileDescription,
    ProfileName,
    ProfileTeamLocation,
    ProfileTitle,
    UserPicture,
    AccessLabel,
  },
  data() {
    return {
      section: 'personal info',
      sectionId: 'personal-info',
    };
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
