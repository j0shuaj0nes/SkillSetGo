import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      givenName
      familyName
      email
      country
      skillsOffering
      skillsInterestedIn
      groups {
        _id
        name
      }
    }
  }
`;

export const QUERY_GROUPS = gql`
  query getGroups {
    groups {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_GROUP = gql`
  query getSingleGroup($groupid: ID!) {
    thought(groupid: $groupid) {
      _id
      name
    }
  }
`;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//       groups {
//         _id
//         name
//       }
//     }
//   }
// `;

