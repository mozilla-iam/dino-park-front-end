<template>
  <section class="edit-members-container">
    <AccessGroupEditPanel
      :title="`${fluent('access-group_members')} (${memberCount})`"
      :full="true"
    >
      <template v-slot:content>
        <p class="edit-members-meta">
          {{ fluent('access-group_members', 'edit-members-meta') }}
          <output class="edit-members-meta__focus">{{
            expirationMetaText
          }}</output>
        </p>
        <div class="members-list-container">
          <header class="members-list-container__controls">
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
          </header>
          <AccessGroupMembersTable
            :data="membersList"
            :columns="membersColumns"
            :totalRows="memberCount"
            :rowHasExpandedContent="membersRowHasExpandedContent"
            :loadMoreHandler="loadMoreHandler"
            :loadMoreText="fluent('access-group_members', 'load-more')"
          >
            <div
              slot="row-expandable-content"
              slot-scope="{ member }"
              class="expandable-content-container"
            >
              <p class="expandable-content-container__first-row">
                {{ getRowExpirationIntroText(member) }}
              </p>
              <form
                novalidate
                v-on:submit.prevent="
                  (ev) => handleCustomRenew(ev, member, selectedRowExpiration)
                "
                class="expandable-content-container__second-row"
              >
                <ExpirationSelect
                  class="renew-expiration-select"
                  v-model="selectedRowExpiration"
                  :highlightError="customExpirationErrorHighlight"
                />
                <div class="expiration-actions">
                  <Button class="primary-button renew" type="submit">{{
                    fluent('access-group_members', 'renew-action')
                  }}</Button>
                </div>
              </form>
            </div>
            <div
              slot="row-expandable-actions"
              slot-scope="{ member }"
              class="expandable-actions-container"
            >
              <p class="member-email" v-if="member.email">
                {{ fluent('access-group_members', 'expandable-email') }}
                <a :href="`mailto:${member.email}`">{{ member.email }}</a>
              </p>
              <Button
                class="primary-button delete"
                @click="handleRemoveConfirmClick(member)"
                v-if="canMemberBeRemoved(member)"
                >{{ fluent('access-group_members', 'remove-action') }}</Button
              >
            </div>
            <div
              slot="row-actions"
              slot-scope="{ member, toggleExpand }"
              class="member-actions"
            >
              <Button
                class="primary-action renew"
                @click="handleRenewClick(member)"
                v-if="isMemberUpForRenewal(member)"
                >{{ fluent('access-group_members', 'renew-action') }}</Button
              >
              <Button
                class="tertiary-action expand"
                @click="toggleExpand(true)"
                :title="
                  fluent('access-group_members', 'expandable-action-text')
                "
              >
                <Icon id="chevron-down" :width="32" :height="32" />
              </Button>
            </div>
            <div
              slot="row-actions-expanded"
              slot-scope="{ member, toggleExpand }"
              class="member-actions"
            >
              <Button
                class="tertiary-action expand"
                @click="toggleExpand(false)"
              >
                <Icon id="chevron-up" :width="32" :height="32" />
              </Button>
            </div>
          </AccessGroupMembersTable>
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
    <AccessGroupEditPanel
      form="expirationForm"
      :handler="handleUpdateExpiration"
      :beforeHandler="beforeHandleUpdateExpiration"
      :title="fluent('access-group_expiration')"
    >
      <template v-slot:content>
        <div class="members-expiration-container">
          <div class="content-area__row expiration-container">
            <label class="content-area__label expiration-container__label">
              {{ fluent('access-group_expiration', 'expiration__description') }}
            </label>
            <ExpirationSelect
              class="expiration-container__value"
              v-model="groupExpiration"
              :highlightError="updateExpirationErrorHighlight"
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
              <Fluent
                id="access-group_expiration"
                attr="container-info__description"
              />
            </p>
          </aside>
        </div>
      </template>
      <template v-slot:footer>
        <Button
          type="submit"
          :disabled="!groupExpirationDirty"
          class="button--secondary button--action row-primary-action"
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
import ExpirationSelect from '@/components/ui/ExpirationSelect.vue';
import Select from '@/components/ui/Select.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import AccessGroupMembersTable from '@/components/access_group/AccessGroupMembersTable.vue';
import TagSelector from '@/components/ui/TagSelector.vue';
import MembersListMixin from '@/components/_mixins/MembersListMixin.vue';
import {
  DisplayMemberViewModel,
  MEMBER_EXPIRATION_NONE,
  MEMBER_EXPIRATION_ONE_YEAR,
  MEMBER_EXPIRATION_TWO_YEARS,
} from '@/view_models/AccessGroupViewModel';
import {
  expiryTextFromDate,
  getExpirationDate,
  getDaysFromToday,
} from '@/assets/js/component-utils';
import AccessGroups from '@/assets/js/access-groups';

