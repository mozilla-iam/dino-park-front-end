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
      staffInformationTitleDisplay: staffInformationTitle.display,
      staffInformationOfficeLocationDisplay:
        staffInformationOfficeLocation.display,
    }"
    :initialValues="initialValues"
    formName="Edit personal information"
  >
    <EditPictureModal
      v-if="showPictureModal"
      v-bind="{
        picture,
        pictureData,
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
        <UserPicture :avatar="avatar" :size="264"></UserPicture>
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
        <label for="field-username">{{ fluent('profile_username') }}</label>
        <Tooltip
          buttonText="Open username info"
          alternateButtonText="Close username info"
          >{{ fluent('profile_username', 'tooltip') }}</Tooltip
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
        <label for="field-first-name">{{ fluent('profile_first-name') }}</label
        ><Tooltip
          buttonText="Open first name info"
          alternateButtonText="Close first name info"
          >{{
            fluent(
              'profile_first-name',
              scope.isStaff ? 'tooltip-staff' : 'tooltip',
            )
          }}</Tooltip
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
        <label for="field-last-name">{{ fluent('profile_last-name') }}</label>
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
        <label for="field-pronouns">{{ fluent('profile_pronouns') }}</label>
        <Tooltip
          buttonText="Open pronouns info"
          alternateButtonText="Close pronouns info"
          >{{ fluent('profile_pronouns', 'tooltip') }}</Tooltip
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
        <label for="field-alt-name">{{ fluent('profile_alt-name') }}</label
        ><Tooltip
          buttonText="Open Alternate Name info"
          alternateButtonText="Close Alternate Name info"
          >{{ fluent('profile_alt-name', 'tooltip') }}</Tooltip
        >
      </div>
      <TextInput
        type="text"
        id="field-alt-name="
        :maxlength="90"
        v-model="alternativeName.value"
      />
      <PrivacySetting
        label="Alternate Name privacy levels"
        id="field-alt-name-privacy"
        profileFieldName="alternativeName"
        :profileFieldObject="alternativeName"
      />

      <template v-if="scope.isStaff">
        <hr role="presentation" />

        <div class="edit-personal-info__label">
          <label for="field-official-job-title">{{
            fluent('profile_official-job-title')
          }}</label
          ><Tooltip
            buttonText="Open official job title info"
            alternateButtonText="Close official job title info"
            ><Fluent
              id="profile_official-job-title"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: hrEmail },
              }"
          /></Tooltip>
        </div>
        <input
          type="text"
          id="field-official-job-title"
          disabled
          :value="staffInformationTitle.value"
        />
        <PrivacySetting
          label="Title privacy levels"
          id="field-title-privacy"
          profileFieldName="staffInformation.title"
          :profileFieldObject="staffInformationTitle"
        />
      </template>

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-fun-job-title">{{
          fluent('profile_fun-job-title')
        }}</label>
        <Tooltip
          buttonText="Open Tagline info"
          alternateButtonText="Close Tagline info"
          >{{ fluent('profile_fun-job-title', 'tooltip') }}</Tooltip
        >
      </div>
      <TextInput
        type="text"
        id="field-fun-job-title"
        v-model="funTitle.value"
        :maxlength="90"
      />
      <PrivacySetting
        label="Tagline privacy levels"
        id="field-fun-title-privacy"
        profileFieldName="funTitle"
        :profileFieldObject="funTitle"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-location">{{ fluent('profile_location') }}</label>
        <Tooltip
          buttonText="Open Location info"
          alternateButtonText="Close Location info"
          >{{ fluent('profile_location', 'tooltip') }}
        </Tooltip>
      </div>
      <Combobox
        id="field-location"
        v-model="location.value"
        @input="updateLocations"
        :filter="'none'"
        :source="locations"
        :onSelect="setTimezone"
      >
      </Combobox>
      <PrivacySetting
        label="Location privacy levels"
        id="field-location-privacy"
        profileFieldName="location"
        :profileFieldObject="location"
      />

      <template v-if="scope.isStaff">
        <hr role="presentation" />

        <div class="edit-personal-info__label">
          <label for="field-office-location">{{
            fluent('profile_office-location')
          }}</label>
          <Tooltip
            buttonText="Open office location info"
            alternateButtonText="Close office location info"
            ><Fluent
              id="profile_office-location"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: hrEmail },
              }"
            />
          </Tooltip>
        </div>
        <input
          type="text"
          id="field-office-location"
          disabled
          :value="staffInformationOfficeLocation.value"
        />
        <PrivacySetting
          label="Office location privacy levels"
          id="field-office-location-privacy"
          profileFieldName="staffInformation.officeLocation"
          :profileFieldObject="staffInformationOfficeLocation"
        />
      </template>

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-timezone">{{ fluent('profile_timezone') }}</label>
        <Tooltip
          buttonText="Open Timezone info"
          alternateButtonText="Close Timezone info"
          >{{ fluent('profile_timezone', 'tooltip') }}</Tooltip
        >
      </div>
      <input type="text" id="field-timezone" disabled :value="timezone.value" />
      <PrivacySetting
        label="Timezone privacy levels"
        id="field-timezone-privacy"
        profileFieldName="timezone"
        :profileFieldObject="timezone"
      />

      <template v-if="scope.isStaff">
        <hr role="presentation" />

        <div class="edit-personal-info__label">
          <label for="field-worker-type">{{
            fluent('profile_worker-type')
          }}</label>
          <Tooltip
            buttonText="Open Worker Type info"
            alternateButtonText="Close Worker Type info"
            ><Fluent
              id="profile_worker-type"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: hrEmail },
              }"
          /></Tooltip>
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
          <label for="field-cost-center">{{
            fluent('profile_cost-center')
          }}</label>
          <Tooltip
            buttonText="Open cost center info"
            alternateButtonText="Close cost center info"
            ><Fluent
              id="profile_cost-center"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: hrEmail },
              }"
          /></Tooltip>
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
          <label for="field-desk-number">{{
            fluent('profile_desk-number')
          }}</label>
          <Tooltip
            buttonText="Open desk number info"
            alternateButtonText="Close desk number info"
            ><Fluent
              id="profile_desk-number"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: hrEmail },
              }"
          /></Tooltip>
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
          <label for="field-team">{{ fluent('profile_team') }}</label>
          <Tooltip
            buttonText="Open team info"
            alternateButtonText="Close team info"
            ><Fluent
              id="profile_team"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: hrEmail },
              }"
          /></Tooltip>
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
      </template>

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-bio">{{ fluent('profile_bio') }}</label>
        <Tooltip
          buttonText="Open Bio info"
          alternateButtonText="Close Bio info"
        >
          <Fluent
            id="profile_bio"
            attr="tooltip"
            :tags="{
              gfm: {
                tag: 'a',
                href: 'https://github.github.com/gfm/',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            }"
          />
        </Tooltip>
      </div>
      <TextArea
        id="field-bio"
        :value="description.value"
        v-model="description.value"
        :maxlength="5000"
        :rows="10"
      ></TextArea>
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
import EditMutationWrapper from '@/components/profile/edit/EditMutationWrapper.vue';
import Icon from '@/components/ui/Icon.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Select from '@/components/ui/Select.vue';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Tooltip from '@/components/ui/Tooltip.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import EditPictureModal from './EditPictureModal.vue';
import Fetcher from '@/assets/js/fetcher';
import Fluent from '@/components/Fluent.vue';

