import { gql } from 'apollo-boost'

export default {
  createUser: gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $id: ID!) {
      createUser(firstName: $firstName, lastName: $lastName, email: $email, id: $id) {
        id
        firstName
        lastName
        email
      }
    }
  `,
  deleteUser: gql`
    mutation($id: ID!) {
      deleteUser(id: $id) {
        id
        firstName
        lastName
        email
      }
    }
  `,
  addFriend: gql`
    mutation($userId: ID!, $friendId: ID!) {
      addFriend(userId: $userId, friendId: $friendId) {
        id
        firstName
        lastName
        email
      }
    }
  `,
  removeFriend: gql`
    mutation($userId: ID!, $friendId: ID!) {
      removeFriend(userId: $userId, friendId: $friendId) {
        id
        firstName
        lastName
        email
      }
    }
  `,
}
