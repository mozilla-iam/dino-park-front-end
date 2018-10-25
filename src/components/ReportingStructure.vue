<template>
  <div class="reporting-structure">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div v-if="manager" class="reporting-structure__reports-to">
          <h3>Reports to:</h3>
          <Person
            :picture="{ value: manager.picture }"
            :userId="{ value: manager.userId }"
            :firstName="{ value: manager.firstName }"
            :lastName="{ value: manager.lastName }"
            :title="{ value: manager.title }"
            :funTitle="{ value: manager.funTitle }"
            :location="{ value: manager.location }"
          />
    </div>
    <div v-if="directs.length > 0" class="reporting-structure__manages">
          <h3>Manages:</h3>
          <Person
            v-for="(direct, index) in directs"
            :key="`direct-${index}`"
            :picture="{ value: direct.picture }"
            :userId="{ value: direct.userId }"
            :firstName="{ value: direct.firstName }"
            :lastName="{ value: direct.lastName }"
            :title="{ value: direct.title }"
            :funTitle="{ value: direct.funTitle }"
            :location="{ value: direct.location }"
            />
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
};
</script>

<style>
  .reporting-structure {
    display: flex;
    flex-direction: column;
  }
  @media(min-width:50em){
    .reporting-structure {
      flex-direction: row;
    }
  }
    .reporting-structure__reports-to {
      flex: 1;
      background-color: var(--gray-10);
      border-right: 1px solid var(--gray-20);
    }
    .reporting-structure__manages {
      padding: 1.5em;
      flex: 2;
    }

  /* @TODO make more elegant  */
  .profile__section .reporting-structure {
    margin: -1.5em -1.5em -1.5em -1.5em;
  }

  .profile__section .reporting-structure > div {
    padding: 1.5em 1.5em 5em;
  }
</style>
