<template>
  <main class="profile container">
    <section id="intro" class="profile__section profile__intro">
      <div class="profile__intro-photo">
        <div class="profile__headshot">
          <img :src="picture.value" alt="" />
        </div>
        <p>Mozillan for 4 years</p>
        <div class="hide-mobile">
          <ContactMe></ContactMe>
        </div>
      </div>
      <div class="profile__intro-main">
        <ProfileName :firstName="firstName.value" :lastName="lastName.value" :pronouns="pronouns.value"></ProfileName>
        <ProfileTitle :businessTitle="accessInformation.hris.values.businessTitle || null" :funTitle="funTitle.value"></ProfileTitle>
        <ProfileTeamLocation :team="accessInformation.hris.values.team || null" :entity="accessInformation.hris.values.entity || null" :locationDescription="accessInformation.hris.values.locationDescription || null" :timeZone="accessInformation.hris.values.timeZone || null"></ProfileTeamLocation>

        <div class="hide-desktop">
          <ContactMe></ContactMe>
        </div>

        <h2 class="visually-hidden">About</h2>

        <div class="profile__description">
          <p>{{ description.value }}</p>
        </div>
        <ShowMore buttonText="Show more" alternateButtonText="Show less" :expanded="false" buttonClass="button button--text-only button--less-padding" :transition="true">
          <template slot="overflow">
            <MetaList>
              <h3 class="visually-hidden">Meta</h3>
              <Meta metaKey="Worker type" :metaValue="accessInformation.hris.values.workerType" />
              <Meta metaKey="Desk number" :metaValue="accessInformation.hris.values.wprDeskNumber" />
              <Meta metaKey="Cost centre" :metaValue="accessInformation.hris.values.costCenter" />
            </MetaList>
          </template>
          <template slot="icon-expanded">
            <img src="@/assets/images/chevron-up.svg" alt="" width="16" aria-hidden="true" />
          </template>
          <template slot="icon-collapsed">
            <img src="@/assets/images/chevron-down.svg" alt="" width="16" aria-hidden="true" />
          </template>
        </ShowMore>
      </div>
      <button @click="$refs.flagProfile.isOpen=true" class="button button--secondary button--icon-only profile__flag"><img src="@/assets/images/flag.svg" alt="" width="16" aria-hidden="true" /><span class="visually-hidden">Flag this profile</span></button>
      <Modal ref="flagProfile" heading="Flag this profile" :closeButton="true">
        <FlagProfile/>
      </Modal>
    </section>
    <ProfileNav></ProfileNav>
    <section id="relations" class="profile__section">
      <header class="profile__section-header">
        <h2>Relations</h2>
        <a :href="'/org#' + userId.value" class="button button--secondary">View Org Chart</a>
      </header>
      <ReportingStructure>
        <template slot="reports-to">
          <h3>Reports to:</h3>
          <Person v-bind="todo.team.members[0]" />
        </template>
        <template slot="manages">
          <h3>Manages:</h3>
          <Person v-bind="todo.team.members[1]" />
        </template>
      </ReportingStructure>
    </section>
    <section id="contact" class="profile__section">
      <header class="profile__section-header">
        <h2>Contact</h2>
      </header>
      <h3 class="visually-hidden">Contact options</h3>
      <div v-if="pgpPublicKeys || sshPublicKeys">
        <h3>Keys</h3>
        <template v-if="pgpPublicKeys">
          <h4 class="visually-hidden">PGP</h4>
          <Key v-for="key in pgpPublicKeys.values"
               type="PGP"
               title="Title"
               :content="key"
               :key="key" />
        </template>
        <template v-if="sshPublicKeys">
          <h4 class="visually-hidden">SSH</h4>
          <Key
            v-for="key in sshPublicKeys.values"
            type="SSH"
            title="Title"
            :content="key"
            :key="key" />
        </template>
      </div>
      <template v-if="preferredLanguage && preferredLanguage.length > 0">
      <div class="languages">
        <h3>Languages</h3>
        <Tag
          v-for="(language, index) in preferred_languages.values"
          :tag="language" :key="`language-${index}`" />      
        </Tag>
      </template>
    </section>
    <section id="elsewhere" class="profile__section">
      <header class="profile__section-header">
        <h2>Find me elsewhere</h2>
      </header>
      <h3>Mozilla</h3>
      <ul class="relation-list">
        <Relation category="Email" label="Mozilla Reps ReMo">
          <a href="#">philipp@mozilla.com</a>
        </Relation>
        <Relation category="Email" label="Mozilla Discourse">
          <a href="#">@phls</a>
        </Relation>
      </ul>
      <h3>Elsewhere</h3>
      <ul class="relation-list">
        <Relation category="Email" label="GitHub">
          <a href="#">@phls</a>
        </Relation>
        <Relation category="Email" label="LinkedIn">
          <a href="#">philipp@mozilla.com</a>
        </Relation>
      </ul>
      <Button type="button" modifier="button--full-width button--secondary">Show all groups</Button>
    </section>
    <section id="access-groups" class="profile__section">
      <header class="profile__section-header">
        <h2>Access Groups</h2>
      </header>
      <ul class="relation-list">
        <Relation category="NDA">
          Invited by <a href="#">Rubén Martin</a>
        </Relation>
      </ul>
    </section>
    <section id="tags" class="profile__section">
      <header class="profile__section-header">
        <h2>Tags</h2>
      </header>
      <Tag v-for="(tag, index) in tags.values" :tag="tag" :key="`tag-${index}`" />
    </section>
    <section class="profile__section">
      <button class="button button--secondary" @click="$refs.changeInfo.isOpen = true">Change info</button>
      <Modal ref="changeInfo" :closeButton="true">
        <h2>Edit personal info</h2>
        <p>This is a demo of opening a form in an overlay.</p>
        <EditPersonalInfo/>
      </Modal>
    </section>
  </main>
