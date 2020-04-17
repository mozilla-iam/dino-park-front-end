export const INVITATION_STATE = {
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};
export class GroupInvitationViewModel {
  constructor(data) {
    this.groupName = '';
    this.userUuid = '';
    this.requiresTos = false;
    this.accepted_tos = false;
    this.groupExpiration = '';
    this.invitationExpiration = '';
    this.state = '';
    this.error = false;
    this.processData(data);
  }

  processData(data) {
    try {
      this.groupName = data.group_name;
      this.requiresTos = data.terms;
      this.userUuid = data.user_uuid;
      if ('state' in data) {
        this.state = data.state;
      }
      this.groupExpiration = data.group_expiration;
      this.invitationExpiration = data.invitation_expiration;
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

const defaultUserName = 'Anonymous User';
const getDisplayName = (data) => {
  if (data.first_name && data.last_name) {
    return `${data.first_name} ${data.last_name}`;
  }
  if (data.first_name) {
    return data.first_name;
  }
  if (data.last_name) {
    return data.last_name;
  }
  if (!data.username.startsWith('r--')) {
    return data.username;
  }
  return defaultUserName;
};

export class AbbDisplayMemberViewModel {
  constructor(data) {
    this.uuid = '';
    this.displayName = '';
    this.username = '';
    this.email = '';
    this.error = false;
    this.processData(data);
  }

  // TODO: We need to come up with a better, more reliable way to determine whether someone has been "added by" no one
  processData(data) {
    try {
      this.uuid = !data.first_name && !data.last_name ? null : data.user_uuid;
      this.displayName = getDisplayName(data);
      this.username = data.username;
      this.email = data.email;
    } catch (e) {
      this.error = e.message;
      console.error('Abbreviated Display Member error: ', e.message);
    }
  }

  isAnonymous() {
    return this.username === 'anonymous';
  }
}

export const MEMBER_EXPIRATION_NONE = 0;
export const MEMBER_EXPIRATION_ONE_WEEK = 7;
export const MEMBER_EXPIRATION_ONE_YEAR = 365;
export const MEMBER_EXPIRATION_TWO_YEARS = MEMBER_EXPIRATION_ONE_YEAR * 2;
export const MEMBER_IDEX = {
  Curator: 0,
  Member: 1,
};
export const DISPLAY_MEMBER_ROLES = ['Curator', 'Member'];
export class DisplayMemberViewModel {
  constructor(data) {
    this.uuid = '';
    this.picture = '';
    this.displayName = '';
    this.username = '';
    this.email = '';
    this.isStaff = false;
    this.since = '';
    this.expiration = MEMBER_EXPIRATION_NONE;
    this.invitationExpiration = MEMBER_EXPIRATION_NONE;
    [, , this.role] = DISPLAY_MEMBER_ROLES;
    this.added_by = {};
    this.error = false;
    if (!data) {
      this.error = 'DisplayMemberViewModel data is empty';
      return;
    }
    this.processData(data);
  }

  static fromUserData(user) {
    const member = new DisplayMemberViewModel();
    member.uuid = user.user_uuid;
    member.displayName = getDisplayName(user);
    member.picture = user.picture;
    member.email = user.email;
    member.username = user.username;
    member.error = false;
    return member;
  }

  processData(data) {
    try {
      this.uuid = data.user_uuid;
      this.picture = data.picture;
      this.displayName = getDisplayName(data);
      this.username = data.username;
      this.email = data.email;
      this.isStaff = data.is_staff;
      if (!data.since) {
        this.since = '';
      } else {
        const sinceDate = new Date(data.since);
        if (!(sinceDate instanceof Date)) {
          this.since = '';
        } else {
          this.since = sinceDate.toLocaleDateString();
        }
      }
      if (data.hasOwnProperty('group_expiration')) {
        this.expiration = !data.group_expiration ? '' : data.group_expiration;
      } else if (data.hasOwnProperty('expiration')) {
        this.expiration = !data.expiration
          ? MEMBER_EXPIRATION_NONE
          : data.expiration;
      }
      if (data.hasOwnProperty('invitation_expiration')) {
        this.invitationExpiration = !data.invitation_expiration
          ? MEMBER_EXPIRATION_NONE
          : data.invitation_expiration;
      }
      if (data.role === 'Admin') {
        this.role = DISPLAY_MEMBER_ROLES[MEMBER_IDEX.Curator];
      } else {
        this.role = DISPLAY_MEMBER_ROLES.includes(data.role) ? data.role : null;
      }
      this.added_by = new AbbDisplayMemberViewModel(data.host || data.added_by);
    } catch (e) {
      this.error = e.message;
      console.error('Display Member error: ', e.message);
    }
  }

  isCurator() {
    return this.role === DISPLAY_MEMBER_ROLES[MEMBER_IDEX.Curator];
  }

  isMember() {
    return this.role === DISPLAY_MEMBER_ROLES[MEMBER_IDEX.Member];
  }
}

export const TYPE_INDEX = {
  closed: 0,
  reviewed: 1,
  open: 2,
};
export const ACCESS_GROUP_TYPES = ['Closed', 'Reviewed', 'Open'];

export class AbbGroupViewModel {
  constructor(data) {
    this.name = '';
    [this.type] = ACCESS_GROUP_TYPES;
    this.access = '';
    this.memberCount = 0;
    this.processData(data);
  }

  processData(data) {
    try {
      this.name = data.name;
      this.type = ACCESS_GROUP_TYPES.includes(data.typ) ? data.typ : null;
      this.access = data.trust;
      this.memberCount = data.member_count;
    } catch (e) {
      this.error = e.message;
      console.error('Abbreviated group data error: ', e.message);
    }
  }
}

export class GroupViewModel {
  constructor(data) {
    this.id = '';
    this.name = '';
    [this.type] = ACCESS_GROUP_TYPES;
    this.description = '';
    this.terms = false;
    this.links = [];
    this.history = [];
    this.expiration = MEMBER_EXPIRATION_NONE;
    this.error = false;
    this.created = '';
    this.processData(data);
  }

  processData(data) {
    try {
      this.id = data.id;
      this.name = data.name;
      this.type = ACCESS_GROUP_TYPES.includes(data.typ) ? data.typ : null;
      this.description = data.description;
      this.terms = data.terms;
      this.expiration = data.expiration;
      this.created = data.created;
    } catch (e) {
      this.error = e.message;
      console.error('Group data error: ', e.message);
    }
  }
}
