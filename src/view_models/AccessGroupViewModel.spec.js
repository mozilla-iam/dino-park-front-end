import {
  AccessGroupDetailsViewModel,
  GroupViewModel,
  DisplayMemberViewModel,
  AbbDisplayMemberViewModel,
} from './AccessGroupViewModel';
import accessGroupData from '../accessgroupdata.json';

describe('AccessGroupDetailsViewModel', () => {
  it('should be created', () => {
    const model = new AccessGroupDetailsViewModel(accessGroupData);
    expect(model).toBeInstanceOf(AccessGroupDetailsViewModel);
  });
});

describe('GroupViewModel', () => {
  it('should be created', () => {
    const model = new GroupViewModel(accessGroupData.group);
    expect(model).toBeInstanceOf(GroupViewModel);
  });
});

describe('DisplayMemberViewModel', () => {
  it('should be created', () => {
    const model = new DisplayMemberViewModel(
      accessGroupData.members.members[0]
    );
    expect(model).toBeInstanceOf(DisplayMemberViewModel);
  });
});

describe('AbbDisplayMemberViewModel', () => {
  it('should be created', () => {
    const model = new AbbDisplayMemberViewModel(
      accessGroupData.members.members[0].added_by
    );
    expect(model).toBeInstanceOf(AbbDisplayMemberViewModel);
  });
});
