<template>
  <EditMutationWrapper
    :editVariables="{
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
      v-bind="{ picture, username: loggedInUser, staffInformation }"
      @close="showPictureModal = false"
    />
    <div class="edit-personal-info">
      <button
        class="edit-personal-info__picture"
        type="button"
        @click="showPictureModal = true"
      >
        <UserPicture
          :picture="picture.value"
          :username="loggedInUser.value"
          :size="230"
          :isStaff="staffInformation.staff.value"
        ></UserPicture>
      </button>

      <label for="field-username">Username</label>
      <input type="text" id="field-username" v-model="primaryUsername.value" />
      <div class="edit-personal-info__privacy">
        <Select
          label="Username privacy levels"
          id="field-username-privacy"
          v-bind="privacySettings"
          v-model="primaryUsername.display"
          :options="displayLevelsFor(primaryUsername.value)"
        />
      </div>

      <label for="field-first-name">First name</label>
      <input type="text" id="field-first-name" v-model="firstName.value" />
      <div class="edit-personal-info__privacy">
        <Select
          label="First name privacy levels"
          id="field-first-name-privacy"
          v-bind="privacySettings"
          v-model="firstName.display"
          :options="displayLevelsFor(firstName.value)"
        />
      </div>

      <hr role="presentation" />

      <label for="field-last-name">Last name</label>
      <input type="text" id="field-last-name" v-model="lastName.value" />
      <div class="edit-personal-info__privacy">
        <Select
          label="Last name privacy levels"
          id="field-last-name-privacy"
          v-bind="privacySettings"
          v-model="lastName.display"
          :options="displayLevelsFor(lastName.value)"
        />
      </div>

      <hr role="presentation" />

      <label for="field-pronouns" class="edit-personal-info__label"
        >Gender pronouns</label
      >
      <Combobox
        id="field-pronouns"
        v-model="pronouns.value"
        placeholder="Choose a pronoun or type your own"
        :source="['He/Him', 'She/Her', 'They/Them']"
      >
      </Combobox>
      <div class="edit-personal-info__privacy">
        <Select
          label="Pronoun privacy levels"
          id="field-pronoun-privacy"
          v-bind="privacySettings"
          v-model="pronouns.display"
          :options="displayLevelsFor(pronouns.value)"
        />
      </div>

      <hr role="presentation" />

      <label for="field-alt-name">Alternative name</label>
      <input type="text" id="field-alt-name" v-model="alternativeName.value" />
      <div class="edit-personal-info__privacy">
        <Select
          label="Alternative name privacy levels"
          id="field-alt-name-privacy"
          v-bind="privacySettings"
          v-model="alternativeName.display"
          :options="displayLevelsFor(alternativeName.value)"
        />
      </div>

      <hr role="presentation" />

      <label for="field-official-job-title">Official job title</label>
      <input type="text" disabled value="Staff Software Engineer" />

      <hr role="presentation" />

      <label for="field-fun-job-title">Fun job title</label>
      <input type="text" id="field-fun-job-title" v-model="funTitle.value" />
      <div class="edit-personal-info__privacy">
        <Select
          label="Fun title privacy levels"
          id="field-fun-title-privacy"
          v-bind="privacySettings"
          v-model="funTitle.display"
          :options="displayLevelsFor(funTitle.value)"
        />
      </div>
      <hr role="presentation" />

      <label for="field-location">Location</label>
      <Combobox
        id="field-location"
        v-model="location.value"
        :allowCustomInput="false"
        :source="[
          'Berlin',
          'Rotterdam',
          'San Francisco',
          'Cluj-Napoca',
          'München',
        ]"
      >
      </Combobox>

      <div class="edit-personal-info__privacy">
        <Select
          label="Location privacy levels"
          id="field-location-privacy"
          v-bind="privacySettings"
          v-model="location.display"
          :options="displayLevelsFor(location.value)"
        />
      </div>
      <hr role="presentation" />

      <label for="field-timezone">Timezone</label>
      <input type="text" id="field-timezone" v-model="timezone.value" />
      <div class="edit-personal-info__privacy">
        <Select
          label="Timezone privacy levels"
          id="field-timezone-privacy"
          v-bind="privacySettings"
          v-model="timezone.display"
          :options="displayLevelsFor(timezone.value)"
        />
      </div>
      <hr role="presentation" />

      <div class="edit-personal-info__meta">
        Worker type, desk number, department, cost centre
      </div>

      <hr role="presentation" />

      <label for="field-bio">Bio</label>
      <textarea id="field-bio" v-model="description.value"></textarea>
      <div class="edit-personal-info__privacy">
        <Select
          label="Bio privacy levels"
          id="field-bio-privacy"
          v-bind="privacySettings"
          v-model="description.display"
          :options="displayLevelsFor(description.value)"
        />
      </div>
    </div>
  </EditMutationWrapper>
</template>

<script>
import Combobox from '@/components/ui/Combobox.vue';
import EditMutationWrapper from '@/components/profile/edit/EditMutationWrapper.vue';
import Select from '@/components/ui/Select.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditPictureModal from './EditPictureModal.vue';

export default {
  name: 'EditPersonalInfo',
  props: {
    picture: Object,
    staffInformation: Object,
    initialValues: Object,
  },
  components: {
    Combobox,
    EditPictureModal,
    EditMutationWrapper,
    Select,
    UserPicture,
  },
  methods: {
    displayLevelsFor,
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      privacySettings: {
        collapsedShowIcon: true,
        collapsedShowLabel: false,
        expandedShowIcon: true,
        expandedShowLabel: true,
        class: 'options--zebra',
      },
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
    };
  },
};
</script>
