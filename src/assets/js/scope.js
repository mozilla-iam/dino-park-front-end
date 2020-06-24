/*
  Exposes the scope of a user.

  Scopes work inclusive e.g. the scope staff (isStaff) allows access to display
  levels [public, authenticated, (vouched), staff].
*/
class Scope {
  constructor(user = {}) {
    this.update(user);
  }

  update(user) {
    const {
      uuid: { value: uuid = '00000000-0000-0000-0000-000000000000' } = {},
      primaryUsername: { value: username = '' } = {},
      staffInformation: { staff: { value: isStaff = false } = {} } = {},
      accessInformation: {
        mozilliansorg: { values: mozilliansorgGroups = {} } = {},
        ldap: { values: ldapGroups = {} } = {},
      } = {},
    } = user || {};
    this.username = username;
    this.uuid = uuid;
    this.isLoggedIn = Boolean(username || user?.loggedIn);
    this.firstTime =
      this.isLoggedIn && (username === '' || username.startsWith('r--'));
    this.isReady = Boolean(username);
    this.isStaff = isStaff;
    this.isNdaed = 'nda' in (mozilliansorgGroups || {});
    this.isLdap = Boolean(ldapGroups);
    this.isGroupCreator =
      'group_creators' in (mozilliansorgGroups || {}) ||
      'group_admins' in (mozilliansorgGroups || {});
  }
}

export default Scope;
