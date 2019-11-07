<template>
  <main class="access-group">
    <section class="primary-area">
      <section class="primary-area__description">
        <AccessGroupDescription :title="groupid" :editable="!editing"></AccessGroupDescription>
      </section>
      <aside class="primary-area__control">
        <PanelSection title="Membership Management">
          <template v-slot:content>
            <AccessGroupMembershipManagement></AccessGroupMembershipManagement>
          </template>
        </PanelSection>
        <PanelSection title="Curators" :fullContent="curatorsList.length <= 3">
          <template v-slot:header>
            <EditButton
              v-if="!editing"
              :sendTo="{
                name: 'Edit Access Group',
                query: {
                  section: 'curators',
                },
              }"
              section="curators"
              sectionId="curators"
            ></EditButton>
          </template>
          <template v-slot:content>
            <AccessGroupCurators :curatorsList="curatorsList"></AccessGroupCurators>
          </template>
        </PanelSection>
      </aside>
    </section>
    <section class="secondary-area">
      <AccessGroupMembers />
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
import AccessGroupCurators from '@/components/access_group/AccessGroupCurators.vue';

const curatorsList = [
  {
    imageUrl: '/p/123',
    name: 'Batman',
    curatorId: '123',
    email: 'batman@gotham.com',
  },
  {
    imageUrl: '/p/1234',
    name: 'Robin',
    curatorId: '1234',
    email: 'robin@gotham.com',
  },
  {
    imageUrl: '/p/78',
    name: 'Joker',
    curatorId: '78',
    email: 'joker@gotham.com',
  },
  {
    imageUrl: '/p/780',
    name: 'Catwoman',
    curatorId: '780',
    email: 'catwoman@gotham.com',
  },
  {
    imageUrl: '/p/781',
    name: 'Harley Quinn',
    curatorId: '781',
    email: 'harleyquinn@gotham.com',
  },
  {
    imageUrl: '/p/782',
    name: 'Riddler',
    curatorId: '782',
    email: 'riddler@gotham.com',
  },
];
export default {
  name: 'AccessGroup',
  mixins: [LinksMixin],
  components: {
    Icon,
    LoadingSpinner,
    EditButton,
    PanelSection,
    AccessGroupDescription,
    AccessGroupMembers,
    AccessGroupMembershipManagement,
    AccessGroupCurators,
  },
  props: {
    groupid: String,
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
  },
  data() {
    return {
      curatorsList,
    };
  },
};
</script>

<style>
.home {
  padding-top: 2em;
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
    padding-top: 4em;
  }
  .access-group > img {
    float: right;
    margin-left: 8em;
    max-width: 50%;
    margin-bottom: 0;
  }
}

.primary-area {
  display: flex;
  flex-direction: column;
}

.primary-area__description {
  width: 100%;
}

@media (min-width: 57.5em) {
  .primary-area {
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
