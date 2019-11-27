<template>
  <section class="edit-members-container">
    <AccessGroupEditPanel title="Members" :full="true">
      <template v-slot:content>
        <div class="members-list-container">
          <SearchForm
            class="edit-members__search"
            v-on:clear-query="clearSearchHandler"
            :searchFormHandler="searchFormHandler"
            searchFormLabel="Search Members by Name"
          ></SearchForm>
          <table class="edit-members__table">
            <thead class="members-table__header">
              <tr>
                <th>Member</th>
                <th>Status</th>
                <th>Expiry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="members-table__content">
              <tr
                v-for="(member, idx) in allMembersList"
                :key="idx"
                :class="{
                  'members-table__row': true,
                  active: member.pendingRemoval,
                }"
              >
                <td class="row-member-display">
                  <AccessGroupMemberListDisplay :member="member" />
                </td>
                <td>{{ member.role }}</td>
                <!-- Turn this into "x days" -->
                <td>{{ member.expiration }}</td>
                <td class="row-actions">
                  <Button class="button--secondary">Renew</Button>
                  <Button class="tertiary-action delete">
                    <Icon id="x" :width="16" :height="16" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          <Button class="edit-members__load-more">Load more members</Button>
        </div>
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel title="Curators">
      <template v-slot:content>
        <div class="members-list-container">
          <TagSelector />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          disabled="disabled"
          class="button--secondary button--action row-primary-action"
          >Update curators</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel title="Expiration">
      <template v-slot:content>
        <div class="members-expiration-container">
          <div class="content-area__row">
            <div class="radio-control">
              <input type="checkbox" checked="true" />Membership can expire
            </div>
          </div>
          <div class="content-area__row">
            <label class="content-area__label"
              >Membership will expire after how many days</label
            >
            <NumberScrollerInput />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <Button
          disabled="disabled"
          class="button--secondary button--action row-primary-action"
          >Update expiration</Button
        >
      </template>
    </AccessGroupEditPanel>
  </section>
</template>

<script>
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import AccessGroupMemberListDisplay from '@/components/access_group/AccessGroupMemberListDisplay.vue';
import TagSelector from '@/components/ui/TagSelector.vue';
import NumberScrollerInput from '@/components/ui/NumberScrollerInput.vue';

export default {
  name: 'AccessGroupInformationEdit',
  components: {
    TextInput,
    TextArea,
    Button,
    Icon,
    AccessGroupEditPanel,
    SearchForm,
    AccessGroupMemberListDisplay,
    TagSelector,
    NumberScrollerInput,
  },
  props: [],
  mounted() {},
  data() {
    return {
      groupData: '',
      groupDescriptionData: '',
      groupTermsData: '',
    };
  },
  methods: {
    searchFormHandler(search) {},
    clearSearchHandler() {},
  },
  computed: {
    allMembersList() {
      return this.$store.getters.getAllMembers.map(member => {
        return {
          ...member,
          pendingRemoval: false,
        };
      });
    },
    curatorsList() {
      return this.$store.state.accessGroup.curators;
    },
  },
};
</script>

<style>
.edit-members-container {
  padding: 1em;
}

.edit-members-container .edit-members-section__header {
  font-size: 2em;
  font-weight: normal;
}

.members-list-container .edit-members__search {
  margin: 0 auto 1em;
}

.edit-members__table {
  border-collapse: collapse;
  width: 100%;
}

.edit-members__table .members-table__header {
  background: var(--gray-30);
  border-bottom: 1px solid var(--gray-40);
  color: var(--black);
  text-transform: uppercase;
  font-weight: bold;
}

.edit-members__table .members-table__header th {
  padding: 1.5em 1em;
  text-align: left;
}

.members-table__content .members-table__row:nth-child(even) {
  background: var(--gray-20);
}

.members-table__content .members-table__row td {
  padding-left: 1em;
}

.members-table__row .row-member-display {
  width: 30%;
}

.members-table__row .row-actions {
  vertical-align: center;
  position: relative;
}

.row-actions .button--secondary {
  display: inline-block;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  height: 2em;
}
.row-actions .tertiary-action {
  border: none;
  background: none;
  color: #ff0039;
  padding-right: 0;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.edit-members-container .edit-members__load-more {
  margin: 1em auto;
  background-color: var(--gray-30);
  color: var(--black);
}

.members-expiration-container .content-area__row .content-area__label {
  margin-right: 1em;
}
</style>
