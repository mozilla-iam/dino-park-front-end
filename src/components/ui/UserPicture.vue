<template>
  <div :class="'user-picture' + (modifier ? ' ' + modifier : '')">
    <img
      v-if="src"
      ref="img"
      :class="cls"
      :src="src"
      alt=""
      :width="size"
      role="presentation"
      aria-hidden="true"
    />
    <DinoType v-if="isStaff" :size="dinoTypeSize" />
  </div>
</template>

<script>
import generateIdenticon from '@/assets/js/identicon-avatar';
import avatarUrl from '@/assets/js/avatars';
import DinoType from './DinoType.vue';

export default {
  name: 'UserPicture',
  props: {
    size: Number,
    avatar: {
      type: Object,
      default: () => {
        return { picture: '', username: 'dino' };
      },
    },
    cls: String,
    pictureSize: Number,
    isStaff: Boolean,
  },
  components: {
    DinoType,
  },
  watch: {
    size() {
      this.updateSize();
    },
    avatar() {
      this.src = '';
      Promise.resolve().then(() => this.updateUserPicture());
    },
  },
  methods: {
    updateSize() {
      if (this.size <= 40) {
        this.dinoTypeSize = 'small';
        this.slot = 40;
      } else if (this.size <= 100) {
        this.dinoTypeSize = 'medium';
        this.slot = 100;
      } else {
        this.dinoTypeSize = 'large';
        this.slot = 264;
      }
      this.slot = this.pictureSize || this.slot;
      this.modifier = `user-picture--${this.dinoTypeSize}`;
    },
    async updateUserPicture() {
      this.updateSize();
      if (this.avatar.picture === 'empty:') {
        this.src = '';
      } else if (
        this.avatar.picture &&
        this.avatar.picture.startsWith('data:')
      ) {
        this.src = this.avatar.picture;
      } else if (
        this.avatar.picture === null ||
        this.avatar.picture === '' ||
        this.avatar.picture === 'default:' ||
        this.avatar.picture.startsWith('https://s3.amazonaws.com/')
      ) {
        this.src = await generateIdenticon(this.avatar.username, this.size);
      } else {
        this.src = avatarUrl(this.avatar.picture, this.slot);
      }
    },
  },
  created() {
    this.updateUserPicture();
  },
  data() {
    return {
      src: '',
      dinoTypeSize: 'small',
      slot: 40,
      class: 'user-picture--40',
      modifier: '',
    };
  },
};
</script>

<style>
.user-picture {
  position: relative;
}
.user-picture img {
  border-radius: var(--imageRadius);
  max-height: 100%;
}
@supports (object-fit: cover) {
  .user-picture img {
    width: 100%;
    height: 100%;
    max-height: none;
    object-fit: cover;
  }
}
.user-picture .dino-type {
  position: absolute;
  right: 0;
  bottom: 0;
  height: auto;
}
.user-picture--small {
  width: 2.85em;
  height: 2.85em;
}
.user-picture--small .dino-type {
  width: 1em;
}
.user-picture--medium {
  width: 6.25em;
  height: 6.25em;
}
.user-picture--medium .dino-type {
  width: 2em;
}
.user-picture--large /* the 'large' UserPicture is actually medium on small screens */ {
  width: 6.25em;
  height: 6.25em;
}
.user-picture--large .dino-type {
  width: 2em;
}
@media (min-width: 57.5em) {
  .user-picture--large {
    width: 18.75em;
    height: 18.75em;
  }
  .user-picture--large .dino-type {
    width: 5em;
  }
}
</style>
