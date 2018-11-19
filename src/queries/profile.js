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

export { PROFILE, PREVIEW_PROFILE, USER_MENU_PROFILE };
