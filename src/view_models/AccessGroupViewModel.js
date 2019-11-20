export const INVITATION_STATE = {
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};
export class GroupInvitationViewModel {
  constructor(data) {
    this.group_name = '';
    this.requires_tos = false;
    this.accepted_tos = false;
    this.state = '';
    this.error = false;
    this.processData(data);
  }

  processData(data) {
    try {
      this.group_name = data.group_name;
      this.requires_tos = data.terms;
      if ('state' in data) {
        this.state = data.state;
      }
    } catch (e) {
      this.error = e.message;
      console.error('GroupInvitation error: ', e.message);
      throw new Error(e.message);
    }
  }
}

export class HistoricalEventViewModel {
  constructor(data) {
    this.error = false;
    try {
      this.privilege = data.privilege;
      this.date_added = data.date_added;
    } catch (e) {
      this.error = e.message;
      console.error('TypeValue error: ', e.message);
      throw new Error(e.message);
    }
  }
}

export class TypeValueViewModel {
  constructor(data) {
    this.error = false;
    try {
      this.type = data.type;
      this.value = data.value;
    } catch (e) {
      this.error = e.message;
      console.error('TypeValue error: ', e.message);
      throw new Error(e.message);
    }
  }
}

export class AbbDisplayMemberViewModel {
  constructor(data) {
    this.uuid = '';
    this.name = '';
    this.username = '';
    this.email = '';
    this.error = false;
    this.processData(data);
  }

  processData(data) {
    try {
      this.uuid = data.user_uuid;
      this.name = data.name;
      this.username = data.username;
      this.email = data.email;
    } catch (e) {
      this.error = e.message;
      console.error('Abbreviated Display Member error: ', e.message);
    }
  }
}
export const MEMBER_IDEX = {
  Admin: 0,
  Curator: 1,
  Member: 2,
};
export const DISPLAY_MEMBER_ROLES = ['Admin', 'Curator', 'Member'];
export class DisplayMemberViewModel {
  constructor(data) {
    this.uuid = '';
    this.picture = '';
    this.name = '';
    this.username = '';
    this.email = '';
    this.isStaff = false;
    this.since = '';
    this.expiration = '';
    [, , this.role] = DISPLAY_MEMBER_ROLES;
    this.added_by = {};
    this.error = false;
    this.processData(data);
  }

  processData(data) {
    try {
      this.uuid = data.user_uuid;
      this.picture = data.picture;
      this.name = data.name;
      this.username = data.username;
      this.email = data.email;
      this.isStaff = data.isStaff;
      this.since = data.since;
      this.expiration = data.expiration;
      this.role = DISPLAY_MEMBER_ROLES.includes(data.role) ? data.role : null;
      this.added_by = new AbbDisplayMemberViewModel(data.added_by);
    } catch (e) {
      this.error = e.message;
      console.error('Display Member error: ', e.message);
    }
  }
}

const ACCESS_GROUP_TYPES = ['closed', 'reviewed', 'open'];
export class GroupViewModel {
  constructor(data) {
    this.id = '';
    this.name = '';
    [this.type] = ACCESS_GROUP_TYPES;
    this.description = '';
    this.terms = false;
    this.links = [];
    this.history = [];
    this.error = false;
    this.processData(data);
  }

  processData(data) {
    try {
      this.id = data.id;
      this.name = data.name;
      this.type = ACCESS_GROUP_TYPES.includes(data.type) ? data.type : null;
      this.description = data.description;
      this.terms = data.terms;
    } catch (e) {
      this.error = e.message;
      console.error('Group data error: ', e.message);
    }
  }
}

export class AccessGroupDetailsViewModel {
  constructor(data) {
    this.members = [];
    this.curators = [];
    this.group = {};
    this.member_count = 0;
    this.invitation_count = 0;
    this.renewal_count = 0;
    this.error = false;
    this.processData(data);
  }

  processData(data) {
    // TODO: Begin processing access group data
    if (!data) {
      throw new Error('Invalid data format');
    }
    try {
      this.members = data.members.members.map(
        member => new DisplayMemberViewModel(member)
      );
      this.curators = data.curators.members.map(
        member => new DisplayMemberViewModel(member)
      );
      this.group = new GroupViewModel(data.group);
      this.member_count = data.member_count;
      this.invitation_count = data.invitation_count;
      this.renewal_count = data.renewal_count;
    } catch (e) {
      this.error = e.message;
      console.error('Access group details data error: ', e.message);
    }
  }
}
