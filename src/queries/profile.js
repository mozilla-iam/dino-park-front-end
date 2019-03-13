import { gql } from 'apollo-boost';

const PREVIEW_PROFILE = gql`
  query($username: String!) {
    profile(username: $username) {
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
    }
  }
`;

const USER_MENU_PROFILE = gql`
  query {
    profile {
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
    }
  }
`;

const MUTATE_PROFILE = gql`
  mutation UpdateProfile(
    $alternativeName: StringWithDisplay
    $description: StringWithDisplay
    $firstName: StringWithDisplay
    $funTitle: StringWithDisplay
    $lastName: StringWithDisplay
    $location: StringWithDisplay
    $pronouns: StringWithDisplay
    $timezone: StringWithDisplay
    $languages: KeyValuesWithDisplay
  ) {
    profile(
      update: {
        alternativeName: $alternativeName
        description: $description
        firstName: $firstName
        funTitle: $funTitle
        lastName: $lastName
        location: $location
        pronouns: $pronouns
        timezone: $timezone
        languages: $languages
      }
    ) {
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
      languages {
        values
        metadata {
          display
        }
      }
    }
  }
`;

const DISPLAY_PROFILE = gql`
  query DisplayProfile($username: String!) {
    profile(username: $username) {
      accessInformation {
        mozilliansorg {
          values
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
      }
      languages {
        values
        metadata {
          display
        }
      }
    }
  }
`;

export { DISPLAY_PROFILE, MUTATE_PROFILE, PREVIEW_PROFILE, USER_MENU_PROFILE };
