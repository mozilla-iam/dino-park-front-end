<template>
  <main class="profile container">
    <div
      :class="
        'profile__section' +
          (this.editing === 'personal-info' ? ' profile__section--editing' : '')
      "
    >
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
        @toast="showToast"
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
          userOnOwnProfile,
        }"
      />
      <Toast :content="toastContent" @reset-toast="toastContent = ''"></Toast>
    </div>
    <ProfileNav
      :links="profileNav"
      :onStaffProfile="staffInformation.staff.value"
    ></ProfileNav>
    <section v-if="staffInformation.staff.value" class="profile__section">
      <a id="nav-relations" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Colleagues</h2>
        <RouterLink
          :to="{
            name: 'OrgchartHighlight',
            params: { username: primaryUsername.value },
          }"
          class="button button--secondary button--small"
        >
          <Icon id="org-chart" :width="16" :height="16" />
          Org Chart
          <Icon id="chevron-right" :width="18" :height="18" />
        </RouterLink>
      </header>
      <ReportingStructure :username="primaryUsername.value">
      </ReportingStructure>
    </section>
    <EmptyCard
      title="Identities"
      message="Soon you can edit identities in DinoPark"
    >
      <a id="nav-identities" class="profile__anchor"></a
    ></EmptyCard>
    <section
      :class="
        'profile__section' +
          (this.editing === 'contact' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-contact" class="profile__anchor"></a>
      <EditContact
        v-if="this.editing === 'contact'"
        v-bind="{
          username: primaryUsername.value,
          initialValues: {
            primaryEmail,
            phoneNumbers,
          },
        }"
        @toast="showToast"
      />
      <ViewContact
        v-else
        v-bind="{ primaryEmail, phoneNumbers, userOnOwnProfile }"
      ></ViewContact>
    </section>
    <section v-if="sections.accounts" class="profile__section">
      <a id="nav-accounts" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Accounts</h2>
      </header>
      <div class="profile__external-accounts">
        <div v-if="accounts.mozilla.length">
          <h3>Mozilla</h3>
          <IconBlockList>
            <IconBlock
              v-for="(acc, index) in accounts.mozilla"
              :key="`acc-moz-${index}`"
              :heading="acc.text"
              :icon="acc.icon"
            >
              <a :href="acc.value" target="_blank" rel="noreferrer noopener">{{
                acc.value
              }}</a>
            </IconBlock>
          </IconBlockList>
        </div>
        <div v-if="accounts.other.length">
          <h3>Elsewhere</h3>
          <IconBlockList>
            <IconBlock
              v-for="(acc, index) in accounts.other"
              :key="`acc-other-${index}`"
              :heading="acc.text"
              :icon="acc.icon"
            >
              <a :href="acc.value" target="_blank" rel="noreferrer noopener">{{
                acc.value
              }}</a>
            </IconBlock>
          </IconBlockList>
        </div>
      </div>
    </section>
    <EmptyCard v-else title="Accounts" message="No accounts have been added"
      ><a id="nav-accounts" class="profile__anchor"></a
    ></EmptyCard>
    <section
      v-if="languagesSorted && languagesSorted.length > 0"
      :class="
        'profile__section' +
          (this.editing === 'languages' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-languages" class="profile__anchor"></a>
      <EditLanguages
        v-if="this.editing === 'languages'"
        v-bind="{
          username: primaryUsername.value,
          initialValues: {
            languages,
          },
        }"
        @toast="showToast"
      ></EditLanguages>
      <ViewLanguages
        v-else
        v-bind="{ languages: languagesSorted, userOnOwnProfile }"
      ></ViewLanguages>
    </section>
    <EmptyCard v-else title="Languages" message="No languages have been added">
      <a id="nav-languages" class="profile__anchor"></a
    ></EmptyCard>
    <section v-if="(tagsSorted || []).length > 0" class="profile__section">
      <a id="nav-tags" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Tags</h2>
      </header>
      <Tag
        v-for="(tag, index) in tagsSorted"
        :tag="tag"
        :key="`tag-${index}`"
      />
    </section>
    <EmptyCard v-else title="Tags" message="No tags have been added">
      <a id="nav-tags" class="profile__anchor"></a
    ></EmptyCard>
    <section class="profile__section" v-if="pgpPublicKeys || sshPublicKeys">
      <h3>Keys</h3>
      <template
        v-if="pgpPublicKeys && Object.keys(pgpPublicKeys.values).length > 0"
      >
        <h4 class="visually-hidden">PGP</h4>
        <Key
          v-for="[key, value] in Object.entries(pgpPublicKeys.values)"
          type="PGP"
          :title="key"
          :content="value"
          :key="`pgp-${key}`"
        />
      </template>
      <template
        v-if="sshPublicKeys && Object.keys(sshPublicKeys.values).length > 0"
      >
        <h4 class="visually-hidden">SSH</h4>
        <Key
          v-for="[key, value] in Object.entries(sshPublicKeys.values)"
          type="SSH"
          :title="key"
          :content="value"
          :key="`ssh-${key}`"
        />
      </template>
    </section>
    <EmptyCard v-else title="Keys" message="No keys have been added">
      <a id="nav-keys" class="profile__anchor"></a
    ></EmptyCard>
    <section
      v-if="
        Object.keys(accessInformation.mozilliansorg.values || {}).length > 0
      "
      class="profile__section"
    >
      <a id="nav-access-groups" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Access Groups</h2>
      </header>
      <IconBlockList modifier="icon-block-list--multi-col">
        <IconBlock
          v-for="[group] in Object.entries(
            accessInformation.mozilliansorg.values,
          )"
          :key="`group-${group}`"
          icon="dino"
        >
          {{ group }}
        </IconBlock>
      </IconBlockList>
    </section>
    <EmptyCard
      v-else
      title="Access Groups"
      message="No access groups available"
    >
      <a id="nav-access-groups" class="profile__anchor"></a>
    </EmptyCard>
  </main>
