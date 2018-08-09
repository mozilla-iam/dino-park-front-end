import gql from 'apollo-boost';

export default gql`query{ profiles }`;

export const PROFILE_QUERY = gql`query {
 profiles (userId:"email|JRaQVFHYgUPYExSPtdcWAzLu") { 
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
    }
  } 
}`;
