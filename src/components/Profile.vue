<template>
  <main class="profile container">
    <section class="profile__section profile__intro">
      <div class="profile__intro-photo">
        <div class="profile__headshot">
          <UserPicture :picture="picture.value" :username="userId.value" :size="230" dinoType="Staff"></UserPicture>
        </div>
        <div class="hide-mobile">
          <ContactMe></ContactMe>
        </div>
      </div>
      <div class="profile__intro-main">
        <ProfileName :firstName="firstName.value" :lastName="lastName.value" :pronouns="pronouns.value"></ProfileName>
        <ProfileTitle :businessTitle="businessTitle.value || null" :funTitle="funTitle.value || null"></ProfileTitle>
        <div class="hide-desktop">
          <ContactMe></ContactMe>
        </div>
        <ProfileTeamLocation :team="team.value || null" :entity="entity.value || null" :locationPreference="locationPreference.value || null" :officeLocation="officeLocation.value || null" :timezone="timezone.value || null"></ProfileTeamLocation>
        <h2 class="visually-hidden">About</h2>
        <div class="profile__description">
          <p>{{ description.value }}</p>
        </div>
        <ShowMore buttonText="Show more" alternateButtonText="Show less" :expanded="false" buttonClass="button button--text-only button--less-padding" :transition="true">
          <template slot="overflow">
            <MetaList>
              <h3 class="visually-hidden">Meta</h3>
              <Meta metaKey="Worker type" :metaValue="workerType.value" />
              <Meta metaKey="Desk number" :metaValue="wprDeskNumber.value" />
              <Meta metaKey="Cost centre" :metaValue="costCenter.value" />
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
      <button @click="$refs.flagProfile.isOpen=true" class="button button--secondary button--icon-only profile__flag"><img src="@/assets/images/flag.svg" alt="" width="16" aria-hidden="true" /><span class="visually-hidden">Flag this profile</span></button>
      <Modal ref="flagProfile" heading="Flag this profile" :closeButton="true">
        <FlagProfile/>
      </Modal>
    </section>
    <ProfileNav :links="profileNav"></ProfileNav>
    <section v-if="manager || directs.length > 0" class="profile__section">
      <a id="relations" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Relations</h2>
        <router-link :to="{ name: 'OrgchartHighlight', params: { userId: userId.value } }" class="button button--secondary button--small">Org Chart</router-link>
      </header>
      <ReportingStructure :manager="manager" :directs="directs">
      </ReportingStructure>
    </section>
    <section class="profile__section">
      <a id="contact" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Contact</h2>
      </header>
      <h3 class="visually-hidden">Contact options</h3>
      <div v-if="pgpPublicKeys.values || sshPublicKeys.values">
        <h3>Keys</h3>
        <template v-if="pgpPublicKeys.values">
          <h4 class="visually-hidden">PGP</h4>
          <Key v-for="pgp in pgpPublicKeys.values"
               type="PGP"
               :title="pgp.key"
               :content="pgp.value"
               :key="pgp.key" />
        </template>
        <template v-if="sshPublicKeys.values">
          <h4 class="visually-hidden">SSH</h4>
          <Key
            v-for="ssh in sshPublicKeys.values"
            type="SSH"
            :title="ssh.key"
            :content="ssh.value"
            :key="ssh.key" />
        </template>
      </div>
      <template v-if="preferredLanguage && preferredLanguage.values && preferredLanguage.values.length > 0">
        <div class="languages">
          <h3>Languages</h3>
          <Tag
            v-for="(language, index) in preferredLanguage.values"
            :tag="language" :key="`language-${index}`" >
          </Tag>
        </div>
      </template>
    </section>
    <section class="profile__section">
      <a id="other-accounts" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Other accounts</h2>
      </header>
      <div class="profile__external-accounts">
        <div>
          <h3>Mozilla</h3>
          <IconBlockList>
            <IconBlock heading="Email" subHeading="Mozilla Reps ReMo" icon="mozilla">
              <a href="#">@phls</a>
            </IconBlock>
            <IconBlock heading="Email" subHeading="Mozilla Discourse" icon="mozilla">
              <a href="#">@phls</a>
            </IconBlock>
          </IconBlockList>
        </div>
        <div>
          <h3>Elsewhere</h3>
            <IconBlock heading="Email" subHeading="GitHub" icon="github">
              <a href="#">@phls</a>
            </IconBlock>
            <IconBlock heading="Email" subHeading="LinkedIn" icon="linkedin">
              <a href="mailto:philipp@mozilla.com">philipp@mozilla.com</a>
            </IconBlock>
        </div>
      </div>
    </section>
    <section class="profile__section">
      <a id="access-groups" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Access Groups</h2>
      </header>
      <IconBlockList modifier="icon-block-list--multi-col">
        <IconBlock v-for="(group, index) in accessInformation.mozilliansorg.values" :key="`group-${index}`" icon="group">
          {{ group }}
        </IconBlock>
      </IconBlockList>
    </section>
    <section class="profile__section">
      <a id="tags" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Tags</h2>
      </header>
      <Tag v-for="(tag, index) in tags.values" :tag="tag" :key="`tag-${index}`" />
    </section>
  </main>
