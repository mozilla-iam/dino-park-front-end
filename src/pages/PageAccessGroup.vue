<template>
  <RouterView v-if="showAccessGroup" />
  <LoadingSpinner v-else />
</template>

<script>
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

export default {
  name: 'AccessGroup',
  components: { LoadingSpinner },
  computed: {
    showAccessGroup() {
      return this.$store.state.accessGroup;
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
