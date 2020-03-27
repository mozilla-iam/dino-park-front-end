<template>
  <section class="edit-members-container">
    <AccessGroupEditPanel
      :title="`${fluent('access-group_members')} (${memberCount})`"
      :full="true"
    >
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
          <Select
            class="options--chevron options--large sort-select"
            label="Sort"
            id="member-list-sort"
            v-model="selectedSort"
            :options="sortOptions"
            :nonOption="defaultSort"
          ></Select>
          <AccessGroupMembersTable :data="allMembers" :columns="membersColumns">
            <div
              slot="row-confirm"
              slot-scope="{ member, togglePending }"
              class="confirm-container"
            >
              <p class="leave-confirm__description">
                {{ fluent('access-group_members', 'remove-confirm') }}
              </p>
              <Button
                class="primary-button"
                @click="handleRemoveConfirmClick(member)"
                >{{ fluent('access-group_members', 'remove-action') }}</Button
              >
              <Button class="secondary-button" @click="togglePending(false)">{{
                fluent('access-group_members', 'remove-cancel')
              }}</Button>
            </div>
            <div
              slot="row-actions"
              slot-scope="{ member, togglePending }"
              class="member-actions"
            >
              <Button
                class="tertiary-action delete"
                v-if="canMemberBeRemoved(member)"
                @click="togglePending(true)"
              >
                <Icon id="x" :width="16" :height="16" />
              </Button>
            </div>
          </AccessGroupMembersTable>
          <Button
            class="edit-members__load-more"
            @click="loadMoreHandler"
            v-if="showLoadMore"
          >
            {{ fluent('access-group_members', 'load-more') }}
          </Button>
        </div>
      </template>
    </AccessGroupEditPanel>
    <AccessGroupEditPanel :title="fluent('access-group_curators')">
      <template v-slot:content>
        <div class="members-list-container tags-selector">
          <TagSelector
            class="tags-selector__value"
            v-on:tag:remove="handleCuratorRemoved"
            v-on:tag:add="handleCuratorAdded"
            v-model="curatorsList"
            :getLabel="getTagLabel"
            :updateAutoComplete="updateAutoCompleteList"
            :canBeRemoved="canMemberBeRemoved"
          />
          <p class="tags-selector__description">
            {{ fluent('access-group_curators', 'tags-selector__description') }}
          </p>
          <aside class="container-info">
            <Icon
              id="info"
              class="container-info__icon"
              :width="24"
              :height="24"
            />
            <p class="container-info__description">
              {{
                fluent('access-group_curators', 'container-info__description-1')
              }}
              <strong>
                {{
                  fluent(
                    'access-group_curators',
                    'container-info__description-2',
                  )
                }}
              </strong>
              {{
                fluent('access-group_curators', 'container-info__description-3')
              }}
            </p>
          </aside>
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
          <div class="content-area__row expiration-container">
            <label class="content-area__label expiration-container__label">{{
              fluent('access-group_expiration', 'expiration__description')
            }}</label>
            <RadioSelect
              class="expiration-container__value"
              :options="expirationOptions"
              v-model="groupExpiration"
              :isCustom="isExpirationCustom"
            />
          </div>
          <aside class="container-info">
            <Icon
              id="info"
              class="container-info__icon"
              :width="24"
              :height="24"
            />
            <p class="container-info__description">
              {{
                fluent(
                  'access-group_expiration',
                  'container-info__description-1',
                )
              }}
              <strong>
                {{
                  fluent(
                    'access-group_expiration',
                    'container-info__description-2',
                  )
                }}
              </strong>
              {{
                fluent(
                  'access-group_expiration',
                  'container-info__description-3',
                )
              }}
            </p>
          </aside>
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
import SelectCustom from '@/components/ui/SelectCustom.vue';
import RadioSelect from '@/components/ui/RadioSelect.vue';
import Select from '@/components/ui/Select.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import AccessGroupMembersTable from '@/components/access_group/AccessGroupMembersTable.vue';
import TagSelector from '@/components/ui/TagSelector.vue';
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
    AccessGroupMembersTable,
    TagSelector,
    SelectCustom,
    RadioSelect,
    Select,
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
    selectedExpiration(value) {
      if (value === 'custom') {
        this.groupExpiration = 0;
      } else {
        this.groupExpiration = value;
      }
    },
    selectedSort(value) {
      this.handleSortUpdated(value);
    },
  },
  data() {
    const accessGroupExpiration = this.$store.getters[
      'accessGroup/getExpiration'
    ];
    const accessGroupCurators = this.$store.getters['accessGroup/getCurators'];
    const accessGroupMembers = this.$store.getters['accessGroup/getMembers'];
    let selectedExpiration =
      accessGroupExpiration === 360 ||
      accessGroupExpiration === 720 ||
      accessGroupExpiration === 0
        ? accessGroupExpiration
        : 'custom';
    return {
      groupExpiration: !accessGroupExpiration ? 0 : accessGroupExpiration,
      groupData: '',
      groupDescriptionData: '',
      groupTermsData: '',
      curatorsList: accessGroupCurators,
      addedCurators: [],
      removedCurators: [],
      curatorsListDirty: false,
      groupExpirationDirty: false,
      memberListOptions: {
        search: '',
        sort: '',
        numResults: 20,
        next: null,
      },
      defaultSort: {
        value: '',
        label: 'Sort',
      },
      selectedSort: '',
      sortOptions: [
        { value: 'role-asc', label: 'Role Asc' },
        { value: 'role-desc', label: 'Role Desc' },
        { value: 'expiration-asc', label: 'Expiration Asc' },
        { value: 'expiration-desc', label: 'Expiration Desc' },
      ],
      membersColumns: [
        {
          header: this.fluent(
            'access-group_members',
            'members-table__header-1',
          ),
          primary: true,
        },
        {
          header: this.fluent(
            'access-group_members',
            'members-table__header-2',
          ),
          contentHandler: ({ role }) => role,
        },
        {
          header: this.fluent(
            'access-group_members',
            'members-table__header-3',
          ),
          contentHandler: ({ expiration }) => {
            if (!expiration) {
              return this.fluent('access-group_members', 'no-expiration');
            }
            return this.expiry(expiration);
          },
        },
        {
          header: this.fluent(
            'access-group_members',
            'members-table__header-4',
          ),
        },
      ],
      allMembersList: accessGroupMembers,
      expirationOptions: [
        {
          label: this.fluent('access-group_expiration', 'one-year'),
          value: 360,
        },
        {
          label: this.fluent('access-group_expiration', 'two-years'),
          value: 720,
        },
        {
          label: this.fluent('access-group_expiration', 'no-expire'),
          value: 0,
        },
        {
          label: this.fluent('access-group_expiration', 'custom'),
          value: 'custom',
        },
      ],
      selectedExpiration,
    };
  },
  methods: {
    ...mapActions({
      getMembersWithOptions: 'accessGroup/fetchMembersWithOptions',
      removeMember: 'accessGroup/removeMember',
      addCurators: 'accessGroup/addCurators',
      removeCurators: 'accessGroup/removeCurators',
      updateGroup: 'accessGroup/updateGroup',
      renewMember: 'accessGroup/renewMember',
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
    }),
    canMemberBeRemoved(member) {
      if (!this.allMembersList.length) {
        return false;
      }
      if (
        this.accessGroupCurators.length === 1 &&
        member.uuid === this.accessGroupCurators[0].uuid
      ) {
        return false;
      }
      return true;
    },
    searchFormHandler(search) {
      this.memberListOptions.search = search;
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.memberListOptions,
      });
    },
    clearSearchHandler() {
      this.memberListOptions.search = '';
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.memberListOptions,
      });
    },
    loadMoreHandler() {
      this.memberListOptions.next = this.membersNext;
      this.memberListOptions.numResults += 20;
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.memberListOptions,
      });
    },
    handleRenewClick(member) {
      this.renewMember({
        memberUuid: member.uuid,
        expiration: member.expiration,
      }).then((result) => {
        this.tinyNotification('access-group-member-renewed', memberName);
      });
    },
    handleRemoveConfirmClick(member) {
      const memberName = member.displayName;
      this.setLoading();
      this.removeMember(member).then((result) => {
        this.tinyNotification('access-group-member-removed', memberName);
        this.completeLoading();
      });
    },
    getTagLabel(curator) {
      return curator.displayName;
    },
    updateAutoCompleteList(search) {
      return new Promise((res, rej) => {
        AccessGroups.getUsers(search, this.groupName, true).then((results) => {
          res(
            results.map((profile) =>
              DisplayMemberViewModel.fromUserData(profile),
            ),
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
          }),
        );
      }
      this.setLoading();
      Promise.all(promises)
        .then((results) => {
          this.tinyNotification('access-group-curators-updated');
          this.addedCurators = [];
          this.removedCurators = [];
          this.curatorsListDirty = false;
          this.completeLoading();
        })
        .catch((e) => {
          console.error(e);
          this.completeLoading();
        });
    },
    handleUpdateExpirationClicked() {
      this.setLoading();
      this.updateGroup({
        field: 'expiration',
        value: parseInt(this.groupExpiration),
      }).then((result) => {
        this.groupExpirationDirty = false;
        this.tinyNotification('access-group-expiration-updated');
        this.completeLoading();
      });
    },
    expiry(expiration) {
      return expiryText(this.fluent, expiration);
    },
    isExpirationCustom(optionValue) {
      return optionValue === 'custom';
    },
    handleSortUpdated(value) {
      this.memberListOptions.sort = value;
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.memberListOptions,
      });
    },
  },
  computed: {
    ...mapGetters({
      group: 'accessGroup/getGroup',
      groupName: 'accessGroup/getGroupName',
      accessGroupCurators: 'accessGroup/getCurators',
      accessGroupExpiration: 'accessGroup/getExpiration',
      allMembers: 'accessGroup/getMembers',
      memberCount: 'accessGroup/getMemberCount',
      membersNext: 'accessGroup/getMembersNext',
    }),
    expirationIsCustom() {
      return this.selectedExpiration === 'custom';
    },
    showLoadMore() {
      return this.membersNext;
    },
  },
};
</script>

