<template>
  <main class="profile container">
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
          userOnOwnProfile,
        }"
      />
    </div>
    <ProfileNav
      :links="profileNav"
      :onStaffProfile="staffInformation.staff.value"
    ></ProfileNav>

    <section v-if="staffInformation.staff.value" class="profile__section first">
      <a id="nav-relations" class="profile__anchor"></a>
      <ViewColleagues :username="primaryUsername.value"></ViewColleagues>
    </section>

    <ProfileSection
      section="identities"
      title="Identities"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!identitiesWrapper.anyIdentity()"
      message="No identities have been added yet."
      messageOwn="You haven't added any identities yet."
      :editing="editing === 'identities'"
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
      title="Contact"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.contact"
      message="No contact details have been added yet."
      messageOwn="You haven't added any contact details yet."
      :editing="editing === 'contact'"
    >
      <template v-slot:edit>
        <EditContact
          v-bind="{
            username: primaryUsername.value,
            initialPrimaryEmail: primaryEmail,
            initialPhoneNumbers: phoneNumbers,
            initialValues: {
              primaryEmail,
              phoneNumbers,
              uris,
            },
          }"
        />
      </template>
      <template v-slot:view>
        <ViewContact
          v-bind="{ primaryEmail, phoneNumbers, userOnOwnProfile }"
        ></ViewContact>
      </template>
    </ProfileSection>

    <ProfileSection
      section="accounts"
      title="Accounts"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.accounts"
      message="No accounts have been added yet."
      messageOwn="You haven't added any accounts yet."
      :editing="editing === 'accounts'"
    >
      <template v-slot:edit>
        <EditAccounts
          v-bind="{
            username: primaryUsername.value,
            initialValues: { uris },
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
      title="Languages"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.languages"
      message="No languages have been added yet."
      messageOwn="You haven't added any languages yet."
      :editing="editing === 'languages'"
    >
      <template v-slot:edit>
        <EditLanguages
          v-bind="{
            username: primaryUsername.value,
            initialValues: { languages },
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
      title="Tags"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.tags"
      message="No tags have been added yet."
      messageOwn="You haven't added any tags yet."
      :editing="editing === 'tags'"
    >
      <template v-slot:edit>
        <EditTags
          v-bind="{
            username: primaryUsername.value,
            initialValues: { tags },
            initialTags: tags,
          }"
        ></EditTags>
      </template>
      <template v-slot:view>
        <ViewTags v-bind="{ tags, userOnOwnProfile }"></ViewTags>
      </template>
    </ProfileSection>

    <ProfileSection
      section="keys"
      title="Keys"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="!sections.keys"
      message="No keys have been added yet."
      messageOwn="You haven't added any keys yet."
      :editing="editing === 'keys'"
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

    <ProfileSection
      section="access-groups"
      title="Access Groups"
      :userOnOwnProfile="userOnOwnProfile"
      :empty="
        Object.keys(accessInformation.mozilliansorg.values || {}).length === 0
      "
      :editable="true"
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
  </main>
</template>

<script>
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import EditButton from '@/components/profile/edit/EditButton.vue';
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
          Object.entries(this.phoneNumbers.values || {}).length > 0,
        accounts:
          this.editing === 'accounts' ||
          (this.uris.values &&
            Object.entries(this.uris.values).filter(([k]) =>
              this.isAccountKey(k),
            ).length > 0 &&
            true) ||
          false,
        languages:
          this.editing === 'languages' ||
          (this.languages.values &&
            Object.entries(this.languages.values).length > 0 &&
            true) ||
          false,
        tags:
          this.editing === 'tags' ||
          (this.tags.values &&
            Object.entries(this.tags.values).length > 0 &&
            true) ||
          false,
        keys:
          this.editing === 'keys' ||
          ((this.pgpPublicKeys.values || this.sshPublicKeys.values) &&
            (Object.entries(this.pgpPublicKeys.values).length > 0 ||
              Object.entries(this.sshPublicKeys.values).length > 0)) ||
          false,
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
        hash: '#nav-identites',
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
          id: 'nav-keys',
          iconId: 'keys',
          label: 'Keys',
        },
        {
          id: 'nav-access-groups',
          iconId: 'lock',
          label: 'Access Groups',
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
    padding: 2em;
  }
}

.profile__section {
  border: 4px solid var(--gray-50);
  background: #fff;
  padding: 1.5em;
  margin: 0 0 2em;
  grid-column: 2 / -1;
  overflow: visible;
  border-radius: var(--cardRadius);
  position: relative;
}

.profile__section:not(.profile__section--editing):not(.first) {
  padding: calc(2px + 1.5em);
}

.profile__section.first {
  padding: 0;
}

.profile__section.first .profile__section-header {
  margin: 0 0 1.5em 0;
}
@supports (--key: value) {
  .profile__section {
    border: none;
    box-shadow: var(--shadowCard);
  }
}
.profile__section--disabled {
  background-color: var(--gray-20);
  color: var(--gray-50);
  border: 2px solid var(--gray-30);
}
.profile__section.profile__section--editing {
  border: 2px solid var(--blue-60);
}
.profile__section:first-child {
  grid-column: 1 / -1;
}

.profile__section .reporting-structure h3 {
  margin-top: 0;
}

.profile__section-header {
  padding: 1.5em;
  margin: -1.5em -1.5em 1.5em -1.5em;
  border-bottom: 1px solid var(--gray-30);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.profile__section:not(.profile__section--editing):not(.first)
  .profile__section-header {
  margin: calc(-1.5em - 2px) calc(-1.5em - 2px) calc(1.5em + 2px)
    calc(-1.5em - 2px);
  padding-top: calc(1.5em + 2px);
  padding-left: calc(1.5em + 2px);
  padding-right: calc(1.5em + 2px);
}
.profile__section-header h2 {
  margin: 0 0 0.75em 0;
  width: 100%;
}
@media (min-width: 35em) {
  .profile__section-header h2 {
    margin: 0;
    width: auto;
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
