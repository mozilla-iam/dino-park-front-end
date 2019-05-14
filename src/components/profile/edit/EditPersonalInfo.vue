<template>
  <EditMutationWrapper
    :editVariables="{
      picture,
      primaryUsername,
      firstName,
      lastName,
      alternativeName,
      funTitle,
      pronouns,
      location,
      timezone,
      description,
    }"
    :initialValues="initialValues"
    formName="Edit personal information"
  >
    <EditPictureModal
      v-if="showPictureModal"
      v-bind="{
        picture,
        username: loggedInUser.primaryUsername,
        staffInformation,
      }"
      @close="showPictureModal = false"
    />
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Primary Info</h2>
    </header>
    <div class="edit-personal-info">
      <div class="edit-personal-info__picture">
        <UserPicture
          :picture="picture.value"
          :username="loggedInUser.primaryUsername.value"
          :size="264"
          :isStaff="true"
        ></UserPicture>
        <button
          class="button button--icon-only edit-personal-info__picture-edit-button"
          type="button"
          @click="showPictureModal = true"
        >
          <Icon id="pencil" :width="17" :height="17"></Icon>
          <span class="visually-hidden">Edit Picture</span>
        </button>
        <PrivacySetting
          label="Profile picture privacy levels"
          id="field-picture-privacy"
          profileFieldName="picture"
          :profileFieldObject="picture"
          class="edit-personal-info__picture-privacy"
        />
      </div>

      <div class="edit-personal-info__label">
        <label for="field-username">Username </label>
        <Tooltip
          buttonText="Open username info"
          alternateButtonText="Close username info"
          >Your username is publicly visible and included in your profile URL.
          Pro tip: Use the same username across systems for easy discovery (e.g.
          IRC, Slack, and Discourse).</Tooltip
        >
      </div>
      <input type="text" id="field-username" v-model="primaryUsername.value" />
      <PrivacySetting
        label="Username privacy levels"
        id="field-username-privacy"
        profileFieldName="primaryUsername"
        :profileFieldObject="primaryUsername"
        :disabled="true"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-first-name">First Name </label
        ><Tooltip
          buttonText="Open first name info"
          alternateButtonText="Close first name info"
          >For Staff members, name data is initially imported from Workday, but
          any changes you make to your profile will not be reflected back into
          Workday. Pro tip: If first and last names don’t work for you we have
          you covered. Please use alternate name instead.</Tooltip
        >
      </div>
      <input type="text" id="field-first-name" v-model="firstName.value" />
      <PrivacySetting
        label="First name privacy levels"
        id="field-first-name-privacy"
        profileFieldName="firstName"
        :profileFieldObject="firstName"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-last-name">Last Name </label>
      </div>
      <input type="text" id="field-last-name" v-model="lastName.value" />
      <PrivacySetting
        label="Last name privacy levels"
        id="field-last-name-privacy"
        profileFieldName="lastName"
        :profileFieldObject="lastName"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-pronouns">Pronouns </label>
        <Tooltip
          buttonText="Open pronouns info"
          alternateButtonText="Close pronouns info"
          >We prepared some pronouns for you to select from. If the list does
          not match your needs, you can always enter your own pronoun.</Tooltip
        >
      </div>
      <Combobox
        id="field-pronouns"
        v-model="pronouns.value"
        placeholder="Choose a pronoun or type your own"
        :source="['he/him', 'she/her', 'they/them']"
      >
      </Combobox>
      <PrivacySetting
        label="Pronoun privacy levels"
        id="field-pronoun-privacy"
        profileFieldName="pronouns"
        :profileFieldObject="pronouns"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-alt-name">Alternate Name</label
        ><Tooltip
          buttonText="Open Alternate Name info"
          alternateButtonText="Close Alternate Name info"
          >This field allows you to enter an additional or alternate name to
          your profile and control its visibility level.</Tooltip
        >
      </div>
      <input type="text" id="field-alt-name" v-model="alternativeName.value" />
      <PrivacySetting
        label="Alternate Name privacy levels"
        id="field-alt-name-privacy"
        profileFieldName="alternativeName"
        :profileFieldObject="alternativeName"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-official-job-title">Official Job Title </label
        ><Tooltip
          buttonText="Open official job title info"
          alternateButtonText="Close official job title info"
          >This is your job title as provided by our HR Team (Workday). Staff
          information is not editable and is shared with all Staff and NDA’d
          Mozillians. Please contact
          <a href="mailto:HROPS@mozilla.com">HROPS@mozilla.com</a> to request a
          change to your job title.</Tooltip
        >
      </div>
      <input
        type="text"
        id="field-official-job-title"
        disabled
        :value="staffInformation.title.value"
      />
      <PrivacySetting
        label="Title privacy levels"
        id="field-title-privacy"
        profileFieldName="staffInformation.title"
        :profileFieldObject="staffInformation.title"
        :disabled="true"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-fun-job-title">Tagline</label>
        <Tooltip
          buttonText="Open Tagline info"
          alternateButtonText="Close Tagline info"
          >This field describes what you do in your own words. You may also
          choose to copy your Official Job Title and make it publicly visible
          through this field.</Tooltip
        >
      </div>
      <input type="text" id="field-fun-job-title" v-model="funTitle.value" />
      <PrivacySetting
        label="Tagline privacy levels"
        id="field-fun-title-privacy"
        profileFieldName="funTitle"
        :profileFieldObject="funTitle"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-location">Location</label>
        <Tooltip
          buttonText="Open Location info"
          alternateButtonText="Close Location info"
          >This field is still under construction. For the moment you can enter
          any value you like.
        </Tooltip>
      </div>
      <Combobox
        id="field-location"
        v-model="location.value"
        @input="updateLocations"
        :source="locations"
      >
      </Combobox>
      <PrivacySetting
        label="Location privacy levels"
        id="field-location-privacy"
        profileFieldName="location"
        :profileFieldObject="location"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-office-location">Office Location</label>
      </div>
      <input
        type="text"
        id="field-office-location"
        disabled
        :value="staffInformation.officeLocation.value"
      />
      <PrivacySetting
        label="Office location privacy levels"
        id="field-office-location-privacy"
        profileFieldName="staffInformation.officeLocation"
        :profileFieldObject="staffInformation.officeLocation"
        :disabled="true"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-timezone">Timezone</label>
        <Tooltip
          buttonText="Open Timezone info"
          alternateButtonText="Close Timezone info"
          >This list allows you to set your timezone. If you provide this
          information, we will display your local time on your profile.</Tooltip
        >
      </div>
      <Combobox
        id="field-timezone"
        v-model="timezone.value"
        :source="timezones"
      >
      </Combobox>
      <PrivacySetting
        label="Timezone privacy levels"
        id="field-timezone-privacy"
        profileFieldName="timezone"
        :profileFieldObject="timezone"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-worker-type">Worker Type</label>
        <Tooltip
          buttonText="Open Worker Type info"
          alternateButtonText="Close Worker Type info"
          >This is your worker type as provided by our HR Team (Workday). This
          particular field is classified as Staff only and can’t be shared
          beyond this group. Please contact
          <a href="mailto:HROPS@mozilla.com">HROPS@mozilla.com</a> to change
          your information.</Tooltip
        >
      </div>
      <input
        type="text"
        id="field-worker-type"
        disabled
        :value="staffInformation.workerType.value"
      />
      <PrivacySetting
        label="Worker type privacy levels"
        id="field-worker-type-privacy"
        profileFieldName="staffInformation.workerType"
        :profileFieldObject="staffInformation.workerType"
        :disabled="true"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-cost-center">Cost Center</label>
      </div>
      <input
        type="text"
        id="field-cost-center"
        disabled
        :value="staffInformation.costCenter.value"
      />
      <PrivacySetting
        label="Cost center privacy levels"
        id="field-cost-center-privacy"
        profileFieldName="staffInformation.costCenter"
        :profileFieldObject="staffInformation.costCenter"
        :disabled="true"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-desk-number">Desk Number</label>
      </div>
      <input
        type="text"
        id="field-desk-number"
        disabled
        :value="staffInformation.wprDeskNumber.value"
      />
      <PrivacySetting
        label="Desk numnber privacy levels"
        id="field-desk-number-privacy"
        profileFieldName="staffInformation.wprDeskNumber"
        :profileFieldObject="staffInformation.wprDeskNumber"
        :disabled="true"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-team">Team</label>
      </div>
      <input
        type="text"
        id="field-team"
        disabled
        :value="staffInformation.team.value"
      />
      <PrivacySetting
        label="Team privacy levels"
        id="field-team-privacy"
        profileFieldName="staffInformation.team"
        :profileFieldObject="staffInformation.team"
        :disabled="true"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-bio">Bio</label>
        <Tooltip buttonText="Open Bio info" alternateButtonText="Close Bio info"
          >Tell us more about yourself! This field supports
          <a
            href="https://github.github.com/gfm/"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub Markdown</a
          >.</Tooltip
        >
      </div>
      <textarea
        id="field-bio"
        v-model="description.value"
        maxlength="5000"
        rows="10"
      ></textarea>
      <PrivacySetting
        label="Bio privacy levels"
        id="field-bio-privacy"
        profileFieldName="description"
        :profileFieldObject="description"
      />
    </div>
  </EditMutationWrapper>