const memberRenewalThreshold = 14;

export default {
  name: 'AccessGroupMembersEdit',
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
    Select,
    ExpirationSelect,
  },
  mixins: [MembersListMixin],
  props: {
    groupInformation: Object,
    tos: String,
  },
  watch: {
    accessGroupCurators(value) {
      this.curatorsList = value;
    },
    curatorsList(value) {
      this.curatorsListDirty =
        JSON.stringify(value) === JSON.stringify(this.curatorsList);
    },
    groupExpiration(value) {
      if (value !== this.accessGroupExpiration) {
        this.groupExpirationDirty = true;
      }
    },
    selectedExpiration(value) {
      if (value === 'custom') {
        this.groupExpiration = MEMBER_EXPIRATION_ONE_YEAR;
      } else {
        this.groupExpiration = value;
      }
    },
    selectedSort(value) {
      this.updateSort(value);
    },
  },
  async created() {
    this.curatorsList = await this.fetchAccessGroupCurators();
  },
  data() {
    const accessGroupExpiration = this.groupInformation.group.expiration || 0;
    // TODO: Figure out what this value does and delete it if unnecessary
    let selectedExpiration =
      accessGroupExpiration === MEMBER_EXPIRATION_ONE_YEAR ||
      accessGroupExpiration === MEMBER_EXPIRATION_TWO_YEARS ||
      accessGroupExpiration === MEMBER_EXPIRATION_NONE
        ? accessGroupExpiration
        : 'custom';
    return {
      updateExpirationErrorHighlight: false,
      customExpirationErrorHighlight: false,
      groupExpiration: !accessGroupExpiration ? 0 : accessGroupExpiration,
      groupData: '',
      groupDescriptionData: '',
      groupTermsData: '',
      curatorsList: [],
      addedCurators: [],
      removedCurators: [],
      curatorsListDirty: false,
      groupExpirationDirty: false,
      selectedRowExpiration: !accessGroupExpiration ? 0 : accessGroupExpiration,
      memberListOptions: {
        search: '',
        sort: '',
        numResults: 20,
      },
      defaultSort: {
        value: '',
        label: 'Sort',
      },
      selectedSort: 'expiration-asc',
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
          // Date display logic
          contentHandler: ({ expiration }) => {
            // Get the number of days between the expiration date and today
            const daysDiff = getDaysFromToday(expiration);
            // If expiration is today or in the past/infinite expiration, show "no expire" text
            if (daysDiff <= 0) {
              return this.fluent('access-group_members', 'no-expiration');
            }
            // If the expiration is beyond the threshold, just show the date
            if (daysDiff > memberRenewalThreshold) {
              return new Date(expiration).toLocaleDateString();
            }
            // If the expiration is within the threshold, show specialized text
            return this.expiry(expiration);
          },
          isAlert: (member) => this.isMemberUpForRenewal(member),
        },
        {
          header: this.fluent(
            'access-group_members',
            'members-table__header-4',
          ),
        },
      ],
      selectedExpiration,
    };
  },
  methods: {
    ...mapActions({
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
    }),
    async updateGroup(updateData) {
      await this.accessGroupApi.execute({
        path: 'group/put',
        endpointArguments: [this.groupInformation.group.name],
        dataArguments: updateData,
      });
    },
    async addCurators(newCurators) {
      for (const curator of newCurators) {
        await this.accessGroupApi.execute({
          path: 'curators/post',
          endpointArguments: [this.groupInformation.group.name],
          dataArguments: { uuid: curator.uuid },
        });
      }
    },
    async removeCurators(oldCurators, expiration) {
      for (const curator of oldCurators) {
        await this.accessGroupApi.execute({
          path: 'curators/downgrade',
          endpointArguments: [this.groupInformation.group.name, curator.uuid],
          dataArguments: { groupExpiration: expiration },
        });
      }
    },
    async fetchAccessGroupCurators() {
      let cont = 0;
      const allMembers = [];
      while (cont !== null) {
        // eslint-disable-next-line no-await-in-loop
        const { members, next } = await this.accessGroupApi.execute({
          path: 'members/get',
          endpointArguments: [
            this.groupName,
            {
              role: 'curators',
              numResults: 100,
              next: cont,
            },
          ],
        });
        allMembers.push(
          ...members.map((member) => new DisplayMemberViewModel(member)),
        );
        cont = next;
      }

      return allMembers;
    },
    canMemberBeRemoved(member) {
      if (!this.membersList.length) {
        return false;
      }
      if (
        this.curatorsList.length === 1 &&
        member.uuid === this.curatorsList[0].uuid
      ) {
        return false;
      }
      return true;
    },
    searchFormHandler(search) {
      this.updateSearch(search);
    },
    clearSearchHandler() {
      this.clearSearch();
    },
    loadMoreHandler() {
      this.loadMoreMembers();
    },
    handleCustomRenew(ev, member, expiration) {
      this.customExpirationErrorHighlight = true;
      const form = ev.target;
      if (!form.checkValidity()) {
        ev.preventDefault();
      } else {
        this.handleRenewClick(member, expiration);
      }
    },
    async renewMember(memberUuid, expiration) {
      await this.accessGroupApi.execute({
        path: 'members/renew',
        endpointArguments: [this.groupName, memberUuid],
        dataArguments: { groupExpiration: expiration },
      });
    },
    handleRenewClick(member, expiration) {
      this.setLoading();
      this.renewMember(
        member.uuid,
        expiration || this.accessGroupExpiration,
      ).then((result) => {
        this.completeLoading();
        this.tinyNotification(
          'access-group-member-renewed',
          member.displayName,
        );
      });
      this.$root.$emit('dp-reload-group');
    },
    async handleRemoveConfirmClick(member) {
      this.setLoading();
      await this.accessGroupApi.execute({
        path: 'members/delete',
        endpointArguments: [this.groupName, member.uuid],
      });
      this.tinyNotification('access-group-member-removed', member.displayName);
      this.$root.$emit('dp-reload-group');
      this.completeLoading();
    },
    getTagLabel(curator) {
      return curator.displayName;
    },
    updateAutoCompleteList(search) {
      return accessGroupApi
        .execute({
          path: 'users/get',
          endpointArguments: [
            search,
            this.groupName,
            /* includeCurators =*/ false,
            /* showExistingMembers =*/ true,
          ],
        })
        .then((users) => users.map((user) => new DisplayMemberViewModel(user)));
    },
    handleCuratorAdded(curator) {
      this.addedCurators.push(curator);
    },
    handleCuratorRemoved(curator) {
      this.removedCurators.push(curator);
    },
    handleCuratorsUpdateClicked() {
      // TODO: Fix https://github.com/mozilla-iam/dino-park-issues/issues/203 here (avoiding group ownership taken over by one person)
      let promises = [];
      if (this.addedCurators.length > 0) {
        promises = promises.concat(this.addCurators(this.addedCurators));
      }
      if (this.removedCurators.length > 0) {
        promises = promises.concat(
          this.removeCurators(this.removedCurators, this.accessGroupExpiration),
        );
      }
      this.setLoading();
      Promise.all(promises)
        .then((results) => {
          this.tinyNotification('access-group-curators-updated');
          this.addedCurators = [];
          this.removedCurators = [];
          this.curatorsListDirty = false;
        })
        .then(() => {
          this.$root.$emit('dp-reload-group');
          return this.$nextTick();
        })
        .then(() => {
          this.completeLoading();
        })
        .catch((e) => {
          console.error(e);
          this.completeLoading();
        });
    },
    async beforeHandleUpdateExpiration() {
      this.updateExpirationErrorHighlight = true;
    },
    async handleUpdateExpiration() {
      await this.updateGroup({
        expiration: Number.parseInt(this.groupExpiration, 10),
      });
      this.groupExpirationDirty = false;
      this.tinyNotification('access-group-expiration-updated');
    },
    expiry(expiration) {
      return expiryTextFromDate(this.fluent, expiration);
    },
    async handleSortUpdated(value) {
      this.memberListOptions.sort = value;
    },
    getRowExpirationIntroText(member) {
      return this.fluent(
        'access-group_members',
        'expandable-content-container__first-row',
      ).replace('[]', member.displayName);
    },
    isMemberUpForRenewal(member) {
      if (!member.expiration) {
        return false;
      }
      const today = new Date().getTime();
      const memberExpiration = new Date(member.expiration).getTime();
      const difference = Math.floor(
        (memberExpiration - today) / (1000 * 3600 * 24),
      );
      if (difference <= memberRenewalThreshold) {
        return true;
      }
      return false;
    },
    membersRowHasExpandedContent(member) {
      return this.isMemberUpForRenewal(member);
    },
  },
  async mounted() {
    this.handleSortUpdated(this.selectedSort);
  },
  computed: {
    accessGroupExpiration() {
      return this.groupInformation.group.expiration || 0;
    },
    memberCount() {
      return this.groupInformation.memberCount;
    },
    expirationIsCustom() {
      return this.selectedExpiration === 'custom';
    },
    expirationMetaText() {
      const expiration = this.groupInformation.group.expiration || 0;

      if (expiration === MEMBER_EXPIRATION_ONE_YEAR) {
        return `1 ${this.fluent('date-year')}`;
      }
      if (expiration === MEMBER_EXPIRATION_TWO_YEARS) {
        return `2 ${this.fluent('date-year', 'plural')}`;
      }
      if (expiration === 1) {
        return `1 ${this.fluent('date-day')}`;
      }
      if (expiration === MEMBER_EXPIRATION_NONE) {
        return `not expire`;
      }
      return `${expiration} ${this.fluent('date-day', 'plural')}`;
    },
  },
};
</script>

