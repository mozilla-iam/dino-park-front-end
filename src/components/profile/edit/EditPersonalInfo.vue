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
    :formName="fluent('profile_primary', 'edit')"
  >
    <EditPictureModal
      v-if="showPictureModal"
      v-bind="{
        picture,
        pictureData,
        username: loggedInUsername,
        staffInformation,
      }"
      @close="showPictureModal = false"
    />
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>{{ fluent('profile_primary') }}</h2>
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
          <span class="visually-hidden">{{
            fluent('profile_picture', 'edit')
          }}</span>
        </button>
        <PrivacySetting
          :label="fluent('profile_picture', 'privacy')"
          id="field-picture-privacy"
          profileFieldName="picture"
          :profileFieldObject="picture"
          class="edit-personal-info__picture-privacy"
        />
      </div>

      <div class="edit-personal-info__label">
        <label for="field-username">{{ fluent('profile_username') }}</label>
        <Tooltip
          :buttonText="fluent('profile_username', 'tooltip-open')"
          :alternateButtonText="fluent('profile_username', 'tooltip-close')"
          >{{ fluent('profile_username', 'tooltip') }}</Tooltip
        >
      </div>
      <input type="text" id="field-username" v-model="primaryUsername.value" />
      <PrivacySetting
        :label="fluent('profile_username', 'privacy')"
        id="field-username-privacy"
        profileFieldName="primaryUsername"
        :profileFieldObject="primaryUsername"
        :disabled="true"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-first-name">{{ fluent('profile_first-name') }}</label
        ><Tooltip
          :buttonText="fluent('profile_first-name', 'tooltip-open')"
          :alternateButtonText="fluent('profile_first-name', 'tooltip-close')"
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
        :label="fluent('profile_first-name', 'privacy')"
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
        :label="fluent('profile_last-name', 'privacy')"
        id="field-last-name-privacy"
        profileFieldName="lastName"
        :profileFieldObject="lastName"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-pronouns">{{ fluent('profile_pronouns') }}</label>
        <Tooltip
          :buttonText="fluent('profile_pronouns', 'tooltip-open')"
          :alternateButtonText="fluent('profile_pronouns', 'tooltip-close')"
          >{{ fluent('profile_pronouns', 'tooltip') }}</Tooltip
        >
      </div>
      <Combobox
        id="field-pronouns"
        v-model="pronouns.value"
        :placeholder="fluent('profile_pronouns', 'placeholder')"
        :source="['he/him', 'she/her', 'they/them']"
      >
      </Combobox>
      <PrivacySetting
        :label="fluent('profile_pronouns', 'privacy')"
        id="field-pronoun-privacy"
        profileFieldName="pronouns"
        :profileFieldObject="pronouns"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-alt-name">{{ fluent('profile_alt-name') }}</label
        ><Tooltip
          :buttonText="fluent('profile_alt-name', 'tooltip-open')"
          :alternateButtonText="fluent('profile_alt-name', 'tooltip-close')"
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
        :label="fluent('profile_alt-name', 'privacy')"
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
            :buttonText="fluent('profile_official-job-title', 'tooltip-open')"
            :alternateButtonText="
              fluent('profile_official-job-title', 'tooltip-close')
            "
            ><Fluent
              id="profile_official-job-title"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: globalLinks.hrEmail },
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
          :label="fluent('profile_official-job-title', 'privacy')"
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
          :buttonText="fluent('profile_fun-job-title', 'tooltip-open')"
          :alternateButtonText="
            fluent('profile_fun-job-title', 'tooltip-close')
          "
          >{{
            fluent(
              'profile_fun-job-title',
              scope.isStaff ? 'tooltip' : 'tooltip-contributor',
            )
          }}</Tooltip
        >
      </div>
      <TextInput
        type="text"
        id="field-fun-job-title"
        v-model="funTitle.value"
        :maxlength="90"
      />
      <PrivacySetting
        :label="fluent('profile_fun-job-title', 'privacy')"
        id="field-fun-title-privacy"
        profileFieldName="funTitle"
        :profileFieldObject="funTitle"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-location">{{ fluent('profile_location') }}</label>
        <Tooltip
          :buttonText="fluent('profile_location', 'tooltip-open')"
          :alternateButtonText="fluent('profile_location', 'tooltip-close')"
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
        :label="fluent('profile_location', 'privacy')"
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
            :buttonText="fluent('profile_office-location', 'tooltip-open')"
            :alternateButtonText="
              fluent('profile_office-location', 'tooltip-close')
            "
            ><Fluent
              id="profile_office-location"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: globalLinks.hrEmail },
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
          :label="fluent('profile_office-location', 'privacy')"
          id="field-office-location-privacy"
          profileFieldName="staffInformation.officeLocation"
          :profileFieldObject="staffInformationOfficeLocation"
        />
      </template>

      <hr role="presentation" />

      <div class="edit-personal-info__label">
        <label for="field-timezone">{{ fluent('profile_timezone') }}</label>
        <Tooltip
          :buttonText="fluent('profile_timezone', 'tooltip-open')"
          :alternateButtonText="fluent('profile_timezone', 'tooltip-close')"
          >{{ fluent('profile_timezone', 'tooltip') }}</Tooltip
        >
      </div>
      <input type="text" id="field-timezone" disabled :value="timezone.value" />
      <PrivacySetting
        :label="fluent('profile_timezone', 'privacy')"
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
            :buttonText="fluent('profile_worker-type', 'tooltip-open')"
            :alternateButtonText="
              fluent('profile_worker-type', 'tooltip-close')
            "
            ><Fluent
              id="profile_worker-type"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: globalLinks.hrEmail },
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
          :label="fluent('profile_worker-type', 'privacy')"
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
            :buttonText="fluent('profile_cost-center', 'tooltip-open')"
            :alternateButtonText="
              fluent('profile_cost-center', 'tooltip-close')
            "
            ><Fluent
              id="profile_cost-center"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: globalLinks.hrEmail },
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
          :label="fluent('profile_cost-center', 'privacy')"
          id="field-cost-center-privacy"
          profileFieldName="staffInformation.costCenter"
          :profileFieldObject="staffInformation.costCenter"
          :disabled="true"
        />

        <hr role="presentation" />

        <div class="edit-personal-info__label">
          <label for="field-team">{{ fluent('profile_team') }}</label>
          <Tooltip
            :buttonText="fluent('profile_team', 'tooltip-open')"
            :alternateButtonText="fluent('profile_team', 'tooltip-close')"
            ><Fluent
              id="profile_team"
              attr="tooltip"
              :tags="{
                email: { tag: 'a', href: globalLinks.hrEmail },
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
          :label="fluent('profile_team', 'privacy')"
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
          :buttonText="fluent('profile_bio', 'tooltip-open')"
          :alternateButtonText="fluent('profile_bio', 'tooltip-close')"
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
        :label="fluent('profile_bio', 'privacy')"
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
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

const fetcher = new Fetcher();

export default {
  name: 'EditPersonalInfo',
  props: {
    staffInformation: Object,
    initialValues: Object,
  },
  mixins: [LinksMixin],
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
  },
  computed: {
    loggedInUsername() {
      return this.$store.state.scope.username;
    },
    avatar() {
      return {
        picture: this.pictureData.value,
        username: this.loggedInUsername,
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
        const json = await fetcher.fetch(
          `/world/suggest?s=${encodeURIComponent(query)}`,
        );
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
