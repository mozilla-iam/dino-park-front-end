<template>
  <div v-if="this.related.show" class="reporting-structure">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <ReportingStructureGroup
      v-if="this.related.manager"
      :isSingle="true"
      :person="this.related.manager"
      :viewAs="this.viewAs"
      :heading="fluent('profile_colleagues_reports')"
    />
    <ReportingStructureGroup
      :collection="this.related.directs"
      :collectionName="'directs'"
      :viewAs="this.viewAs"
      :heading="fluent('profile_colleagues_manages')"
    />
    <ReportingStructureGroup
      :collection="this.related.peers"
      :collectionName="'peers'"
      :viewAs="this.viewAs"
      :heading="fluent('profile_colleagues_peers')"
    />
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import Person from '@/components/ui/Person.vue';
import ShowMore from '@/components/_functional/ShowMore.vue';
import ReportingStructureGroup from './ReportingStructureGroup.vue';

export default {
  name: 'ReportingStructure',
  props: {
    related: Object,
    loading: false,
    viewAs: {
      type: String,
      default: 'list',
    },
  },
  components: {
    Icon,
    LoadingSpinner,
    Person,
    ShowMore,
    ReportingStructureGroup,
  },
};
</script>
