<template>
  <article class="members-table">
    <header class="members-table__header" v-if="showHeaders">
      <div
        :class="{ 'heading-container': true, primary: columnData.primary }"
        v-for="(columnData, idx) in columns"
        :key="idx"
      >
        {{ columnData.header }}
      </div>
    </header>
    <div
      :class="{ 'members-table__body': true, 'including-headers': showHeaders }"
    >
      <AccessGroupMembersTableRow
        v-for="(member, idx) in data"
        :key="idx"
        :member="member"
        :columns="columns"
        ref="table-row"
        :hasExpandedContent="rowHasExpandedContent"
      >
        <template slot="row-confirm" slot-scope="{ togglePending }">
          <slot
            :member="member"
            :toggleExpand="togglePending"
            name="row-confirm"
          ></slot>
        </template>
        <template slot="row-expandable-content" slot-scope="{ toggleExpand }">
          <slot
            :member="member"
            :toggleExpand="toggleExpand"
            name="row-expandable-content"
          ></slot>
        </template>
        <template slot="row-expandable-actions" slot-scope="{ toggleExpand }">
          <slot
            :member="member"
            :toggleExpand="toggleExpand"
            name="row-expandable-actions"
          ></slot>
        </template>
        <template
          slot="row-actions"
          slot-scope="{ toggleExpand, togglePending }"
        >
          <slot
            :member="member"
            :toggleExpand="() => toggleTable(toggleExpand, idx)"
            :togglePending="togglePending"
            name="row-actions"
          ></slot>
        </template>
        <template slot="row-actions-expanded" slot-scope="{ toggleExpand }">
          <slot
            :member="member"
            :toggleExpand="toggleExpand"
            name="row-actions-expanded"
          ></slot>
        </template>
      </AccessGroupMembersTableRow>
    </div>
  </article>
</template>
<script>
import AccessGroupMembersTableRow from '@/components/access_group/AccessGroupMembersTableRow.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupMembersTable',
  components: {
    AccessGroupMembersTableRow,
    Button,
    Icon,
  },
  props: {
    data: Array,
    columns: Array,
    showHeaders: {
      type: Boolean,
      default: true,
    },
    toggleExpand: Function,
    rowHasExpandedContent: {
      default: member => false,
      type: Function,
    },
  },
  methods: {
    getSecondaryColumns(member) {
      return this.columns.filter(column => 'contentHandler' in column);
    },
    /**
     * This is the function that should run whenever an expand is clicked
     * It should go through and toggle each of the rows off that are not the one that is passed in
     */
    toggleTable(toggleRow, idx) {
      this.$refs['table-row'].forEach((row, rowIdx) => {
        if (idx === rowIdx) {
          row.toggleExpand(true);
        } else {
          row.toggleExpand(false);
        }
      });
    },
  },
};
</script>
<style>
.members-table {
  display: table;
  border-collapse: collapse;
  width: 100%;
}
.members-table .members-table__header {
  background: var(--gray-30);
  border-bottom: 1px solid var(--gray-40);
  color: var(--black);
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.members-table__header .heading-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5em 1em;
  text-align: left;
  flex: 1;
}

.members-table__header .heading-container.primary {
  flex: 1.5;
}

.members-table__header .sort-arrows {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 1em;
}

.sort-arrows .sort-arrows__up {
  display: block;
  border-bottom: 0.4em solid var(--black);
  border-left: 0.4em solid transparent;
  border-right: 0.4em solid transparent;
  margin-bottom: 0.15em;
}

.sort-arrows .sort-arrows__down {
  display: block;
  border-top: 0.4em solid var(--black);
  border-left: 0.4em solid transparent;
  border-right: 0.4em solid transparent;
}

.members-table__body:not(.including-headers)
  .members-table__row:nth-child(odd) {
  background: var(--gray-20);
}

.members-table__body.including-headers .members-table__row:nth-child(even) {
  background: var(--gray-20);
}
</style>