</template>

<script>
// components
import Button from '@/components/Button.vue';
import ContactMe from '@/components/ContactMe.vue';
import Icon from '@/components/Icon.vue';
import IconBlock from '@/components/IconBlock.vue';
import IconBlockList from '@/components/IconBlockList.vue';
import Key from '@/components/Key.vue';
import Meta from '@/components/Meta.vue';
import MetaList from '@/components/MetaList.vue';
import Modal from '@/components/functional/Modal.vue';
import Person from '@/components/Person.vue';
import UserPicture from '@/components/UserPicture.vue';
import ProfileName from '@/components/ProfileName.vue';
import ProfileTitle from '@/components/ProfileTitle.vue';
import ProfileTeamLocation from '@/components/ProfileTeamLocation.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import ReportingStructure from '@/components/ReportingStructure.vue';
import ShowMore from '@/components/functional/ShowMore.vue';
import Tag from '@/components/Tag.vue';
import Vouch from '@/components/Vouch.vue';

// forms
import EditPersonalInfo from '@/components/forms/EditPersonalInfo.vue';
import FlagProfile from '@/components/forms/FlagProfile.vue';

export default {
  name: 'Profile',
  props: {
    businessTitle: Object,
    team: Object,
    timezone: Object,
    entity: Object,
    workerType: Object,
    wprDeskNumber: Object,
    costCenter: Object,
    firstName: Object,
    lastName: Object,
    pronouns: Object,
    funTitle: Object,
    picture: Object,
    locationPreference: Object,
    officeLocation: Object,
    description: Object,
    created: Object,
    lastModified: Object,
    pgpPublicKeys: Object,
    sshPublicKeys: Object,
    tags: Object,
    preferredLanguage: Object,
    userId: Object,
    manager: Object,
    directs: Array,
    accessInformation: Object,
  },
  components: {
    Button,
    ContactMe,
    EditPersonalInfo,
    Icon,
    IconBlock,
    IconBlockList,
    FlagProfile,
    Key,
    Meta,
    MetaList,
    Modal,
    Person,
    UserPicture,
    ProfileName,
    ProfileNav,
    ProfileTeamLocation,
    ProfileTitle,
    ReportingStructure,
    ShowMore,
    Tag,
    Vouch,
  },
  data() {
    return {
      profileNav: [
        {
          id: 'relations',
          iconId: 'org-chart',
          label: 'Relations',
        },
        {
          id: 'contact',
          iconId: 'book',
          label: 'Contact',
        },
        {
          id: 'other-accounts',
          iconId: 'at-sign',
          label: 'Other accounts',
        },
        {
          id: 'access-groups',
          iconId: 'crown',
          label: 'Access groups',
        },
        {
          id: 'tags',
          iconId: 'bookmark',
          label: 'Tags',
        },
      ],
    };
  },
};
</script>

<style>
@media (min-width: 50em) {
  .profile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0 2em;
    align-items: start;
    padding: 2em;
  }
}

.profile__section {
  border: 1px solid #ccc;
  background: #fff;
  padding: 1.5em;
  margin: 0 0 2em;
  grid-column: 2 / -1;
  overflow: visible;
  border-radius: var(--cardRadius);
}
@supports (--key: value) {
  .profile__section {
    border: 0;
    box-shadow: var(--shadowCard);
  }
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
  border-bottom: 1px solid #cfcfcf;
  display: flex;
}
  .profile__section-header h2 {
    margin: 0;
  }
  .profile__section-header .button {
    margin-left: auto;
  }

.profile__intro {
  position: relative;
  padding-top: 5em;
  margin-top: 5em;
}
@media(min-width: 50em) {
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
@supports(object-fit: cover) {
  .profile__headshot img {
    object-fit: cover;
    height: 100%;
  }
}
@media(min-width:50em) {
  .profile__headshot {
    position: static;
    width: 15em;
    height: 15em;
    margin-left: 0;
  }
  .profile__intro-photo .profile__headshot {
    margin: 0 auto 3em;
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
  top: -6.5em;
  position: relative;
}

@media (min-width: 50em) {
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
