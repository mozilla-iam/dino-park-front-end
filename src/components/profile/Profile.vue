<template>
  <main class="profile">
    <div
      :class="
        'profile__section' +
          (this.editing === 'personal-info' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-personal-info" class="profile__anchor"></a>
      <EditPersonalInfo
        v-if="this.editing === 'personal-info'"
        v-bind="{
          staffInformation,
          initialValues: {
            alternativeName,
            description,
            firstName,
            lastName,
            funTitle,
            location,
            primaryUsername,
            picture,
            pronouns,
            timezone,
          },
        }"
      />
      <ViewPersonalInfo
        v-else
        v-bind="{
          alternativeName,
          staffInformation,
          primaryUsername,
          primaryEmail,
          phoneNumbers,
          timezone,
          firstName,
          lastName,
          pronouns,
          funTitle,
          picture,
          location,
          description,
          uris,
          identities,
          userOnOwnProfile,
          editable: !viewAs,
          accessInformation,
        }"
      />
    </div>
    <ProfileNav
      :links="profileNav"
      :allowStaffOnlyFields="
        allowStaffOnlyFields && staffInformation.staff.value
      "
    ></ProfileNav>

    <section
      v-if="allowStaffOnlyFields && staffInformation.staff.value"
      class="profile__section first"
    >
      <a id="nav-relations" class="profile__anchor"></a>
      <ViewColleagues :username="primaryUsername.value"></ViewColleagues>
    </section>

    <ProfileSection
      section="identities"
      :title="fluent('profile_identities')"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!identitiesWrapper.anyIdentity()"
      message="No identities have been added yet."
      messageOwn="You haven't added any identities yet."
      :editing="editing === 'identities'"
      :editable="!viewAs"
    >
      <template v-slot:edit>
        <EditIdentities v-bind="{ identities: identitiesWrapper }" />
      </template>
      <template v-slot:view>
        <ViewIdentities
          v-bind="{ identities: identitiesWrapper, userOnOwnProfile }"
        />
      </template>
    </ProfileSection>

    <ProfileSection
      section="contact"
      :title="fluent('profile_contact')"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.contact"
      message="No contact details have been added yet."
      messageOwn="You haven't added any contact details yet."
      :editing="editing === 'contact'"
      :editable="!viewAs"
    >
      <template v-slot:edit>
        <EditContact
          v-bind="{
            username: primaryUsername.value,
            initialPrimaryEmail: primaryEmail,
            initialSecondaryEmail1: identities.custom1PrimaryEmail,
            initialSecondaryEmail2: identities.custom2PrimaryEmail,
            initialPhoneNumbers: phoneNumbers,
          }"
        />
      </template>
      <template v-slot:view>
        <ViewContact
          v-bind="{ primaryEmail, phoneNumbers, identities, userOnOwnProfile }"
        ></ViewContact>
      </template>
    </ProfileSection>

    <ProfileSection
      section="accounts"
      :title="fluent('profile_accounts')"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.accounts"
      message="No accounts have been added yet."
      messageOwn="You haven't added any accounts yet."
      :editing="editing === 'accounts'"
      :editable="!viewAs"
    >
      <template v-slot:edit>
        <EditAccounts
          v-bind="{
            username: primaryUsername.value,
            initialUris: uris,
          }"
        ></EditAccounts>
      </template>
      <template v-slot:view>
        <ViewAccounts v-bind="{ uris, userOnOwnProfile }"></ViewAccounts>
      </template>
    </ProfileSection>

    <ProfileSection
      section="languages"
      :title="fluent('profile_languages')"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.languages"
      message="No languages have been added yet."
      messageOwn="You haven't added any languages yet."
      :editing="editing === 'languages'"
      :editable="!viewAs"
    >
      <template v-slot:edit>
        <EditLanguages
          v-bind="{
            username: primaryUsername.value,
            initialLanguages: languages,
          }"
        ></EditLanguages>
      </template>
      <template v-slot:view>
        <ViewLanguages v-bind="{ languages, userOnOwnProfile }"></ViewLanguages>
      </template>
    </ProfileSection>

    <ProfileSection
      section="tags"
      :title="fluent('profile_tags')"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.tags"
      message="No tags have been added yet."
      messageOwn="You haven't added any tags yet."
      :editing="editing === 'tags'"
      :editable="!viewAs"
    >
      <template v-slot:edit>
        <EditTags
          v-bind="{
            username: primaryUsername.value,
            initialTags: tags,
          }"
        ></EditTags>
      </template>
      <template v-slot:view>
        <ViewTags v-bind="{ tags, userOnOwnProfile }"></ViewTags>
      </template>
    </ProfileSection>

    <ProfileSection
      section="access-groups"
      :title="fluent('profile_access-groups')"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="
        Object.keys(accessInformation.mozilliansorg.values || {}).length ===
          0 && Object.keys(accessInformation.ldap.values || {}).length === 0
      "
      :editable="!viewAs"
      message="Not a member of any access group."
      messageOwn="You are not a member of any access group."
      :editing="editing === 'access-groups'"
    >
      <template v-slot:edit>
        <EditAccessGroups
          v-bind="{ initialAccessInformation: accessInformation }"
        ></EditAccessGroups>
      </template>
      <template v-slot:view>
        <ViewAccessGroups
          v-bind="{ accessInformation, userOnOwnProfile }"
        ></ViewAccessGroups>
      </template>
    </ProfileSection>

    <ProfileSection
      section="keys"
      :title="fluent('profile_keys')"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.keys"
      message="No keys have been added yet."
      messageOwn="You haven't added any keys yet."
      messageNoLdap="Adding keys currently requires an LDAP account."
      :isLdap="scope.isLdap"
      :editing="editing === 'keys'"
      :editable="!viewAs"
    >
      <template v-slot:edit>
        <EditKeys
          v-bind="{
            username: primaryUsername.value,
            sshPublicKeys,
            pgpPublicKeys,
          }"
        />
      </template>
      <template v-slot:view>
        <ViewKeys
          v-bind="{ pgpPublicKeys, sshPublicKeys, userOnOwnProfile }"
        ></ViewKeys>
      </template>
    </ProfileSection>
  </main>
