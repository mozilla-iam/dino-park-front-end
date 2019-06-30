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
          class="edit-picture-modal__file visually-hidden"
          @change="handleChangeFile"
        />
      </label>
      <button
        type="button"
        class="button button--secondary"
        :disabled="deleteDisabled"
        @click="deleteImg"
      >
        Delete Photo
      </button>
    </div>

    <div class="edit-picture-modal__picture">
      <Crop v-if="imgSrc" :src="imgSrc" ref="crop" />
      <UserPicture
        v-else
        :picture="editPicture"
        :username="username.value"
        :size="264"
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
        @click="select()"
      >
        Select
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/_functional/Modal.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import Crop from './Cropper.vue';
import Fetcher from '@/assets/js/fetcher';

const fetcher = new Fetcher({ failoverOn: [302], failoverOnError: true });

function pngDataUrlToFile(dataUrl = '') {
  const prefix = 'data:image/png;base64,';
  const base64Data = dataUrl.substring(prefix.length);
  if (!dataUrl.startsWith(prefix) || !base64Data) {
    return null;
  }
  const byteString = atob(base64Data);
  const buf = Uint8Array.from(byteString, (b) => b.charCodeAt(0));
  return new Blob([buf], { tpye: 'image/png' });
}

export default {
  name: 'EditPictureModal',
  props: {
    picture: Object,
    pictureData: Object,
    username: Object,
    staffInformation: Object,
  },
  components: {
    Crop,
    Modal,
    UserPicture,
  },
  data() {
    return {
      imgSrc: null,
      editPicture: (this.picture && this.picture.value) || '',
      privacyAgreed: false,
    };
  },
  methods: {
    async deleteImg() {
      this.editPicture = 'default:';
      this.imgSrc = null;
    },
    async handleChangeFile(event) {
      const { default: loadImage } = await import('blueimp-load-image');
      loadImage(
        event.target.files[0],
        (img) => {
          this.imgSrc = img.toDataURL();
        },
        { orientation: true },
      );
    },
    async resize(img) {
      const file = pngDataUrlToFile(img);
      if (file !== null) {
        const formData = new FormData();
        formData.append('data', file);
        const res = await fetcher.fetch('/avatar/send/intermediate', {
          method: 'POST',
          body: formData,
        });
        const { uuid } = await res.json();
        if (uuid) {
          this.pictureData.value = img;
          this.picture.value = `intermediate:${uuid}`;
          this.$emit('close');
          return;
        }
      }
      this.$root.$emit('toast', { content: 'Unable to process picture.' });
    },
    select() {
      if (this.$refs.crop && this.imgSrc !== null) {
        const data = this.$refs.crop.cropper.toDataURL();
        this.resize(data);
      } else {
        // nothing changed
        if (this.editPicture === 'default:') {
          this.picture.value = '';
        }
        this.$emit('close');
      }
    },
  },
  computed: {
    deleteDisabled() {
      const isEmptyPicture =
        this.editPicture === 'default:' ||
        this.editPicture === 'empty:' ||
        this.editPicture === null ||
        this.editPicture === '' ||
        this.editPicture.startsWith('https://s3.amazonaws.com/');
      return isEmptyPicture && this.imgSrc === null;
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
.edit-picture-modal__picture {
  margin-bottom: 1.5em;
  display: flex;
  justify-content: center;
}
.focus-styles .edit-picture-modal__add-picture-button:focus-within {
  box-shadow: var(--focusOutlineShadow);
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
