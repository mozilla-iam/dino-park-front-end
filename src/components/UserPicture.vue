<template>
  <div :class="'user-picture' + ( modifier ? ' ' + modifier : '')">
    <img :class="cls" :src="src" alt="" :width="size" role="presentation" aria-hidden="true">
    <DinoType v-if="dinoType" :type="dinoType" :size="dinoTypeSize" />
  </div>
</template>


<script>
import DinoType from '@/components/DinoType.vue';
import Identicon from 'identicon.js';

function hex(buffer) {
  const hexCodes = [];
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    const value = view.getUint32(i);
    const stringValue = value.toString(16);
    const padding = '00000000';
    const paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }
  return hexCodes.join('');
}

function sha256(str) {
  const buffer = new TextEncoder('utf-8').encode(str);
  return crypto.subtle.digest('SHA-256', buffer).then(hex);
}

export default {
  name: 'UserPicture',
  props: {
    size: Number,
    picture: String,
    username: String,
    cls: String,
    dinoType: String,
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
      this.decidePictureCategory(this.size);
      return this.updateUserPicture();
    },
  },
  methods: {
    async updateUserPicture() {
      if (this.picture === null || this.picture === '/beta/img/user-demo.png') {
        const hash = await sha256(this.username);
        const identicon = new Identicon(hash, { size: this.size, format: 'svg' });
        return `data:image/svg+xml;base64,${identicon.toString()}`;
      }
      return `/beta/avatar/${this.slot}/${this.picture}`;
    },
    decidePictureCategory(size) {
      if (size <= 40) {
        this.dinoTypeSize = 'small';
        this.slot = 40;
      } else if (size <= 100) {
        this.dinoTypeSize = 'medium';
        this.slot = 100;
      } else {
        this.dinoTypeSize = 'large';
        this.slot = 230;
      }
      this.modifier = `user-picture--${this.dinoTypeSize}`;
    },
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
    padding: .25em;
  }
  .user-picture--small {
    width: 2.5em;
    height: 2.5em;
  }
    .user-picture--small .dino-type {
      font-size: .75em;
      text-transform: uppercase;
      letter-spacing: .1em;
      border-radius: var(--imageRadius) 0;
      padding: .25em;
    }
  .user-picture--medium {
    width: 6.25em;
    height: 6.25em;
  }
    .user-picture--medium .dino-type {
      font-size: .9em;
      letter-spacing: .05em;
      padding: .3em .6em .3em 1.2em;
      border-radius: 1em 0 var(--imageRadius);
    }
  .user-picture--large /* the 'large' UserPicture is actually medium on small screens */ {
    width: 6.25em;
    height: 6.25em;
  }
    .user-picture--large .dino-type {
      letter-spacing: .05em;
      padding: .3em .6em .3em 1.2em;
      border-radius: 1em 0 var(--imageRadius);
    }
  @media (min-width:57.5em) {
    .user-picture--large {
      width: 15em;
      height: 15em;
    }
      .user-picture--large .dino-type {
        left: 50%;
        right: auto;
        bottom: -.5em;
        transform: translate(-50%,25%);
        padding: .75em 2em;
        border-radius: 2em;
      }
  }
</style>
