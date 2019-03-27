<template>
  <div>
    <header class="profile__section-header">
      <h2>Colleagues</h2>
      <RouterLink
        :to="{
          name: 'OrgchartHighlight',
          params: { username: primaryUsername.value },
        }"
        class="button button--secondary button--small"
      >
        <Icon id="org-chart" :width="16" :height="16" />
        Org Chart
        <Icon id="chevron-right" :width="18" :height="18" />
      </RouterLink>
    </header>
    <ReportingStructure :username="primaryUsername.value"> </ReportingStructure>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import ReportingStructure from '@/components/profile/ReportingStructure.vue';

export default {
  name: 'ViewLanguages',
  props: {
    primaryUsername: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    Icon,
    ReportingStructure,
  },
};
</script>
