<template>
  <img :class="cls" :src="src" alt="" :width="size" :title="title" role="presentation" aria-hidden="true">
</template>


<script>
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
    size: String,
    picture: String,
    username: String,
    title: String,
    cls: String,
  },
  watch: {
    username() {
      this.updateUserPicture();
    },
  },
  data() {
    this.updateUserPicture();
    return { src: this.picture };
  },
  methods: {
    updateUserPicture() {
      if (this.picture === null) {
        sha256(this.username).then((hash) => {
          const identicon = new Identicon(hash, { size: this.size, format: 'svg' });
          this.src = `data:image/svg+xml;base64,${identicon.toString()}`;
        });
      }
    },
  },
};
</script>
