<template>
  <Modal
    :heading="fluent('profile_picture', 'edit')"
    class="edit-picture-modal"
    :initiallyOpen="true"
    :closeButton="true"
    @close="$emit('close')"
  >
    <div class="edit-picture-modal__picture-buttons">
      <label
        class="edit-picture-modal__add-picture-button button button--secondary"
      >
        {{ fluent('profile_picture', 'add') }}
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
        {{ fluent('profile_picture', 'delete') }}
      </button>
    </div>

    <div class="edit-picture-modal__picture">
      <Crop v-if="imgSrc" :src="imgSrc" ref="crop" />
      <UserPicture
        v-else
        :avatar="{ picture: editPicture, username }"
        :size="264"
      ></UserPicture>
    </div>

    <label class="edit-picture-modal__privacy">
      <input
        type="checkbox"
        v-model="privacyAgreed"
        class="edit-picture-modal__privacy-checkbox"
      />
      <div>
        <Fluent
          id="profile_picture"
          attr="privacy-policy"
          :tags="{
            privacy: {
              tag: 'a',
              href: 'https://www.mozilla.org/en-US/privacy/',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          }"
        />
      </div>
    </label>

    <div class="edit-picture-modal__modal-buttons">
      <button
        type="button"
        class="edit-picture-modal__cancel-button button button--secondary"
        @click="$emit('close')"
      >
        {{ fluent('cancel') }}
      </button>
      <button
        type="button"
        class="button button--primary"
        :disabled="!privacyAgreed"
        @click="select()"
      >
        {{ fluent('select') }}
      </button>
    </div>
    <LoadingSpinner v-if="loading"></LoadingSpinner>
  </Modal>
</template>

<script>
import Modal from '@/components/_functional/Modal.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import Fetcher from '@/assets/js/fetcher';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import Fluent from '@/components/Fluent.vue';

const fetcher = new Fetcher();

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
    username: String,
    staffInformation: Object,
  },
  components: {
    Crop: () => import('./Cropper.vue'),
    Modal,
    UserPicture,
    LoadingSpinner,
    Fluent,
  },
  data() {
    return {
      imgSrc: null,
      editPicture: (this.picture && this.picture.value) || '',
      privacyAgreed: false,
      loading: false,
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
        { orientation: true, canvas: true },
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
        try {
          const { uuid } = await res.json();
          if (uuid) {
            this.pictureData.value = img;
            this.picture.value = `intermediate:${uuid}`;
            this.$emit('close');
            return;
          }
        } catch (e) {
          // TODO: make toast visible.
          this.$root.$emit('toast', { content: 'Unable to upload picture.' });
          return;
        }
      }
      // TODO: make toast visible.
      this.$root.$emit('toast', { content: 'Unable to process picture.' });
    },
    select() {
      if (this.$refs.crop && this.imgSrc !== null) {
        this.loading = true;
        const data = this.$refs.crop.cropper.toDataURL();
        this.resize(data).finally(() => {
          this.loading = false;
        });
      } else {
        // nothing changed
        if (this.editPicture === 'default:') {
          this.pictureData.value = '';
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
.edit-picture-modal .loading {
  position: absolute;
  z-index: var(--layerOne);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: row;
}
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
