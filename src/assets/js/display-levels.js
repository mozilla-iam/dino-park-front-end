export const DISPLAY_LEVELS = {
  public: {
    label: 'Public',
    value: 'PUBLIC',
    icon: 'world',
  },
  authenticated: {
    label: 'Registered',
    value: 'AUTHENTICATED',
    icon: 'lock',
  },
  vouched: {
    label: 'Active',
    value: 'VOUCHED',
    icon: 'activity',
  },
  ndaed: {
    label: "NDA'd",
    value: 'NDAED',
    icon: 'triangle',
  },
  ndaedplusstaff: {
    label: "NDA'd + Staff",
    value: 'NDAED',
    icon: 'triangle',
  },
  staff: {
    label: 'Staff',
    value: 'STAFF',
    icon: 'staff',
  },
  private: {
    label: 'Private',
    value: 'PRIVATE',
    icon: 'private',
  },
};

const DISPLAY_PUBLIC_ONLY = [DISPLAY_LEVELS.public];
const DISPLAY_NOT_PRIVATE = [
  DISPLAY_LEVELS.staff,
  DISPLAY_LEVELS.ndaedplusstaff,
  //  DISPLAY_LEVELS.vouched,
  DISPLAY_LEVELS.authenticated,
  DISPLAY_LEVELS.public,
];
const DISPLAY_ANY = [
  DISPLAY_LEVELS.private,
  DISPLAY_LEVELS.staff,
  DISPLAY_LEVELS.ndaedplusstaff,
  //  DISPLAY_LEVELS.vouched,
  DISPLAY_LEVELS.authenticated,
  DISPLAY_LEVELS.public,
];

const VALID_DISPLAY_LEVELS = {
  primaryUsername: DISPLAY_PUBLIC_ONLY,
  phoneNumbers: DISPLAY_ANY,
  'accessInformation.ldap': DISPLAY_ANY,
  'accessInformation.mozilliansorg': DISPLAY_NOT_PRIVATE,
};

export function displayLevelsFor(field) {
  return (field && VALID_DISPLAY_LEVELS[field]) || DISPLAY_NOT_PRIVATE;
}
