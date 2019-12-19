<template>
  <RouterView v-if="!loading" />
  <LoadingSpinner v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

export default {
  name: 'AccessGroup',
  components: { LoadingSpinner },
  computed: {
    ...mapGetters({
      loading: 'accessGroup/getLoading',
    }),
    showAccessGroup() {
      return this.accessGroup;
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
