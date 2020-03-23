export default {
  fromEditToSelf(to, from, store) {
    return (
      to.name === 'Profile' &&
      from.name === 'Edit Profile' &&
      to.params.username === store.state.scope.username
    );
  },
  toEdit(to) {
    return to.name === 'Edit Profile';
  },
  toProfile(to, from) {
    return to.name === 'Profile' && to.path !== from.path;
  },
};