</template>

<script>
import EditButton from '@/components/ui/EditButton.vue';
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import EditAccessGroups from './edit/EditAccessGroups.vue';
import EditAccounts from './edit/EditAccounts.vue';
import EditContact from './edit/EditContact.vue';
import EditKeys from './edit/EditKeys.vue';
import EditLanguages from './edit/EditLanguages.vue';
import EditIdentities from './edit/EditIdentities.vue';
import EditPersonalInfo from '@/components/profile/edit/EditPersonalInfo.vue';
import EditTags from './edit/EditTags.vue';
import Identities from '@/assets/js/identities';
import ProfileNav from './ProfileNav.vue';
import ProfileSection from './ProfileSection.vue';
import ViewAccessGroups from './view/ViewAccessGroups.vue';
import ViewAccounts from './view/ViewAccounts.vue';
import ViewContact from './view/ViewContact.vue';
import ViewKeys from './view/ViewKeys.vue';
import ViewIdentities from './view/ViewIdentities.vue';
import ViewLanguages from './view/ViewLanguages.vue';
import ViewPersonalInfo from './view/ViewPersonalInfo.vue';
import ViewColleagues from './view/ViewColleagues.vue';
import ViewTags from './view/ViewTags.vue';

export default {
  name: 'Profile',
  props: {
    alternativeName: Object,
    accessInformation: Object,
    description: Object,
    editing: String,
    firstName: Object,
    funTitle: Object,
    identities: Object,
    languages: Object,
    lastName: Object,
    location: Object,
    pgpPublicKeys: Object,
    phoneNumbers: Object,
    picture: Object,
    primaryEmail: Object,
    pronouns: Object,
    sshPublicKeys: Object,
    staffInformation: Object,
    tags: Object,
    timezone: Object,
    uris: Object,
    uuid: Object,
    primaryUsername: Object,
    viewAs: Boolean,
    allowStaffOnlyFields: Boolean,
  },
  mixins: [AccountsMixin],
  components: {
    EditAccessGroups,
    EditAccounts,
    EditButton,
    EditContact,
    EditKeys,
    EditIdentities,
    EditLanguages,
    EditPersonalInfo,
    EditTags,
    ProfileNav,
    ProfileSection,
    ViewAccessGroups,
    ViewAccounts,
    ViewContact,
    ViewKeys,
    ViewIdentities,
    ViewLanguages,
    ViewPersonalInfo,
    ViewColleagues,
    ViewTags,
  },
  methods: {
    alphabetise(array) {
      return array ? array.sort() : null;
    },
  },
  computed: {
    sections() {
      return {
        relations: this.staffInformation.staff,
        contact:
          this.primaryEmail.value ||
          this.identities.custom1PrimaryEmail.value ||
          this.identities.custom2PrimaryEmail.value ||
          Object.entries(this.phoneNumbers.values || {}).length > 0,
        accounts:
          this.editing === 'accounts' ||
          Object.entries(this.uris.values || {}).filter(([k]) =>
            this.isAccountKey(k),
          ).length > 0,
        languages:
          this.editing === 'languages' ||
          Object.entries(this.languages.values || {}).length > 0,
        tags:
          this.editing === 'tags' ||
          Object.entries(this.tags.values || {}).length > 0,
        keys:
          this.editing === 'keys' ||
          (Object.entries(this.pgpPublicKeys.values || {}).length > 0 ||
            Object.entries(this.sshPublicKeys.values || {}).length > 0),
      };
    },
    userOnOwnProfile() {
      return this.$store.state.user.uuid.value === this.uuid.value;
    },
    identitiesWrapper() {
      return new Identities(this.identities);
    },
  },
  mounted() {
    if (this.$route.query.identityAdded) {
      let content = null;
      switch (this.$route.query.identityAdded) {
        case 'github':
          content = 'Saved GitHub identity';
          break;
        case 'bugzilla':
          content = 'Saved Bugzilla identity';
          break;
        case 'error':
          content = 'Failed to verify identity';
          break;
        default:
          content = 'Unkown error while verifying an identity';
      }
      this.$router.push({
        name: 'Profile',
        params: { username: this.$store.state.user.primaryUsername.value },
        hash: '#nav-identities',
      });
      this.$root.$emit('toast', { content });
      // Ideally our router should handle this.
      setTimeout(() => {
        const el = document.getElementById('nav-identities');
        if (el) {
          el.scrollIntoView();
        }
      }, 500);
    }
  },
  data() {
    return {
      profileNav: [
        {
          id: 'nav-relations',
          iconId: 'org-chart',
          label: 'Colleagues',
          staffOnly: true,
        },
        {
          id: 'nav-identities',
          iconId: 'chain',
          label: 'Identities',
        },
        {
          id: 'nav-contact',
          iconId: 'envelope',
          label: 'Contact',
        },
        {
          id: 'nav-accounts',
          iconId: 'at-sign',
          label: 'Accounts',
        },
        {
          id: 'nav-languages',
          iconId: 'world',
          label: 'Languages',
        },
        {
          id: 'nav-tags',
          iconId: 'bookmark',
          label: 'Tags',
        },
        {
          id: 'nav-access-groups',
          iconId: 'lock',
          label: 'Access Groups',
        },
        {
          id: 'nav-keys',
          iconId: 'keys',
          label: 'Keys',
        },
      ],
    };
  },
};
</script>

<style>
@media (min-width: 57.5em) {
  .profile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0 2em;
    align-items: start;
  }
}

.profile__anchor {
  top: -13.5em;
  position: relative;
}
@media (min-width: 57.5em) {
  .profile__anchor {
    top: -7em;
  }
}
</style>