<style>
.edit-members-container {
  padding: 0;
  overflow: visible;
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

.members-list-container {
  position: relative;
}

.members-list-container .edit-members__search {
  margin: 0 2em 1em;
}

@media (min-width: 57.5em) {
  .edit-members-container .edit-members-section__header {
    margin-left: 0;
  }
  .members-list-container .edit-members__search {
    margin: 0 auto 2em;
    width: auto;
    padding-top: 0.5em;
  }
}

.sort-select {
  position: absolute;
  top: 0;
  right: 0;
}

.edit-members__table {
  display: none;
}

.confirm-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.confirm-container .leave-confirm__description {
  display: inline-block;
  font-weight: bold;
  margin-right: 1em;
  margin-top: 0;
  margin-bottom: 0;
}

.confirm-container .button {
  display: inline-block;
  margin: 0 1em;
}

.confirm-container .button:last-child {
  margin-right: 0;
}

.confirm-container .primary-button {
  border: 1px solid #ff0039;
  color: #ff0039;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  height: 2em;
  background: var(--white);
}

.confirm-container .secondary-button {
  border: 1px solid var(--gray-60);
  color: var(--gray-60);
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  height: 2em;
  background: var(--white);
}

.members-table__row .member-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.member-actions .button--secondary {
  display: inline-block;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  height: 2em;
}
.member-actions .tertiary-action {
  border: none;
  background: none;
  color: #ff0039;
  padding-right: 0;
  display: inline-block;
}

.edit-members-container .edit-members__load-more {
  margin: 1em auto;
  background-color: transparent;
  color: var(--black);
}

.tags-selector .tags-selector__description {
  color: var(--gray-40);
}

.container-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.container-info__icon {
  width: 7%;
  margin-right: 1em;
}
</style>
