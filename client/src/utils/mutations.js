import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!, $username: String, $email: String, $country: String, $skillsOffering: String, $skillsInterestedIn: String) {
    updateUser(_id: $_id, username: $username, email: $email, country: $country, skillsOffering: $skillsOffering, skillsInterestedIn: $skillsInterestedIn) {
      _id
      username
      email
      country
      skillsOffering
      skillsInterestedIn
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;



export const JOIN_GROUP = gql`
  mutation JoinGroup($userId: ID!, $groupId: ID!) {
    joinGroup(userId: $userId, groupId: $groupId) {
      _id
      name
      members {
        _id
        username
      }
    }
  }
`;

export const LEAVE_GROUP = gql`
  mutation LeaveGroup($userId: ID!, $groupId: ID!) {
    leaveGroup(userId: $userId, groupId: $groupId) {
      _id
      name
      members {
        _id
        username
      }
    }
  }
`;

export const ADD_FOLLOWER = gql`
  mutation AddFollower($_id: ID!) {
    addFollower(_id: $_id) {
      _id
      username
      followers {
        _id
        username
      }
    }
  }
`;

export const DELETE_FOLLOWER = gql`
  mutation DeleteFollower($_id: ID!) {
    deleteFollower(_id: $_id) {
      _id
      username
      followers {
        _id
        username
      }
    }
  }
`;



// export const ADD_GROUP = gql`
//   mutation addGroup($thoughtText: String!) {
//     addThought(thoughtText: $thoughtText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//       }
//     }
//   }
// `;

