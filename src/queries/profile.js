import { gql } from 'apollo-boost';

const PROFILE = gql`query ($username: String!) {
 profile (username:$username) {
    alternativeName,
    created,
    description,
    dinoId,
    firstName,
    funTitle,
    lastModified,
    lastName,
    location,
    pgpPublicKeys { 
      key,
      value
    },
    picture,
    languages,
    primaryEmail
    pronouns,
    sshPublicKeys {
      key,
      value
    },
    tags,
    timezone,
    uris {
      key,
      value
    }
    username,
    phoneNumbers {
      key,
      value
    }
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
      userId
      firstName
      lastName
      picture
      title
      funTitle
      location
    },
    directs {
      userId
      firstName
      lastName
      picture
      title
      funTitle
      location
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
    dinoId,
    firstName,
    funTitle,
    lastName,
    location,
    picture,
    primaryEmail
    pronouns,
    timezone,
    username,
    phoneNumbers {
      key,
      value
    }
    staffInformation {
      staff,
      team,
      title,
      officeLocation,
    },
  }
}`;

const USER_MENU_PROFILE = gql`query {
 profile {
    firstName,
    lastName,
    picture,
    dinoId,
    username,
    primaryEmail,
  }
}`;

export { PROFILE, PREVIEW_PROFILE, USER_MENU_PROFILE };