<style>
.edit-members-container {
  padding: 0;
  overflow: visible;
}

.members-list-container .members-list-container__controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
}
.members-list-container .edit-members__search {
  margin: 0 2em 1em;
}

.members-list-container .edit-members__search {
  margin: 0 2em 1em;
}

.members-list-container .edit-members__search .search-form__input {
  padding-left: 3.5em;
}

.members-list-container .edit-members__search .search-form__input::placeholder {
  text-align: left;
}
.members-list-container .sort-select.options {
  align-self: initial;
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

.edit-members-container .edit-members-meta {
  padding-left: 2em;
}

@media (min-width: 57.5em) {
  .edit-members-container .edit-members-meta {
    padding-left: 0;
  }
}

.edit-members-container .edit-members-meta__focus {
  font-weight: bold;
}

.members-list-container .edit-members__search {
  margin: 0 2em 1em;
}

@media (min-width: 57.5em) {
  .members-list-container .members-list-container__controls {
    display: block;
  }
  .edit-members-container .edit-members-section__header {
    margin-left: 0;
  }
  .members-list-container .edit-members__search {
    margin: 0 auto 2em;
    width: auto;
    padding-top: 0.5em;
  }
  .sort-select {
    position: absolute;
    top: 0;
    right: 0;
  }
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
  border: 1px solid var(--neon-red);
  color: var(--neon-red);
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
.member-actions .primary-action {
  margin-right: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.member-actions .tertiary-action {
  border: 1px solid var(--gray-40);
  border-radius: 1rem;
  background: none;
  color: var(--black);
  padding-right: 0;
  padding: 0.25rem;
  display: flex;
  margin-right: 1rem;
  height: 2rem;
  width: 2rem;
}

.member-actions .tertiary-action:hover {
  border: 2px solid var(--blue-60);
  padding: calc(0.25rem - 1px);
}

.member-actions .tertiary-action .icon {
  margin: 0;
  width: 100%;
  height: 100%;
}

.expandable-actions-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 0 1em;
}

.expandable-actions-container .member-email {
  margin-bottom: 2em;
}

.expandable-actions-container .primary-button {
  color: var(--neon-red);
  border-color: var(--neon-red);
  background: var(--white);
  transition: none;
}

.expandable-actions-container .primary-button:hover {
  color: var(--white);
  background: var(--neon-red);
}

@media (min-width: 57.5em) {
  .expandable-actions-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 0 1em;
  }
}

.expandable-content-container .expandable-content-container__first-row {
  margin-top: 0;
  margin-bottom: 2em;
}

.expandable-content-container__second-row .expiration-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1em;
}

@media (min-width: 57.5em) {
  .expandable-content-container__second-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .expandable-content-container__second-row .expiration-actions {
    flex: 1;
    align-items: center;
    margin-top: 0;
  }
}

.edit-members-container .edit-members__load-more {
  margin: 1em auto;
  background-color: var(--white);
  color: var(--gray-50);
}

.tags-selector .tags-selector__description {
  color: var(--gray-50);
}

.members-expiration-container .content-area__row {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.members-expiration-container .content-area__row .content-area__label {
  margin-bottom: 1em;
  flex: initial;
}

.members-expiration-container .content-area__row .expiration__value {
  width: 100%;
}

.container-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.container-info__icon {
  width: 5em;
  margin-right: 1em;
}
</style>
