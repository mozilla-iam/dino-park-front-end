import { ProfileViewModel } from './ProfileViewModel';
const mockProfile = {
  uuid: '',
  alternativeName: '',
  description: '',
  firstName: '',
  funTitle: '',
  lastName: '',
  location: '',
  picture: '',
  primaryEmail: '',
  pronouns: [],
  timezone: [],
  primaryUsername: '',
  phoneNumbers: [],
  staffInformation: {
    staff: '',
    team: '',
    title: '',
    officeLocation: '',
  },
  uris: [],
};

describe('ProfileViewModel', () => {
  it('should be created', () => {
    const model = new ProfileViewModel(mockProfile);
    expect(model).toBeInstanceOf(ProfileViewModel);
  });
});
