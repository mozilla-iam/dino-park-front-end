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
                v-for="(member, idx) in filterMemberList()"
                :key="idx"
                :class="{
                  'members-table__row': true,
                  active: member.pendingRemoval,
                }"
              >
                <td class="row-member-display">
                  <AccessGroupMemberListDisplay :member="member" />
                </td>
                <td
                  v-if="member.pendingRemoval"
                  colspan="3"
                  class="row-member-leave-confirm"
                >
                  <p class="leave-confirm__description">
                    Confirm removal from the group?
                  </p>
                  <Button
                    class="primary-button"
                    @click="handleRemoveConfirmClick(member)"
                    >Remove</Button
                  >
                  <Button
                    class="secondary-button"
                    @click="handleCancelClick(member)"
                    >Cancel</Button
                  >
                </td>
                <td v-if="!member.pendingRemoval">{{ member.role }}</td>
                <!-- Turn this into "x days" -->
                <td v-if="!member.pendingRemoval">
                  {{ expiry(member.expiration) }}
                </td>
                <td class="row-actions" v-if="!member.pendingRemoval">
                  <Button
                    class="button--secondary"
                    @click="handleRenewClick(member)"
                    >Renew</Button
                  >
                  <Button
                    class="tertiary-action delete"
                    @click="handleRemoveClick(idx)"
                  >
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
          <TagSelector
            v-on:tag:remove="handleCuratorRemoved"
            v-on:tag:add="handleCuratorAdded"
            v-model="curatorsList"
            :getLabel="getTagLabel"
            :updateAutoComplete="updateAutoCompleteList"
          />
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!curatorsListDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleCuratorsUpdateClicked()"
          >Update curators</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel title="Expiration">
      <template v-slot:content>
        <div class="members-expiration-container">
          <div class="content-area__row">
            <div class="radio-control">
              <input type="checkbox" v-model="membershipCanExpire" />Membership
              can expire
            </div>
          </div>
          <div class="content-area__row" v-if="membershipCanExpire">
            <label class="content-area__label"
              >Membership will expire after how many days</label
            >
            <NumberScrollerInput v-model="groupExpiration" />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupExpirationDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleUpdateExpirationClicked"
          >Update expiration</Button
        >
      </template>
    </AccessGroupEditPanel>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import AccessGroupMemberListDisplay from '@/components/access_group/AccessGroupMemberListDisplay.vue';
import TagSelector from '@/components/ui/TagSelector.vue';
import NumberScrollerInput from '@/components/ui/NumberScrollerInput.vue';
import ProfileApi from '@/assets/js/profile-api';
import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel';
import { expiryText } from '@/assets/js/component-utils';
import AccessGroups from '@/assets/js/access-groups';

