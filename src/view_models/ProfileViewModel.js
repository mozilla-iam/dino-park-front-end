export class StaffInformationViewModel {
  constructor(data) {
    this.staff = false;
    this.team = '';
    this.title = '';
    this.officeLocation = '';
    this.processData(data);
  }

  processData(data) {
    if (!data) {
      throw new Error('Invalid data format');
    }
    try {
      this.staff = data.staff.value;
      this.team = data.team.value;
      this.title = data.title.value;
      this.officeLocation = data.officeLocation.value;
    } catch (e) {
      this.error = e.message;
      console.error('Staff information data error: ', e.message);
    }
  }
}

export class ProfileViewModel {
  constructor(data) {
    this.uuid = '';
    this.alternativeName = '';
    this.description = '';
    this.firstName = '';
    this.funTitle = '';
    this.lastName = '';
    this.location = '';
    this.picture = '';
    this.primaryEmail = '';
    this.pronouns = [];
    this.timezone = [];
    this.primaryUsername = '';
    this.phoneNumbers = [];
    this.staffInformation = null;
    this.uris = [];
    this.processData(data);
  }

  processData(data) {
    if (!data) {
      throw new Error('Invalid data format');
    }
    try {
      this.uuid = data.uuid.value;
      this.alternativeName = data.alternativeName.value;
      this.description = data.description.value;
      this.firstName = data.firstName.value;
      this.funTitle = data.funTitle.value;
      this.lastName = data.lastName.value;
      this.location = data.location.value;
      this.picture = data.picture.value;
      this.primaryEmail = data.primaryEmail.value;
      this.pronouns = data.pronouns.value;
      this.timezone = data.timezone.value;
      this.primaryUsername = data.primaryUsername.value;
      this.phoneNumbers = data.phoneNumbers.value;
      this.staffInformation = new StaffInformationViewModel(
        data.staffInformation
      );
      this.uris = data.uris.value;
    } catch (e) {
      this.error = e.message;
      console.error('Profile data error: ', e.message);
    }
  }
}
