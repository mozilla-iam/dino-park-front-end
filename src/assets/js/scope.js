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
    let isStaff = false;
    let isNdaed = false;
    try {
      const {
        staffInformation: { staff: { value: isStaffBool = false } = {} } = {},
        accessInformation: {
          mozilliansorg: { values: { nda: isNdaedBool = false } = {} } = {},
        } = {},
      } = user;
      isStaff = isStaffBool;
      isNdaed = isNdaedBool;
    } catch (e) {
      console.error('Error: ', e);
    }
    this.isStaff = isStaff;
    this.isNdaed = isNdaed;
  }
}

export default Scope;
