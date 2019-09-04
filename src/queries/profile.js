import { gql } from 'apollo-boost';

const PREVIEW_PROFILE = gql`
  query($username: String!) {
    profile(username: $username) {
      uuid {
        value
      }
      alternativeName {
        value
      }
      description {
        value
      }
      firstName {
        value
      }
      funTitle {
        value
      }
      lastName {
        value
      }
      location {
        value
      }
      picture {
        value
      }
      primaryEmail {
        value
      }
      pronouns {
        value
      }
      timezone {
        value
      }
      primaryUsername {
        value
      }
      phoneNumbers {
        values
      }
      staffInformation {
        staff {
          value
        }
        team {
          value
        }
        title {
          value
        }
        officeLocation {
          value
        }
      }
      uris {
        values
      }
    }
  }
`;

const USER_MENU_PROFILE = gql`
  query {
    profile {
      uuid {
        value
      }
      firstName {
        value
      }
      lastName {
        value
      }
      picture {
        value
      }
      primaryUsername {
        value
      }
      primaryEmail {
        value
      }
      timezone {
        value
      }
    }
  }
`;

const MUTATE_PROFILE = gql`
  mutation UpdateProfile(
    $primaryUsername: StringWithDisplay
    $alternativeName: StringWithDisplay
    $description: StringWithDisplay
    $firstName: StringWithDisplay
    $funTitle: StringWithDisplay
    $identities: IdentitiesWithDisplay
    $lastName: StringWithDisplay
    $location: StringWithDisplay
    $phoneNumbers: KeyValuesWithDisplay
    $picture: StringWithDisplay
    $pronouns: StringWithDisplay
    $timezone: StringWithDisplay
    $languages: KeyValuesWithDisplay
    $tags: KeyValuesWithDisplay
    $uris: KeyValuesWithDisplay
    $accessInformationMozilliansorg: Display
  ) {
    profile(
      update: {
        primaryUsername: $primaryUsername
        alternativeName: $alternativeName
        description: $description
        firstName: $firstName
        funTitle: $funTitle
        identities: $identities
        lastName: $lastName
        location: $location
        phoneNumbers: $phoneNumbers
        picture: $picture
        pronouns: $pronouns
        timezone: $timezone
        languages: $languages
        tags: $tags
        uris: $uris
        accessInformationMozilliansorg: $accessInformationMozilliansorg
      }
    ) {
      uuid {
        value
        metadata {
          display
        }
      }
      primaryUsername {
        value
        metadata {
          display
        }
      }
      alternativeName {
        value
        metadata {
          display
        }
      }
      description {
        value
        metadata {
          display
        }
      }
      firstName {
        value
        metadata {
          display
        }
      }
      funTitle {
        value
        metadata {
          display
        }
      }
      identities {
        githubIdV3 {
          value
          metadata {
            display
          }
        }
        bugzillaMozillaOrgId {
          value
          metadata {
            display
          }
        }
        bugzillaMozillaOrgPrimaryEmail {
          value
          metadata {
            display
          }
        }
      }
      lastName {
        value
        metadata {
          display
        }
      }
      location {
        value
        metadata {
          display
        }
      }
      phoneNumbers {
        values
        metadata {
          display
        }
      }
      picture {
        value
        metadata {
          display
        }
      }
      pronouns {
        value
        metadata {
          display
        }
      }
      timezone {
        value
        metadata {
          display
        }
      }
      uris {
        values
        metadata {
          display
        }
      }
      languages {
        values
        metadata {
          display
        }
      }
      tags {
        values
        metadata {
          display
        }
      }
      accessInformation {
        mozilliansorg {
          values
          metadata {
            display
          }
        }
      }
    }
  }
`;

const DISPLAY_PROFILE = gql`
  query DisplayProfile($username: String) {
    profile(username: $username) {
      uuid {
        value
      }
      accessInformation {
        mozilliansorg {
          values
          metadata {
            display
          }
        }
      }
      alternativeName {
        value
        metadata {
          display
        }
      }
      description {
        value
        metadata {
          display
        }
      }
      uuid {
        value
        metadata {
          display
        }
      }
      firstName {
        value
        metadata {
          display
        }
      }
      funTitle {
        value
        metadata {
          display
        }
      }
      identities {
        githubIdV3 {
          value
          metadata {
            display
          }
        }
        bugzillaMozillaOrgId {
          value
          metadata {
            display
          }
        }
        bugzillaMozillaOrgPrimaryEmail {
          value
          metadata {
            display
          }
        }
      }
      lastName {
        value
        metadata {
          display
        }
      }
      location {
        value
        metadata {
          display
        }
      }
      picture {
        value
        metadata {
          display
        }
      }
      primaryEmail {
        value
        metadata {
          display
        }
      }
      pronouns {
        value
        metadata {
          display
        }
      }
      timezone {
        value
        metadata {
          display
        }
      }
      primaryUsername {
        value
        metadata {
          display
        }
      }
      phoneNumbers {
        values
        metadata {
          display
        }
      }
      staffInformation {
        staff {
          value
          metadata {
            display
          }
        }
        team {
          value
          metadata {
            display
          }
        }
        title {
          value
          metadata {
            display
          }
        }
        officeLocation {
          value
          metadata {
            display
          }
        }
        workerType {
          value
          metadata {
            display
          }
        }
        wprDeskNumber {
          value
          metadata {
            display
          }
        }
        costCenter {
          value
          metadata {
            display
          }
        }
      }
      tags {
        values
        metadata {
          display
        }
      }
      languages {
        values
        metadata {
          display
        }
      }
      uris {
        values
        metadata {
          display
        }
      }
      pgpPublicKeys {
        values
        metadata {
          display
        }
      }
      sshPublicKeys {
        values
        metadata {
          display
        }
      }
    }
  }
`;

export { DISPLAY_PROFILE, MUTATE_PROFILE, PREVIEW_PROFILE, USER_MENU_PROFILE };
