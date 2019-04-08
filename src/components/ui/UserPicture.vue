<template>
  <div :class="'user-picture' + (modifier ? ' ' + modifier : '')">
    <img
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
import DinoType from './DinoType.vue';

export default {
  name: 'UserPicture',
  props: {
    size: Number,
    picture: String,
    username: String,
    cls: String,
    isStaff: Boolean,
  },
  components: {
    DinoType,
  },
  watch: {
    username() {
      this.updateUserPicture();
    },
  },
  asyncComputed: {
    async src() {
      this.decidePictureCategory();
      return this.updateUserPicture();
    },
  },
  methods: {
    async updateUserPicture() {
      if (this.picture && this.picture.startsWith('data:')) {
        return this.picture;
      }
      if (
        this.picture === null ||
        this.picture === '' ||
        this.picture === '/beta/img/user-demo.png' ||
        this.picture.startsWith('https://s3.amazonaws.com/')
      ) {
        return generateIdenticon(this.username, this.size);
      }
      return `${this.picture}?size=${this.slot}`;
    },
    decidePictureCategory() {
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
      this.modifier = `user-picture--${this.dinoTypeSize}`;
    },
  },
  data() {
    return {
      dinoTypeSize: 'small',
      slot: 40,
      modifier: 'user-picture--40',
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
  line-height: 1;
  padding: 0.25em;
}
.user-picture--small {
  width: 2.5em;
  height: 2.5em;
}
.user-picture--small .dino-type {
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: var(--imageRadius) 0;
  padding: 0.25em;
}
.user-picture--medium {
  width: 6.25em;
  height: 6.25em;
}
.user-picture--medium .dino-type {
  font-size: 0.9em;
  letter-spacing: 0.05em;
  padding: 0.3em 0.6em 0.3em 1.2em;
  border-radius: 1em 0 var(--imageRadius);
}
.user-picture--large /* the 'large' UserPicture is actually medium on small screens */ {
  width: 6.25em;
  height: 6.25em;
}
.user-picture--large .dino-type {
  letter-spacing: 0.05em;
  padding: 0.3em 0.6em 0.3em 1.2em;
  border-radius: 1em 0 var(--imageRadius);
}
@media (min-width: 57.5em) {
  .user-picture--large {
    width: 18.75em;
    height: 18.75em;
  }
  .user-picture--large .dino-type {
    left: 50%;
    right: auto;
    bottom: -0.5em;
    transform: translate(-50%, 25%);
    padding: 0.75em 2em;
    border-radius: 2em;
  }
}
</style>
