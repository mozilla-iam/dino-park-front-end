export default {
  mocks: {
    $store: {
      state: {
        accessGroup: {
          members: [],
          curators: [],
          group: {
            id: '',
            name: '',
            type: '',
            description: '',
            terms: false,
          },
          member_count: 0,
          invitation_count: 0,
          renewal_count: 0,
        },
        user: {
          picture: {
            value: '',
          },
        },
      },
    },
  },
};
