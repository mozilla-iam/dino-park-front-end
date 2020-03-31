<script>
import { mapGetters, mapActions } from 'vuex';

const defaultRole = 'all';
const defaultSort = {
  value: '',
  label: 'Sort',
};
const defaultOptions = {
  search: '',
  role: defaultRole,
  sort: '',
  numResults: 20,
};

export default {
  computed: {
    ...mapGetters({
      groupName: 'accessGroup/getGroupName',
      rawMembers: 'accessGroup/getMembers',
    }),
  },
  watch: {
    rawMembers(list) {
      this.membersList = list;
    },
  },
  mounted() {
    this.fetchMembers(this.groupName);
    this.membersListOptions = defaultOptions;
  },
  methods: {
    ...mapActions({
      fetchMembers: 'accessGroup/fetchMembers',
      getMembersWithOptions: 'accessGroup/fetchMembersWithOptions',
      getMembersWithOptionsNext: 'accessGroup/fetchMembersWithOptionsNext',
    }),
    async loadMoreMembers() {
      this.hasLoadedMore = true;
      try {
        const nextMembers = await this.getMembersWithOptionsNext({
          groupName: this.groupName,
          options: this.membersListOptions,
        });
        this.membersList = this.membersList.concat(nextMembers);
      } catch (e) {
        console.error("Error loading 'next members':", e.message);
        throw new Error(e.message);
      }
    },
    updateSearch(value) {
      if (this.hasLoadedMore) {
        this.resetOptions();
      }
      this.membersListOptions.search = value;
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.membersListOptions,
      });
    },
    clearSearch() {
      this.membersListOptions.search = '';
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.membersListOptions,
      });
    },
    updateSort(value) {
      if (this.hasLoadedMore) {
        this.resetOptions();
      }
      this.membersListOptions.sort = value;
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.membersListOptions,
      });
    },
    updateRole(value) {
      if (this.hasLoadedMore) {
        this.resetOptions();
      }
      this.membersListOptions.role = value;
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.membersListOptions,
      });
    },
    resetOptions() {
      this.membersListOptions = defaultOptions;
    },
  },
  data() {
    return {
      defaultSort,
      hasLoadedMore: false,
      membersListOptions: defaultOptions,
      membersList: [],
    };
  },
};
</script>
