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
      v-bind="{ picture, username: loggedInUser, staffInformation }"
      @close="showPictureModal = false"
    />
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Primary info</h2>
    </header>
    <div class="edit-personal-info">
      <div class="edit-personal-info__picture">
        <UserPicture
          :picture="picture.value"
          :username="loggedInUser.value"
          :size="264"
          :isStaff="true"
        ></UserPicture>
        <button
          class="button button--icon-only edit-personal-info__picture-edit-button"
          type="button"
          @click="showPictureModal = true"
        >
          <Icon id="pencil" :width="17" :height="17"></Icon>
          <span class="visually-hidden">Edit picture</span>
        </button>
        <PrivacySetting
          label="Profile picture privacy levels"
          id="field-picture-privacy"
          profileField="picture"
          class="edit-personal-info__picture-privacy"
          v-model="picture.display"
        />
      </div>

      <label for="field-username">Username</label>
      <input type="text" id="field-username" v-model="primaryUsername.value" />
      <PrivacySetting
        label="Username privacy levels"
        id="field-username-privacy"
        profileField="primaryUsername"
        v-model="primaryUsername.display"
      />

      <hr role="presentation" />

      <label for="field-first-name">First name</label>
      <input type="text" id="field-first-name" v-model="firstName.value" />
      <PrivacySetting
        label="First name privacy levels"
        id="field-first-name-privacy"
        profileField="firstName"
        v-model="firstName.display"
      />

      <hr role="presentation" />

      <label for="field-last-name">Last name</label>
      <input type="text" id="field-last-name" v-model="lastName.value" />
      <PrivacySetting
        label="Last name privacy levels"
        id="field-last-name-privacy"
        profileField="lastName"
        v-model="lastName.display"
      />

      <hr role="presentation" />

      <label for="field-pronouns" class="edit-personal-info__label"
        >Pronouns</label
      >
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
        profileField="pronouns"
        v-model="pronouns.display"
      />

      <hr role="presentation" />

      <label for="field-alt-name">Alternative name</label>
      <input type="text" id="field-alt-name" v-model="alternativeName.value" />
      <PrivacySetting
        label="Alternative name privacy levels"
        id="field-alt-name-privacy"
        profileField="alternativeName"
        v-model="alternativeName.display"
      />

      <hr role="presentation" />

      <label for="field-official-job-title">Official job title</label>
      <input type="text" disabled :value="staffInformation.title.value" />

      <hr role="presentation" />

      <label for="field-fun-job-title">Fun job title</label>
      <input type="text" id="field-fun-job-title" v-model="funTitle.value" />
      <PrivacySetting
        label="Fun title privacy levels"
        id="field-fun-title-privacy"
        profileField="funTitle"
        v-model="funTitle.display"
      />

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
      <PrivacySetting
        label="Location privacy levels"
        id="field-location-privacy"
        profileField="location"
        v-model="location.display"
      />

      <hr role="presentation" />

      <label for="field-timezone">Timezone</label>
      <Combobox
        v-if="timezones.length > 0"
        id="field-timezone"
        v-model="timezone.value"
        :allowCustomInput="true"
        :source="timezones"
      >
      </Combobox>
      <PrivacySetting
        label="Timezone privacy levels"
        id="field-timezone-privacy"
        profileField="timezone"
        v-model="timezone.display"
      />

      <hr role="presentation" />

      <div class="edit-personal-info__meta">
        Worker type, desk number, department, cost centre
      </div>

      <hr role="presentation" />

      <label for="field-bio">Bio</label>
      <textarea id="field-bio" v-model="description.value"></textarea>
      <PrivacySetting
        label="Bio privacy levels"
        id="field-bio-privacy"
        profileField="description"
        v-model="description.display"
      />
    </div>
  </EditMutationWrapper>
</template>

<script>
import Combobox from '@/components/ui/Combobox.vue';
import EditMutationWrapper from '@/components/profile/edit/EditMutationWrapper.vue';
import Icon from '@/components/ui/Icon.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Select from '@/components/ui/Select.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditPictureModal from './EditPictureModal.vue';

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
    PrivacySetting,
    Select,
    UserPicture,
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.$refs.header.focus();
    fetch('/api/v4/timezone/list/')
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
    };
  },
};
</script>
