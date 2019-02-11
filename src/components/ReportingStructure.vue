<template>
  <div class="reporting-structure">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div v-if="manager" class="reporting-structure__reports-to">
      <h3>Reports to:</h3>
      <div>
        <Person modifier="person--borderless" v-bind="manager" />
      </div>
    </div>
    <div v-if="directs.length > 0" class="reporting-structure__manages">
      <h3>Manages:</h3>
      <div>
        <Person
          v-for="(direct, index) in directs"
          :modifier="directsView"
          :key="`direct-${index}`"
          v-bind="direct"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import Person from '@/components/Person.vue';

export default {
  name: 'ReportingStructure',
  props: {
    manager: Object,
    directs: Array,
    loading: false,
  },
  components: {
    LoadingSpinner,
    Person,
  },
  computed: {
    directsView() {
      return this.directs.length > 1
        ? 'person--borderless person--avatar-only'
        : 'person--borderless';
    },
  },
};
</script>

<style>
.reporting-structure__manages {
  margin-left: -1.5em;
  margin-right: -1.5em;
  padding: 0 1.5em 1.5em;
}
.reporting-structure__reports-to + .reporting-structure__manages {
  margin-top: 2em;
  border-top: 1px solid var(--gray-30);
  padding-top: 1.5em;
}
@media (min-width: 50em) {
  .reporting-structure__reports-to,
  .reporting-structure__manages {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: 7em 1fr;
  }
}
</style>
