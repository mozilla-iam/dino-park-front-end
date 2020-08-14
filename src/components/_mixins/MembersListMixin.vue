<script>
import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel.js';
import { Api } from '@/assets/js/access-groups-api.js';

const defaultRole = 'all';
const defaultSort = 'role-asc';
const defaultComponentSort = {
  value: '',
  label: 'Sort',
};
const defaultOptions = {
  search: '',
  role: defaultRole,
  sort: defaultSort,
  numResults: 20,
  next: null,
};
const getDefaultOptions = () => Object.assign({}, defaultOptions);
const accessGroupApi = new Api();

export default {
  mounted() {
    if (this.selectedSort) {
      this.membersListOptions.sort = this.selectedSort;
    }
    this.fetchMembers();
  },
  methods: {
    async fetchMembers() {
      try {
        const memberData = await accessGroupApi.execute({
          path: 'members/get',
          endpointArguments: [this.groupName, this.membersListOptions],
        });

        const members = memberData.members.map(
          (member) => new DisplayMemberViewModel(member),
        );
        this.membersNext = memberData.next;

        if (
          this.membersListOptions.hasOwnProperty('next') &&
          this.membersListOptions.next
        ) {
          this.membersList = this.membersList.concat(members);
        } else {
          this.membersList = members;
        }
      } catch (e) {
        console.log(e.message);
        throw new Error(e.message);
      }
    },
    async loadMoreMembers() {
      this.hasLoadedMore = true;
      this.membersListOptions.next = this.membersNext;
      await this.fetchMembers(this.groupName);
    },
    async updateSearch(value) {
      if (this.hasLoadedMore) {
        this.resetOptions();
      }
      this.membersListOptions.search = value;
      await this.fetchMembers();
    },
    async clearSearch() {
      this.membersListOptions.search = '';
      await this.fetchMembers();
    },
    async updateSort(value) {
      if (this.hasLoadedMore) {
        this.resetOptions();
      }
      this.membersListOptions.sort = value;
      await this.fetchMembers();
    },
    async updateRole(value) {
      if (this.hasLoadedMore) {
        this.resetOptions();
      }
      this.membersListOptions.role = value;
      await this.fetchMembers();
    },
    resetOptions() {
      this.membersListOptions = getDefaultOptions();
      this.hasLoadedMore = false;
    },
  },
  data() {
    return {
      defaultSort: defaultComponentSort,
      hasLoadedMore: false,
      membersListOptions: getDefaultOptions(),
      membersList: [],
      membersNext: null,
      groupName: this.groupInformation.group.name,
    };
  },
};
</script>