</template>

<script>
// components
import Button from '@/components/Button.vue';
import ContactMe from '@/components/ContactMe.vue';
import Key from '@/components/Key.vue';
import Meta from '@/components/Meta.vue';
import MetaList from '@/components/MetaList.vue';
import Modal from '@/components/functional/Modal.vue';
import Person from '@/components/Person.vue';
import ProfileName from '@/components/ProfileName.vue';
import ProfileTitle from '@/components/ProfileTitle.vue';
import ProfileTeamLocation from '@/components/ProfileTeamLocation.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import Relation from '@/components/Relation.vue';
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
    accessInformation: Object,
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
  },
  components: {
    Button,
    ContactMe,
    EditPersonalInfo,
    FlagProfile,
    Key,
    Meta,
    MetaList,
    Modal,
    Person,
    ProfileName,
    ProfileNav,
    ProfileTeamLocation,
    ProfileTitle,
    Relation,
    ReportingStructure,
    ShowMore,
    Tag,
    Vouch,
  },
  data() {
    return {
      todo: {
        team: {
          name: 'Open Innovation',
          members: [
            {
              id: 1,
              userId: {
                value: 'katharina',
              },
              firstName: {
                value: 'Katharina',
              },
              lastName: {
                value: 'Borchert',
              },
              funTitle: {
                value: 'Open Innovation',
              },
              officeLocation: {
                value: 'San Francisco',
              },
              picture: {
                value: 'https://placekitten.com/100/100',
              },
            },
            {
              id: 2,
              userId: {
                value: 'florian',
              },
              firstName: {
                value: 'Florian',
              },
              lastName: {
                value: 'Merz',
              },
              funTitle: {
                value: 'Open Innovation',
              },
              officeLocation: {
                value: 'Berlin',
              },
              picture: {
                value: 'https://placekitten.com/100/100',
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style>
@media (min-width: 50em)     {
  .profile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0 2em;
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
  padding-top: 4em;
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
}
  .profile__headshot img {
    width: 100%;
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
    margin: 0 auto;
  }
}

.profile__flag {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
}

.profile__description {
  font-size: .875em;
  color: var(--gray-50);
}

</style>