const accessGroups = new AccessGroups();

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
  watch: {
    curatorsList(value) {
      this.curatorsListDirty =
        JSON.stringify(value) === JSON.stringify(this.accessGroupCurators);
    },
    groupExpiration(value) {
      if (value !== this.accessGroupExpiration) {
        this.groupExpirationDirty = true;
      }
    },
    membershipCanExpire(value) {
      if (
        (value && this.accessGroupExpiration === null) ||
        (!value && this.accessGroupExpiration !== null)
      ) {
        this.groupExpirationDirty = true;
      }
      if (!value) {
        this.groupExpiration = 0;
      }
    },
    allMembers() {
      this.allMembersList = this.$store.getters['accessGroup/getMembers'].map(
        member => {
          return {
            ...member,
            pendingRemoval: false,
          };
        }
      );
    },
  },
  data() {
    const accessGroupExpiration = this.$store.getters[
      'accessGroup/getExpiration'
    ];
    const accessGroupCurators = this.$store.getters['accessGroup/getCurators'];
    const accessGroupMembers = this.$store.getters['accessGroup/getMembers'];
    return {
      groupExpiration: !accessGroupExpiration ? 0 : accessGroupExpiration,
      groupData: '',
      groupDescriptionData: '',
      groupTermsData: '',
      curatorsList: accessGroupCurators,
      addedCurators: [],
      removedCurators: [],
      curatorsListDirty: false,
      membershipCanExpire: accessGroupExpiration > 0,
      groupExpirationDirty: false,
      memberListFilter: '',
      allMembersList: accessGroupMembers.map(member => {
        return {
          ...member,
          pendingRemoval: false,
        };
      }),
    };
  },
  methods: {
    ...mapActions({
      removeMember: 'accessGroup/removeMember',
      addCurators: 'accessGroup/addCurators',
      removeCurators: 'accessGroup/removeCurators',
      updateGroup: 'accessGroup/updateGroup',
      renewMember: 'accessGroup/renewMember',
    }),
    refreshMembersList() {
      this.allMembersList = this.allMembers.map(member => {
        return {
          ...member,
          pendingRemoval: false,
        };
      });
    },
    searchFormHandler(search) {
      this.memberListFilter = search;
    },
    clearSearchHandler() {
      this.memberListFilter = '';
    },
    handleRenewClick(member) {
      this.renewMember({
        memberUuid: member.uuid,
        expiration: member.expiration,
      }).then(result => {
        this.refreshMembersList();
        this.$root.$emit('toast', {
          content: `${memberName} was renewed`,
        });
      });
    },
    handleCancelClick(member) {
      member.pendingRemoval = false;
    },
    handleRemoveClick(idx) {
      const member = this.allMembersList[idx];
      member.pendingRemoval = true;
    },
    handleRemoveConfirmClick(member) {
      const memberName = member.name;
      this.removeMember(member).then(result => {
        this.refreshMembersList();
        this.$root.$emit('toast', {
          content: `${memberName} was removed from the group`,
        });
      });
    },
    getTagLabel(curator) {
      return curator.name;
    },
    updateAutoCompleteList(search) {
      return new Promise((res, rej) => {
        accessGroups.getUsers(search, this.getScope).then(results => {
          res(
            results.map(profile => DisplayMemberViewModel.fromUserData(profile))
          );
        });
      });
    },
    handleCuratorAdded(curator) {
      this.addedCurators.push(curator);
    },
    handleCuratorRemoved(curator) {
      this.removedCurators.push(curator);
    },
    handleCuratorsUpdateClicked() {
      let promises = [];
      if (this.addedCurators.length > 0) {
        promises.concat(this.addCurators(this.addedCurators));
      }
      if (this.removedCurators.length > 0) {
        promises.concat(this.removeCurators(this.removedCurators));
      }
      Promise.all(promises)
        .then(results => {
          this.$root.$emit('toast', {
            content: 'Curators successfully updated',
          });
          this.addedCurators = [];
          this.removedCurators = [];
          this.curatorsListDirty = false;
        })
        .catch(e => {
          console.error(e);
        });
    },
    handleUpdateExpirationClicked() {
      this.updateGroup({
        field: 'expiration',
        value: this.groupExpiration,
      }).then(result => {
        this.groupExpirationDirty = false;
        this.$root.$emit('toast', {
          content: `Access Group expiration has been successfully updated`,
        });
      });
    },
    expiry(expiration) {
      return expiryText(expiration);
    },
    filterMemberList() {
      return this.allMembersList.filter(
        member =>
          member.name
            .toLowerCase()
            .indexOf(this.memberListFilter.toLowerCase()) !== -1
      );
    },
  },
  computed: mapGetters({
    group: 'accessGroup/getGroup',
    accessGroupCurators: 'accessGroup/getCurators',
    accessGroupExpiration: 'accessGroup/getExpiration',
    allMembers: 'accessGroup/getMembers',
    getScope: 'scopeV2/get',
  }),
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

.members-table__row .row-member-leave-confirm {
  vertical-align: center;
  text-align: right;
}

.row-member-leave-confirm .leave-confirm__description {
  display: inline-block;
  font-weight: bold;
  margin-right: 1em;
  margin-top: 0;
  margin-bottom: 0;
}

.row-member-leave-confirm .button {
  display: inline-block;
  margin: 0 1em;
}

.row-member-leave-confirm .button:last-child {
  margin-right: 0;
}

.row-member-leave-confirm .primary-button {
  border: 1px solid #ff0039;
  color: #ff0039;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  height: 2em;
  background: var(--white);
}

.row-member-leave-confirm .secondary-button {
  border: 1px solid var(--gray-60);
  color: var(--gray-60);
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  height: 2em;
  background: var(--white);
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
