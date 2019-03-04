export const DISPLAY_LEVELS = {
  public: {
    label: 'Public',
    value: 'public',
    icon: 'world',
  },
  authenticated: {
    label: 'Registered',
    value: 'authenticated',
    icon: 'lock',
  },
  vouched: {
    label: 'Active',
    value: 'vouched',
    icon: 'activity',
  },
  ndaed: {
    label: "NDA'd + Staff",
    value: 'ndaed',
    icon: 'triangle',
  },
  staff: {
    label: 'Staff',
    value: 'staff',
    icon: 'staff',
  },
  private: {
    label: 'Private',
    value: 'private',
    icon: 'private',
  },
};

const DISPLAY_PUBLIC_ONLY = [DISPLAY_LEVELS.public];
const DISPLAY_ANY = [
  DISPLAY_LEVELS.public,
  DISPLAY_LEVELS.authenticated,
  DISPLAY_LEVELS.vouched,
  DISPLAY_LEVELS.ndaed,
  DISPLAY_LEVELS.staff,
  DISPLAY_LEVELS.private,
];

const VALID_DISPLAY_LEVELS = {
  username: DISPLAY_PUBLIC_ONLY,
};

export function displayLevelsFor(field) {
  return VALID_DISPLAY_LEVELS[field] || DISPLAY_ANY;
}
