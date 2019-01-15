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

const MUTATE_PROFILE = gql`mutation UpdateProfile($username: String!, $primaryEmail: String!, $firstName: String!, $lastName: String!){ 
  updateProfile(username: $username, update: {
    primaryEmail: {
      value: $primaryEmail,
    },
    firstName: {
      value: $firstName,
    },
    lastName: {
      value: $lastName,
    }
  }) {
    primaryEmail {
      value
      display
    },
    firstName {
      value
      display
    },
    lastName {
      value
      display
    }
  }
}`;

const DISPLAY_PROFILE = gql`query DisplayProfile($username: String!) {
 displayProfile(username: $username) {
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
  }
}`;

export { PROFILE, DISPLAY_PROFILE, MUTATE_PROFILE, PREVIEW_PROFILE, USER_MENU_PROFILE };
