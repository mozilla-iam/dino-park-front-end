<template>
  <div class="profile__access-groups">
    <template v-if="accessInformation.ldap.values">
      <h3>{{ fluent('profile_access-groups_ldap') }}</h3>
      <IconBlockList class="icon-block-list--multi-col">
        <IconBlock
          v-for="[group] in Object.entries(accessInformation.ldap.values)"
          :key="`group-${group}`"
          icon="idcard"
          >{{ group }}</IconBlock
        >
      </IconBlockList>
    </template>
    <template v-if="accessInformation.mozilliansorg.values">
      <h3>{{ fluent('profile_access-groups_mozillians') }}</h3>
      <IconBlockList class="icon-block-list--multi-col">
        <IconBlock
          v-for="[group] in Object.entries(
            accessInformation.mozilliansorg.values
          )"
          :key="`group-${group}`"
          icon="moz"
        >
          <RouterLink
            v-if="getFeature('access-groups-toggle')"
            :to="{
              name: 'Access Group',
              params: {
                groupname: group,
              },
            }"
            >{{ group }}</RouterLink
          >
          <ExternalLink
            v-else
            :href="`https://mozillians.org/group/${encodeURIComponent(group)}`"
            >{{ group }}</ExternalLink
          >
        </IconBlock>
      </IconBlockList>
      <p class="view-access-groups__mozillians-footer">
        {{ fluent('profile_access-groups_mozillians', 'footer') }}
      </p>
    </template>
  </div>
</template>

<script>
import ExternalLink from '@/components/ui/ExternalLink.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';

export default {
  name: 'ViewAccessGroups',
  props: {
    accessInformation: Object,
  },
  components: {
    ExternalLink,
    IconBlock,
    IconBlockList,
  },
};
</script>

<style>
.view-access-groups__mozillians-footer {
  margin-top: 1.5em;
  padding-right: 4em;
  color: var(--gray-50);
}
.profile__access-groups > h3:first-child {
  margin-top: unset;
}
.profile__access-groups > h3 {
  margin-top: 2em;
}
.profile__access-groups .icon-block {
  color: var(--gray-50);
}
</style>
