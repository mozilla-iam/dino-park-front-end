<template>
  <Modal
    heading="Edit Profile Picture"
    :initiallyOpen="true"
    :closeButton="true"
    @close="$emit('close')"
  >
    <div class="edit-picture-modal__picture-buttons">
      <label
        class="edit-picture-modal__add-picture-button button button--secondary"
      >
        Add New Photo
        <input
          type="file"
          accept="image/*"
          class="edit-picture-modal__file"
          @change="handleChangeFile"
        />
      </label>
      <button
        type="button"
        class="button button--secondary"
        @click="imgSrc = null"
      >
        Delete Photo
      </button>
    </div>

    <div class="edit-picture-modal__picture">
      <Crop v-if="imgSrc" :src="imgSrc" />
      <UserPicture
        v-else
        :picture="picture.value"
        :username="username.value"
        :size="230"
        :isStaff="staffInformation.staff.value"
      ></UserPicture>
    </div>

    <label class="edit-picture-modal__privacy">
      <input
        type="checkbox"
        v-model="privacyAgreed"
        class="edit-picture-modal__privacy-checkbox"
      />
      <div>
        I'm okay with you handling this info as you explain in Mozilla's
        <a
          href="https://www.mozilla.org/en-US/privacy/"
          target="_blank"
          rel="noopener noreferrer"
          >privacy policy</a
        >.
      </div>
    </label>

    <div class="edit-picture-modal__modal-buttons">
      <button
        type="button"
        class="edit-picture-modal__cancel-button button button--secondary"
        @click="$emit('close')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="button button--primary"
        :disabled="!privacyAgreed"
      >
        Save
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/_functional/Modal.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import Crop from './Cropper.vue';

export default {
  name: 'EditPictureModal',
  props: { picture: Object, username: String, staffInformation: Object },
  components: {
    Crop,
    Modal,
    UserPicture,
  },
  data: () => ({ imgSrc: null, privacyAgreed: false }),
  methods: {
    handleChangeFile(event) {
      const fr = new FileReader();
      fr.onload = () => {
        this.imgSrc = fr.result;
      };
      fr.readAsDataURL(event.target.files[0]);
    },
  },
};
</script>

<style>
.edit-picture-modal__picture-buttons {
  margin-bottom: 1.5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.edit-picture-modal__add-picture-button {
  margin-right: 1em;
  cursor: pointer;
}
.edit-picture-modal__file {
  display: none;
}
.edit-picture-modal__picture {
  margin-bottom: 1.5em;
  display: flex;
  justify-content: center;
}
.edit-picture-modal__privacy {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 32em;
  margin: 2em auto;
}
.edit-picture-modal__privacy-checkbox {
  margin-right: 1em;
}
.edit-picture-modal__modal-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1.5em;
  border-top: 1px solid var(--gray-30);
}
.edit-picture-modal__cancel-button {
  margin-right: 1em;
}
</style>
