import { gql } from 'apollo-boost';

const PROFILE = gql`query ($username: String!) {
 profile (username:$username) {
    alternativeName,
    created,
    description,
    firstName,
    funTitle,
    lastModified,
    lastName,
    location,
    pgpPublicKeys,
    picture,
    languages,
    primaryEmail
    pronouns,
    sshPublicKeys,
    tags,
    timezone,
    uris,
    username,
    phoneNumbers,
    staffInformation {
      staff,
      team,
      title,
      workerType,
      wprDeskNumber,
      costCenter,
      officeLocation,
    },
    manager {
      firstName
      lastName
      picture
      title
      funTitle
      location
      username
    },
    directs {
      firstName
      lastName
      picture
      title
      funTitle
      location
      username
    },
    accessInformation {
      mozilliansorg,
    },
  }
}`;

const PREVIEW_PROFILE = gql`query ($username: String!) {
 profile (username:$username) {
    alternativeName,
    description,
    firstName,
    funTitle,
    lastName,
    location,
    picture,
    primaryEmail
    pronouns,
    timezone,
    username,
    phoneNumbers,
    staffInformation {
      staff,
      team,
      title,
      officeLocation,
    },
  }
}`;

const USER_MENU_PROFILE = gql`query {
 userMenu {
    firstName,
    lastName,
    picture,
    username,
    primaryEmail,
  }
}`;

const MUTATE_PROFILE = gql`mutation UpdateProfile($username: String!, $alternativeName: String, $description: String, $firstName: String, $funTitle: String, $lastName: String, $location: String, $pronouns: String, $timezone: String ){ 
  updateProfile(username: $username, update: {
    alternativeName: {
      value: $alternativeName,
    },
    description: {
      value: $description,
    },
    firstName: {
      value: $firstName,
    },
    funTitle: {
      value: $funTitle,
    },
    lastName: {
      value: $lastName,
    },
    location: {
      value: $location,
    },
    pronouns: {
      value: $pronouns,
    },
    timezone: {
      value: $timezone,
    }
  }) {
    alternativeName {
      value
      display
    },
    description {
      value
      display
    },
    firstName {
      value
      display
    },
    funTitle {
      value
      display
    },
    lastName {
      value
      display
    },
    location {
      value
      display
    },
    pronouns {
      value
      display
    },
    timezone {
      value
      display
    }
  }
}`;

const DISPLAY_PROFILE = gql`query DisplayProfile($username: String!) {
 displayProfile(username: $username) {
    accessInformation {
      mozilliansorg {
        values
      }
    },
    alternativeName {
      value 
      display
    },
    description {
      value 
      display
    },
    dinoId {
      value
      display
    },
    firstName {
      value 
      display
    },
    funTitle {
      value 
      display
    },
    lastName {
      value 
      display
    },
    location {
      value 
      display
    },
    picture {
      value 
      display
    },
    primaryEmail {
      value 
      display
    }
    pronouns {
      value 
      display
    },
    timezone {
      value 
      display
    },
    username {
      value 
      display
    },
    phoneNumbers {
      values
      display
    },
    staffInformation {
      staff {
        value 
        display
      },
      team {
        value 
        display
      },
      title {
        value 
        display
      },
      officeLocation {
        value 
        display
      },
      workerType {
        value
        display
      },
      wprDeskNumber {
        value
        display
      },
      costCenter {
        value
        display
      }
    },
    tags {
      values
    }
  }
}`;

export { PROFILE, DISPLAY_PROFILE, MUTATE_PROFILE, PREVIEW_PROFILE, USER_MENU_PROFILE };