</template>

<script>
import Combobox from '@/components/ui/Combobox.vue';
import EditMutationWrapper from '@/components/profile/edit/EditMutationWrapper.vue';
import Icon from '@/components/ui/Icon.vue';
import Meta from '@/components/ui/Meta.vue';
import MetaList from '@/components/ui/MetaList.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Select from '@/components/ui/Select.vue';
import Tooltip from '@/components/ui/Tooltip.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditPictureModal from './EditPictureModal.vue';
import Fetcher from '@/assets/js/fetcher';

const fetcher = new Fetcher({ failoverOn: [302] });

export default {
  name: 'EditPersonalInfo',
  props: {
    staffInformation: Object,
    initialValues: Object,
  },
  components: {
    Combobox,
    EditPictureModal,
    EditMutationWrapper,
    Icon,
    Meta,
    MetaList,
    PrivacySetting,
    Select,
    Tooltip,
    UserPicture,
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.$refs.header.focus();
    fetcher
      .fetch('/api/v4/timezone/list/')
      .then((res) => res.json())
      .then((timezones) => {
        this.timezones = timezones;
      });
  },
  data() {
    return {
      ...Object.entries(this.initialValues).reduce(
        (
          obj,
          [
            key,
            {
              value,
              metadata: { display },
            },
          ],
        ) => {
          obj[key] = {
            value,
            display: display || DISPLAY_LEVELS.public.value,
          };
          return obj;
        },
        {},
      ),
      showPictureModal: false,
      timezones: [],
      locations: [],
    };
  },
  methods: {
    async updateLocations(query) {
      try {
        const res = await fetcher.fetch(
          `/world/suggest?s=${encodeURIComponent(query)}`,
        );
        const json = await res.json();
        this.locations = json.map(
          ({ country, region, city }) => `${city}, ${region}, ${country}`,
        );
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style>
.edit-personal-info {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0.5em;
}
.edit-personal-info fieldset {
  border: 0;
}
.edit-personal-info > label,
.edit-personal-info__label {
  color: var(--gray-50);
  margin: 0.5em 0 0;
  grid-column: 1 / -1;
}
.edit-personal-info__label {
  padding: 0.5em 0;
}
.edit-personal-info__label label {
  display: inline-block;
  vertical-align: baseline;
}
.edit-personal-info__label label + .tooltip {
  margin-left: 0.5em;
}
.edit-personal-info > hr {
  margin: 1em -1.5em;
  grid-column: 1 / -1;
}
.edit-personal-info > input,
.edit-personal-info > div > input,
.edit-personal-info > div > div > input,
.edit-personal-info > textarea,
.edit-personal-info > select {
  border: 0;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  padding: 0.5em 0.9em;
  width: 100%;
}
.edit-personal-info > textarea {
  resize: none;
}
.edit-personal-info > input[disabled] {
  background-color: transparent;
  border-color: transparent;
  color: var(--gray-50);
  -webkit-text-fill-color: var(--gray-50);
  padding-left: 0;
  opacity: 1;
}
.edit-personal-info__picture {
  border: none;
  background: none;
}
.edit-personal-info__picture .user-picture,
.edit-personal-info__picture
  .user-picture
  ~ .edit-personal-info__picture-edit-button,
.edit-personal-info__picture .user-picture ~ .privacy-setting {
  display: inline-flex;
  vertical-align: bottom;
  margin-right: 0.5em;
}
.edit-personal-info__picture .edit-personal-info__picture-privacy button,
.edit-personal-info__picture .edit-personal-info__picture-edit-button {
  background-color: var(--white);
  font-size: inherit;
  display: flex;
  border-radius: var(--imageRadius);
  color: var(--black);
  border: 1px solid var(--gray-50);
}
.edit-personal-info__picture .edit-personal-info__picture-edit-button svg {
  margin: 0;
}
.edit-personal-info__meta {
  grid-column: 1 / 2;
}
.button-bar {
  display: flex;
  margin: 2em -1.5em -1.5em;
  padding: 2em;
  border-top: 2px solid var(--gray-30);
}
.button-bar button {
  margin-left: 1em;
}
.button-bar button:first-child {
  margin-left: auto;
}

@media (min-width: 57.5em) {
  .edit-personal-info {
    grid-template-columns: 20em 11em 1fr auto;
    grid-column-gap: 1em;
    margin: 2em 1em;
  }
  .edit-personal-info > hr {
    grid-column: 2 / end;
    margin: 0.5em 0;
  }
  .edit-personal-info > label,
  .edit-personal-info__label {
    grid-column: 2 / 3;
  }
  @supports (display: grid) {
    .edit-personal-info > label {
      padding: 0.5em 0;
      margin: 0.5em 0;
    }
    .edit-personal-info > input[disabled] {
      padding-left: 0.25em;
    }
  }
  .edit-personal-info > input,
  .edit-personal-info > div > input,
  .edit-personal-info > textarea,
  .edit-personal-info > select {
    margin: 0.5em 0;
  }
  .edit-personal-info > input {
    grid-column: 3 / 4;
  }
  .edit-personal-info > textarea {
    grid-column: 2 / 4;
  }
  .edit-personal-info__picture {
    grid-column: 1 / 2;
    grid-row: 1 / 8;
    position: relative;
  }
  .edit-personal-info__picture .edit-personal-info__picture-privacy,
  .edit-personal-info__picture .edit-personal-info__picture-edit-button {
    position: absolute;
    top: 15.5em;
  }
  .edit-personal-info__picture .edit-personal-info__picture-privacy button,
  .edit-personal-info__picture .edit-personal-info__picture-edit-button {
    border-color: transparent;
  }
  .edit-personal-info__picture
    .edit-personal-info__picture-privacy
    button:hover,
  .edit-personal-info__picture .edit-personal-info__picture-edit-button:hover {
    border-color: var(--blue-60);
    color: var(--blue-60);
  }
  .edit-personal-info__picture-edit-button {
    left: 1.1em;
  }
  .edit-personal-info .edit-personal-info__picture-edit-button svg {
    margin: 0;
  }
  .edit-personal-info__picture-privacy {
    right: 2.1em;
  }
  .edit-personal-info__picture button {
    background-color: var(--gray-20);
    font-size: inherit;
  }
  .edit-personal-info__privacy,
  .privacy-setting {
    grid-column: 4 / 5;
    align-self: center;
    justify-self: center;
  }
  .edit-personal-info__meta {
    grid-column: 2 / 4;
  }
}
</style>