</template>

<script>
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';
import Key from '@/components/ui/Key.vue';
import Modal from '@/components/_functional/Modal.vue';
import Person from '@/components/ui/Person.vue';
import ShowMore from '@/components/_functional/ShowMore.vue';
import Tag from '@/components/ui/Tag.vue';
import Toast from '@/components/ui/Toast.vue';
import Vouch from '@/components/ui/Vouch.vue';
import EditContact from './edit/EditContact.vue';
import EditLanguages from './edit/EditLanguages.vue';
import EditPersonalInfo from '@/components/profile/edit/EditPersonalInfo.vue';
import EmptyCard from '@/components/profile/view/EmptyCard.vue';
import ProfileNav from './ProfileNav.vue';
import ReportingStructure from './ReportingStructure.vue';
import ViewContact from './view/ViewContact.vue';
import ViewLanguages from './view/ViewLanguages.vue';
import ViewPersonalInfo from './view/ViewPersonalInfo.vue';

export default {
  mixins: [AccountsMixin],
  name: 'Profile',
  props: {
    alternativeName: Object,
    accessInformation: Object,
    description: Object,
    editing: String,
    firstName: Object,
    funTitle: Object,
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
    primaryUsername: Object,
  },
  components: {
    Button,
    EditContact,
    EditLanguages,
    EditPersonalInfo,
    EmptyCard,
    Icon,
    IconBlock,
    IconBlockList,
    Key,
    Modal,
    Person,
    ProfileNav,
    ReportingStructure,
    ShowMore,
    Tag,
    Toast,
    ViewContact,
    ViewLanguages,
    ViewPersonalInfo,
    Vouch,
  },
  methods: {
    alphabetise(array) {
      return array ? array.sort() : null;
    },
    showToast(data) {
      this.toastContent = data.content;
    },
  },
  computed: {
    accounts() {
      const wellKnown = Object.entries(this.uris || {})
        .map((kv) => this.account(kv))
        .filter((a) => a !== null && typeof a !== 'undefined');
      const mozilla = wellKnown.filter(({ moz }) => moz);
      const other = wellKnown.filter(({ moz }) => !moz);
      return { mozilla, other };
    },
    sections() {
      return {
        relations: this.staffInformation.staff,
        contact: true,
        accounts: this.accounts.mozilla.length + this.accounts.other.length > 0,
      };
    },
    tagsSorted() {
      return this.alphabetise(Object.values(this.tags.values || {}));
    },
    languagesSorted() {
      return (
        this.languages.values &&
        this.alphabetise(Object.values(this.languages.values))
      );
    },
    userOnOwnProfile() {
      return (
        this.$store.state.user.primaryUsername.value ===
        this.primaryUsername.value
      );
    },
  },
  data() {
    return {
      toastContent: '',
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
@supports (--key: value) {
  .profile__section {
    border-color: transparent;
    box-shadow: var(--shadowCard);
  }
}
.profile__section--disabled {
  background-color: var(--gray-20);
  color: var(--gray-50);
  border: 2px solid var(--gray-30);
}
.profile__section--editing {
  border-color: var(--blue-60);
}
.profile__section:first-child {
  grid-column: 1 / -1;
}
.profile__section h3 {
  margin: 1.5em 0 1em;
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
}
.profile__section-header h2 {
  margin: 0;
}
.profile__section-header > a {
  margin-left: auto;
}
.profile__section-header > .privacy-setting {
  margin-left: auto;
}
.profile__section-header > .privacy-setting button {
  background-color: white;
  border-color: var(--gray-50);
  padding: 1.1em 2em;
  color: var(--black);
  border-radius: 2.5em;
}
.profile__section-header > .privacy-setting button:hover {
  background-color: var(--black);
  color: var(--white);
  border-color: transparent;
}
.profile__section-header > .privacy-setting button svg {
  order: -1;
  margin: 0 0.5em 0 0;
}

@media (min-width: 57.5em) {
  .profile__external-accounts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em;
  }
  .profile__external-accounts h3 {
    margin-top: 0; /* because grid item margins don't collapse */
  }
}
</style>
