import { gql } from 'apollo-boost';

const PROFILE = gql`query ($userId: String!) {
 profile (username:$username) {
    firstName,
    lastName,
    username,
    funTitle,
    picture,
    pronouns,
    alternativeName,
    location,
    officeLocation,
    description,
    dinoId,
    created,
    lastModified,
    pgpPublicKeys,
    sshPublicKeys,
    tags,
    preferredLanguage,
    timezone,
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

const PREVIEW_PROFILE = gql`query ($previewUserId: String!) {
 profile (userId:$previewUserId) {
    firstName,
    lastName,
    funTitle,
    picture,
    pronouns,
    alternativeName,
    locationPreference,
    officeLocation,
    description,
    userId,
    created,
    businessTitle,
    team,
    entity,
    locationPreference,
    timezone,
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

const PROFILE_LIST = gql`query {
 profiles {
    userId {
      value
    },
    firstName {
      value
    },
    lastName {
      value
    },
    officeLocation {
      value
    },
    funTitle {
      value
    },
    picture {
      value
    }
  }
}`;

const MUTATE_PROFILE = gql`mutation updateProfile($userId: String!, $firstName: String, $lastName: String, $primaryEmail: String) {
  editBasicProfile(
    userId: $userId,
    basicProfileData: {
      firstName: {
        value: $firstName
      },
      lastName: {
        value: $lastName
      },
      primaryEmail: {
        value: $primaryEmail
      }
    }
 )
  {
    updatedProfile {
      firstName {
        value
      }
      lastName {
        value
      }
      primaryEmail {
        value
      }
    }
  }
}
`;

export { PROFILE, PREVIEW_PROFILE, USER_MENU_PROFILE, PROFILE_LIST, MUTATE_PROFILE };
