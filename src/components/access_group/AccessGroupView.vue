<template>
  <main
    class="access-group"
    v-if="groupInformation"
    @dp-group-join="fetchAccessGroupInformation"
  >
    <section class="primary-area">
      <section class="primary-area__description">
        <AccessGroupDescription
          :groupInformation="groupInformation"
          :editable="!editing"
        />
      </section>
      <aside class="primary-area__control">
        <PanelSection
          v-if="isCurator"
          :title="fluent('access-group_membership-management')"
        >
          <template v-slot:content>
            <AccessGroupMembershipManagement
              :groupInformation="groupInformation"
            ></AccessGroupMembershipManagement>
          </template>
        </PanelSection>
        <PanelSection :title="fluent('access-group_details')">
          <template v-slot:content>
            <AccessGroupDetails
              :groupInformation="groupInformation"
            ></AccessGroupDetails>
          </template>
        </PanelSection>
      </aside>
    </section>
    <section class="secondary-area">
      <AccessGroupMembers :groupInformation="groupInformation" />
    </section>
  </main>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import EditButton from '@/components/ui/EditButton.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import PanelSection from '@/components/ui/PanelSection.vue';
import AccessGroupDescription from '@/components/access_group/AccessGroupDescription.vue';
import AccessGroupMembershipManagement from '@/components/access_group/AccessGroupMembershipManagement.vue';
import AccessGroupMembers from '@/components/access_group/AccessGroupMembers.vue';
import AccessGroupDetails from '@/components/access_group/AccessGroupDetails.vue';
import { Api } from '@/assets/js/access-groups-api.js';
import {
  GroupViewModel,
  MembershipModel,
} from '@/view_models/AccessGroupViewModel';

const accessGroupApi = new Api();
export default {
  name: 'AccessGroupView',
  mixins: [LinksMixin],
  components: {
    Icon,
    LoadingSpinner,
    EditButton,
    PanelSection,
    AccessGroupDescription,
    AccessGroupMembers,
    AccessGroupMembershipManagement,
    AccessGroupDetails,
  },
  props: {
    groupname: String,
  },
  methods: {
    async fetchAccessGroupInformation() {
      const groupData = await accessGroupApi.execute({
        path: 'group/get',
        endpointArguments: [this.groupname],
      });

      const groupInformation = {};
      groupInformation.group = new GroupViewModel(groupData.group);
      groupInformation.membership = new MembershipModel(groupData.membership);
      groupInformation.memberCount = !groupData.member_count
        ? 0
        : groupData.member_count;
      groupInformation.invitationCount = !groupData.invitation_count
        ? 0
        : groupInformation.invitation_count;
      groupInformation.renewalCount = !groupData.renewal_count
        ? 0
        : groupInformation.renewal_count;
      groupInformation.requestCount = groupData.request_count;
      groupInformation.invitationConfig = groupData.invitation;
      groupInformation.isCurator = Boolean(groupData.curator);
      groupInformation.isMember = Boolean(groupData.member);

      this.groupInformation = groupInformation;
    },
  },
  computed: {
    editing() {
      if (
        this.$route.name === 'Edit Access Group' &&
        this.$route.query.section
      ) {
        return this.$route.query.section;
      }
      return null;
    },
    isCurator() {
      return this.groupInformation.isCurator;
    },
  },
  data() {
    return {
      groupInformation: null,
      members: [],
      membersNext: null,
    };
  },
  mounted() {
    this.fetchAccessGroupInformation();
  },
};
</script>

<style>
@media (min-width: 57.5em) {
  .access-group-container .container {
    max-width: 70em;
  }
  .access-group.container {
    margin-top: 2em;
    margin-bottom: 2em;
  }
}
.access-group > img {
  margin-bottom: 1em;
}
.access-group h1 {
  margin-bottom: 0;
  font-size: 2.5em;
  line-height: 1.1;
}
.access-group p {
  color: var(--gray-50);
}
.access-group .button {
  display: inline-flex;
  margin-top: 2em;
  margin-bottom: 2em;
}

.access-group p:last-child {
  margin-bottom: 0;
}

@media (min-width: 50em) {
  .access-group {
    display: inline-block;
    width: 100%;
    padding-top: 2em;
    margin-top: 2em;
  }
  .access-group > img {
    float: right;
    margin-left: 8em;
    max-width: 50%;
    margin-bottom: 0;
  }
}

.access-group .edit-button.access-group__edit {
  position: absolute;
  top: 2em;
  right: 1.5em;
}

.access-group .primary-area {
  display: flex;
  flex-direction: column;
  overflow: visible;
}

.primary-area__description {
  width: 100%;
  overflow: visible;
}

@media (min-width: 57.5em) {
  .access-group .primary-area {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .primary-area__description {
    width: 55%;
    margin-right: 5%;
  }

  .primary-area__control {
    display: flex;
    flex-direction: column;
    width: 40%;
  }
}

.secondary-area {
  overflow: visible;
}
</style>
