<template>
  <section class="edit-members-container">
    <AccessGroupEditPanel :title="fluent('access-group_members')" :full="true">
      <template v-slot:content>
        <div class="members-list-container">
          <SearchForm
            class="edit-members__search"
            v-on:clear-query="clearSearchHandler"
            :searchFormHandler="searchFormHandler"
            :searchFormLabel="
              fluent('access-group_members', 'edit-members__search')
            "
          ></SearchForm>
          <table class="edit-members__table">
            <thead class="members-table__header">
              <tr>
                <th>
                  {{
                    fluent('access-group_members', 'members-table__header-1')
                  }}
                </th>
                <th>
                  {{
                    fluent('access-group_members', 'members-table__header-2')
                  }}
                </th>
                <th>
                  {{
                    fluent('access-group_members', 'members-table__header-3')
                  }}
                </th>
                <th>
                  {{
                    fluent('access-group_members', 'members-table__header-4')
                  }}
                </th>
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
                    {{ fluent('access-group_members', 'remove-confirm') }}
                  </p>
                  <Button
                    class="primary-button"
                    @click="handleRemoveConfirmClick(member)"
                    >{{
                      fluent('access-group_members', 'remove-action')
                    }}</Button
                  >
                  <Button
                    class="secondary-button"
                    @click="handleCancelClick(member)"
                    >{{
                      fluent('access-group_members', 'remove-cancel')
                    }}</Button
                  >
                </td>
                <td v-if="!member.pendingRemoval">{{ member.role }}</td>
                <!-- Turn this into "x days" -->
                <td v-if="!member.pendingRemoval">
                  {{ expiry(member.expiration) }}
                </td>
                <td class="row-actions" v-if="!member.pendingRemoval">
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
          <div class="edit-members__list">
            <div
              class="list__row"
              v-for="(member, idx) in filterMemberList()"
              :key="idx"
            >
              <div class="list__row--upper">
                <AccessGroupMemberListDisplay
                  :member="member"
                  class="upper__primary"
                />
                <Button
                  class="upper__action delete"
                  @click="handleRemoveClick(idx)"
                  v-if="!member.pendingRemoval"
                >
                  <Icon id="x" :width="16" :height="16" />
                </Button>
              </div>
              <div class="list__row--lower" v-if="!member.pendingRemoval">
                <p class="lower__primary">{{ member.role }}</p>
                <p class="lower__secondary">{{ expiry(member.expiration) }}</p>
              </div>
              <div
                class="list__row--lower row-member-leave-confirm"
                v-if="member.pendingRemoval"
              >
                <p class="lower__primary">
                  {{ fluent('access-group_members', 'remove-confirm-mobile') }}
                </p>
                <Button
                  class="lower__action primary-button"
                  @click="handleRemoveConfirmClick(member)"
                  >{{ fluent('access-group_members', 'remove-action') }}</Button
                >
                <Button
                  class="lower__action secondary-button"
                  @click="handleCancelClick(member)"
                  >{{ fluent('access-group_members', 'remove-cancel') }}</Button
                >
              </div>
            </div>
          </div>
          <Button class="edit-members__load-more">{{
            fluent('access-group_members', 'load-more')
          }}</Button>
        </div>
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel :title="fluent('access-group_curators')">
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
          >{{ fluent('access-group_curators', 'update-curators') }}</Button
        >
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel :title="fluent('access-group_expiration')">
      <template v-slot:content>
        <div class="members-expiration-container">
          <div class="content-area__row">
            <div class="radio-control">
              <input type="checkbox" v-model="membershipCanExpire" />
              {{ fluent('access-group_expiration', 'checkbox') }}
            </div>
          </div>
          <div class="content-area__row" v-if="membershipCanExpire">
            <label class="content-area__label">{{
              fluent('access-group_expiration', 'expiration-description')
            }}</label>
            <NumberScrollerInput v-model="groupExpiration" />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <Button
          :disabled="!groupExpirationDirty"
          class="button--secondary button--action row-primary-action"
          @click="handleUpdateExpirationClicked"
          >{{ fluent('access-group_expiration', 'update-expiration') }}</Button
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
import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel';
import { expiryText } from '@/assets/js/component-utils';
import AccessGroups from '@/assets/js/access-groups';

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
    accessGroupCurators(value) {
      this.curatorsList = value;
    },
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
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
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
        AccessGroups.getUsers(search, this.groupName).then(results => {
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
        promises.concat(
          this.removeCurators({
            curators: this.removedCurators,
            expiration: this.accessGroupExpiration,
          })
        );
      }
      this.setLoading();
      Promise.all(promises)
        .then(results => {
          this.$root.$emit('toast', {
            content: 'Curators successfully updated',
          });
          this.addedCurators = [];
          this.removedCurators = [];
          this.curatorsListDirty = false;
          this.completeLoading();
        })
        .catch(e => {
          console.error(e);
          this.completeLoading();
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
    groupName: 'accessGroup/getGroupName',
    accessGroupCurators: 'accessGroup/getCurators',
    accessGroupExpiration: 'accessGroup/getExpiration',
    allMembers: 'accessGroup/getMembers',
    getScope: 'scopeV2/get',
  }),
};
</script>

<style>
.edit-members-container {
  padding: 0;
}

@media (min-width: 57.5em) {
  .edit-members-container {
    padding: 1em;
  }
}

.edit-members-container .edit-members-section__header {
  font-size: 2em;
  font-weight: normal;
}

.members-list-container .edit-members__search {
  margin: 0 2em 1em;
}

@media (min-width: 57.5em) {
  .edit-members-container .edit-members-section__header {
    margin-left: 0;
  }
  .members-list-container .edit-members__search {
    margin: 0 auto 1em;
    width: auto;
  }
}

.edit-members__table {
  display: none;
}

.edit-members__list .list__row {
  padding-left: 2em;
  padding-bottom: 1em;
}

.edit-members__list .list__row:nth-child(even) {
  background: var(--gray-20);
}

.edit-members__list .list__row--upper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.list__row--upper .upper__primary {
  flex: 9;
}

.list__row--upper .upper__action {
  flex: 1;
  background: transparent;
  color: var(--neon-red);
  text-align: center;
}

.list__row--upper .upper__action:hover {
  border: none;
}

.edit-members__list .list__row--lower {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.list__row--lower .lower__primary,
.list__row--lower .lower__secondary {
  margin: 0;
}

.list__row--lower .lower__primary {
  flex: 5;
}
.list__row--lower .lower__secondary {
  color: var(--neon-red);
  flex: 1;
}

.list__row--lower.row-member-leave-confirm {
  display: flex;
  justify-content: space-between;
}

.list__row--lower.row-member-leave-confirm .lower__primary {
  font-weight: bold;
  flex: 2;
}

.list__row--lower.row-member-leave-confirm .lower__action {
  flex: 1;
  border: 1px solid var(--black);
  border-radius: 5em;
}

.list__row--lower.row-member-leave-confirm .primary-button {
  border-color: var(--neon-red);
  color: var(--neon-red);
}

@media (min-width: 57.5em) {
  .edit-members__table {
    display: table;
    border-collapse: collapse;
    width: 100%;
  }
  .edit-members__list {
    display: none;
  }
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
  /* position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%); */
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
