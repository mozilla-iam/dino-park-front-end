<template>
  <div :class="'user-picture' + ( modifier ? ' ' + modifier : '')">
    <img :class="cls" :src="src" alt="" :width="size" :title="title" role="presentation" aria-hidden="true">
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
    title: String,
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
  data() {
    this.decidePictureCategory(this.size);
    this.updateUserPicture();
    return {
      src: this.picture,
    };
  },
  methods: {
    updateUserPicture() {
      if (this.picture === null || this.picture === '/beta/img/user-demo.png') {
        sha256(this.username).then((hash) => {
          const identicon = new Identicon(hash, { size: this.size, format: 'svg' });
          this.src = `data:image/svg+xml;base64,${identicon.toString()}`;
        });
      }
    },
    decidePictureCategory(size) {
      if (size <= 40) {
        this.dinoTypeSize = 'small';
      } else if (size <= 100) {
        this.dinoTypeSize = 'medium';
      } else {
        this.dinoTypeSize = 'large';
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
      font-size: .75em;
      letter-spacing: .05em;
      padding: .3em .6em .3em 1.2em;
      border-radius: 1em 0 var(--imageRadius);
    }
  .user-picture--large /* the 'large' UserPicture is actually medium on small screens */ {
    width: 6.25em;
    height: 6.25em;
  }
    .user-picture--large .dino-type {
      font-size: .75em;
      letter-spacing: .05em;
      padding: .3em .6em .3em 1.2em;
      border-radius: 1em 0 var(--imageRadius);
    }
  @media (min-width:50em) {
    .user-picture--large {
      width: 15em;
      height: 15em;
    }
      .user-picture--large .dino-type {
        left: 50%;
        right: auto;
        bottom: -.5em;
        transform: translate(-50%,25%);
        font-size: .9em;
        padding: .75em 2em;
        border-radius: 2em;
      }
  }
</style>
