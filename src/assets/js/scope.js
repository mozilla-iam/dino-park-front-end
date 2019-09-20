class Scope {
  constructor(user = {}) {
    this.update(user);
  }

  update(user) {
    const {
      staffInformation: { staff: { value: isStaff = false } = {} } = {},
      accessInformation: {
        mozilliansorg: { values: { nda: isNdaed = false } = {} } = {},
      } = {},
    } = user;
    this.isStaff = isStaff;
    this.isNdaed = isNdaed;
  }
}

export default Scope;
