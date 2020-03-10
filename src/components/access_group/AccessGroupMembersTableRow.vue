<template>
  <div
    :class="{
      'members-table__row': true,
      'row-member': true,
      active: pendingAction,
    }"
  >
    <div class="row-member__item row-member__display">
      <AccessGroupMemberListDisplay :member="member" />
    </div>
    <div
      v-if="pendingAction"
      :colspan="columns.length - 1"
      class="row-member__item row-member__action-confirm"
    >
      <slot
        :member="member"
        :togglePending="togglePending"
        name="row-confirm"
      ></slot>
    </div>
    <div
      class="row-member__item"
      v-for="(column, idx) in getSecondaryColumns(member)"
      :key="idx"
    >
      {{ column.contentHandler(member) }}
    </div>
    <div class="row-member__item row-actions" v-if="!pendingAction">
      <slot
        :member="member"
        :togglePending="togglePending"
        name="row-actions"
      ></slot>
    </div>
  </div>
</template>
<script>
import AccessGroupMemberListDisplay from '@/components/access_group/AccessGroupMemberListDisplay.vue';
export default {
  name: 'AccessGroupMembersTableRow',
  components: { AccessGroupMemberListDisplay },
  props: {
    member: Object,
    columns: Array,
  },
  data() {
    return {
      pendingAction: false,
    };
  },
  methods: {
    getSecondaryColumns(member) {
      if (this.pendingAction) {
        return [];
      }
      return this.columns.filter(column => 'contentHandler' in column);
    },
    togglePending(status) {
      if (typeof status === 'boolean') {
        this.pendingAction = status;
      }
    },
  },
};
</script>
<style scoped>
.members-table__row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1em 0;
}

.members-table__row .row-member__item {
  padding-left: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.members-table__row .row-member__item.row-member__display {
  flex: 1.5;
}

.members-table__row .row-member__action-confirm {
  vertical-align: center;
  text-align: right;
  flex: 3.5;
}

.row-member__action-confirm .leave-confirm__description {
  display: inline-block;
  font-weight: bold;
  margin-right: 1em;
  margin-top: 0;
  margin-bottom: 0;
}

.row-member__action-confirm .button {
  display: inline-block;
  margin: 0 1em;
}

.row-member__action-confirm .button:last-child {
  margin-right: 0;
}
</style>
