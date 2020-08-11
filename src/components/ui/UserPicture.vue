<template>
  <div :class="[{ 'user-picture': true, identicon }, modifier]">
    <img
      v-if="src"
      ref="img"
      :class="cls"
      :src="src"
      :srcset="srcset"
      alt=""
      :width="size"
      role="presentation"
      aria-hidden="true"
    />
    <DinoType v-if="showLabel" :size="dinoTypeSize" />
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
    useSrcset: Boolean,
    showLabel: Boolean,
  },
  components: {
    DinoType,
  },
  watch: {
    size() {
      this.updateSize();
    },
    avatar() {
      this.updateUserPicture();
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
    updateUserPicture() {
      this.updateSize();
      if (
        this.avatar.picture === null ||
        this.avatar.picture === '' ||
        this.avatar.picture === 'default:' ||
        this.avatar.picture.startsWith('https://s3.amazonaws.com/')
      ) {
        this.identicon = true;
        generateIdenticon(this.avatar.username, this.size).then((i) => {
          this.src = i;
        });
      } else {
        this.identicon = false;
        if (this.avatar.picture === 'empty:') {
          this.src = '';
        } else if (
          this.avatar.picture &&
          this.avatar.picture.startsWith('data:')
        ) {
          this.src = this.avatar.picture;
        } else {
          this.src = avatarUrl(
            this.avatar.picture,
            this.slot,
            this.ownPicture(),
          );
        }
      }
      this.srcset = this.buildSrcset();
    },
    ownPicture() {
      return this.avatar.username === this.$store.state.scope.username;
    },
    buildSrcset() {
      if (this.identicon || !this.useSrcset) {
        return '';
      }

      const SRC_SIZE_TO_2X_SIZE = {
        40: 100,
        100: 264,
        264: 528,
      };

      let doubleSized = SRC_SIZE_TO_2X_SIZE[this.slot];

      // possible when the :pictureSize prop gets set to other values
      // where we don't have a bigger picture (e.g. 528)
      if (doubleSized === void 0) {
        return '';
      }

      return `${this.src} 1x, ${avatarUrl(
        this.avatar.picture,
        doubleSized,
        this.ownPicture(),
      )} 2x`;
    },
  },
  created() {
    this.updateUserPicture();
  },
  data() {
    return {
      src: '',
      srcset: '',
      dinoTypeSize: 'small',
      slot: 40,
      class: 'user-picture--40',
      modifier: '',
      identicon: true,
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
}
.user-picture--small {
  width: 2.85em;
  height: 2.85em;
}
.user-picture--small .dino-type {
  width: 1em;
  height: 1em;
}
.user-picture--medium {
  width: 6.25em;
  height: 6.25em;
}
.user-picture--medium .dino-type {
  width: 2em;
  height: 2em;
}
.user-picture--large /* the 'large' UserPicture is actually medium on small screens */ {
  width: 6.25em;
  height: 6.25em;
}
.user-picture--large .dino-type {
  width: 2em;
  height: 2em;
}
@media (min-width: 57.5em) {
  .user-picture--large {
    width: 18.75em;
    height: 18.75em;
  }
  .user-picture--large .dino-type {
    width: 5em;
    height: 5em;
  }
}
</style>
