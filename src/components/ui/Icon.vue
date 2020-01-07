<template>
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    :width="width"
    :height="height"
  >
    <template v-if="id === 'self-avatar'">
      <image
        v-if="avatarUrl"
        :href="avatarUrl"
        x="0"
        y="0"
        width="24"
        height="24"
      />
    </template>
  </svg>
</template>

<script>
import avatarUrl from '@/assets/js/avatars';
import generateIdenticon from '@/assets/js/identicon-avatar';

export default {
  name: 'Icon',
  props: {
    width: Number,
    height: Number,
    id: String,
  },
  mounted() {
    if (this.id === 'self-avatar') {
      if (this.$store.state.user.picture.value) {
        this.avatarUrl = avatarUrl(
          this.$store.state.user.picture.value,
          40,
          true,
        );
      } else {
        generateIdenticon(
          this.$store.state.user.primaryUsername.value,
          40,
        ).then((a) => {
          this.avatarUrl = a;
        });
      }
    }
  },
  data() {
    return {
      avatarUrl: null,
    };
  },
};
</script>