const fetcher = new Fetcher();

export default {
  name: 'EditPersonalInfo',
  props: {
    staffInformation: Object,
    initialValues: Object,
  },
  components: {
    Combobox: () => import('@/components/ui/Combobox.vue'),
    EditPictureModal,
    EditMutationWrapper,
    Icon,
    PrivacySetting,
    Select,
    TextInput,
    TextArea,
    Tooltip,
    UserPicture,
    Fluent,
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
    avatar() {
      return {
        picture: this.pictureData.value,
        username: this.loggedInUser.primaryUsername.value,
      };
    },
  },
  mounted() {
    this.$refs.header.focus();
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
            value: value || '',
            display: display || null,
          };
          return obj;
        },
        {},
      ),
      staffInformationTitle: {
        value: this.staffInformation.title.value,
        display: this.staffInformation.title.metadata.display,
      },
      staffInformationOfficeLocation: {
        value: this.staffInformation.officeLocation.value,
        display: this.staffInformation.officeLocation.metadata.display,
      },
      showPictureModal: false,
      pictureData: { value: this.initialValues.picture.value || 'default:' },
      timezones: [],
      locations: [],
      hrEmail: 'mailto:HROPS@mozilla.com',
    };
  },
  methods: {
    async updateLocations(query) {
      this.timezone.value = '';
      const hit = this.locations[0] || {};
      if (query === hit.display) {
        this.setTimezone(hit);
      }
      try {
        const res = await fetcher.fetch(
          `/world/suggest?s=${encodeURIComponent(query)}`,
        );
        const json = await res.json();
        const locations = new Map(
          json.map((l) => [`${l.city}, ${l.region}, ${l.country}`, l]),
        );
        this.locations = [...locations.entries()].map(([display, item]) => {
          return { display, item };
        });
      } catch (e) {
        console.error(e);
      }
    },
    setTimezone({ item: { timezone } = {} }) {
      this.timezone.value = timezone || '';
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
.edit-personal-info > div > textarea,
.edit-personal-info > select {
  border: 1px solid transparent;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  padding: 0.5em 0.9em;
  width: 100%;
}
.edit-personal-info > textarea,
.edit-personal-info > div > textarea {
  resize: none;
}
.edit-personal-info > input[disabled] {
  background-color: transparent;
  border: 1px solid transparent;
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
.edit-personal-info__picture .user-picture ~ .privacy-select {
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
  .edit-personal-info > div > textarea,
  .edit-personal-info > select {
    margin: 0.5em 0;
  }
  .edit-personal-info > input {
    grid-column: 3 / 4;
  }
  .edit-personal-info > textarea,
  .edit-personal-info > .textarea {
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
  .user-picture.identicon ~ .edit-personal-info__picture-privacy {
    display: none;
  }
  .edit-personal-info__picture button {
    background-color: var(--gray-20);
    font-size: inherit;
  }
  .privacy-select {
    grid-column: 4 / 5;
    align-self: center;
    justify-self: center;
  }
}
</style>
