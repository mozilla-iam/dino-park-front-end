import {
  AccessGroupDetailsViewModel,
  GroupViewModel,
  DisplayMemberViewModel,
  AbbDisplayMemberViewModel,
  TypeValueViewModel,
  HistoricalEventViewModel,
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
    const model = new DisplayMemberViewModel(accessGroupData.members.members[0]);
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

describe('TypeValueViewModel', () => {
  it('should be created', () => {
    const model = new TypeValueViewModel(accessGroupData.group.links[0]);
    expect(model).toBeInstanceOf(TypeValueViewModel);
  });
});

describe('HistoricalEventViewModel', () => {
  it('should be created', () => {
    const model = new HistoricalEventViewModel(accessGroupData.group.history[0]);
    expect(model).toBeInstanceOf(HistoricalEventViewModel);
  });
});
