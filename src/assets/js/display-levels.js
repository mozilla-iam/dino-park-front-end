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
const DISPLAY_STAFF_NDAED_ONLY = [DISPLAY_LEVELS.ndaed, DISPLAY_LEVELS.staff];
const DISPLAY_STAFF_ONLY = [DISPLAY_LEVELS.staff];
const DISPLAY_NOT_PRIVATE = [
  DISPLAY_LEVELS.staff,
  DISPLAY_LEVELS.ndaed,
  DISPLAY_LEVELS.vouched,
  DISPLAY_LEVELS.authenticated,
  DISPLAY_LEVELS.public,
];
const DISPLAY_ANY = [
  DISPLAY_LEVELS.private,
  DISPLAY_LEVELS.staff,
  DISPLAY_LEVELS.ndaed,
  DISPLAY_LEVELS.vouched,
  DISPLAY_LEVELS.authenticated,
  DISPLAY_LEVELS.public,
];

const VALID_DISPLAY_LEVELS = {
  primaryUsername: DISPLAY_PUBLIC_ONLY,
  firstName: DISPLAY_NOT_PRIVATE,
  lastName: DISPLAY_NOT_PRIVATE,
  'staffInformation.manager': DISPLAY_STAFF_NDAED_ONLY,
  'staffInformation.director': DISPLAY_STAFF_NDAED_ONLY,
  'staffInformation.staff': DISPLAY_STAFF_NDAED_ONLY,
  'staffInformation.title': DISPLAY_STAFF_NDAED_ONLY,
  'staffInformation.team': DISPLAY_STAFF_NDAED_ONLY,
  'staffInformation.cost_center': DISPLAY_STAFF_ONLY,
  'staffInformation.worker_type': DISPLAY_STAFF_ONLY,
  'staffInformation.wpr_desk_number': DISPLAY_STAFF_NDAED_ONLY,
  'staffInformation.office_location': DISPLAY_STAFF_NDAED_ONLY,
};

export function displayLevelsFor(field) {
  return VALID_DISPLAY_LEVELS[field] || DISPLAY_ANY;
}
