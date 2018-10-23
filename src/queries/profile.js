import { gql } from 'apollo-boost';

const PROFILE = gql`query ($userId: String!) {
 profile (userId:$userId) { 
    firstName {
      value
    },
    lastName {
      value
    },
    funTitle {
      value
    },
    picture {
      value
    },
    pronouns {
      value
    },
    alternativeName {
      value
    },
    locationPreference {
      value
    },
    officeLocation {
      value
    },
    description {
      value
    },
    userId {
      value
    },
    created {
      value
    },
    lastModified {
      value
    },
    pgpPublicKeys {
      values
    },
    sshPublicKeys {
      values
    },
    tags {
      values
    },
    preferredLanguage {
      values
    },
    businessTitle {
      value
    },
    team {
      value
    },
    entity {
      value
    },
    locationDescription {
      value
    },
    timeZone {
      value
    },
    workerType {
      value
    },
    wprDeskNumber {
      value
    },
    costCenter {
      value
    },
  } 
}`;

const PREVIEW_PROFILE = gql`query ($previewUserId: String!) {
 profile (userId:$previewUserId) { 
    firstName {
      value
    },
    lastName {
      value
    },
    funTitle {
      value
    },
    picture {
      value
    },
    pronouns {
      value
    },
    alternativeName {
      value
    },
    locationPreference {
      value
    },
    officeLocation {
      value
    },
    description {
      value
    },
    userId {
      value
    },
    created {
      value
    },
    businessTitle {
      value
    },
    team {
      value
    },
    entity {
      value
    },
    locationDescription {
      value
    },
    timeZone {
      value
    },
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

export { PROFILE, PREVIEW_PROFILE, PROFILE_LIST, MUTATE_PROFILE };
