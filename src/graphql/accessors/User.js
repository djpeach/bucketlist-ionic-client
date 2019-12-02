import { gql } from 'apollo-boost'

export default {
  getAllUsers: gql`
    {
      getAllUsers {
        _id
        id
        firstName
        lastName
        email
      }
    }
  `,
  getUserById: gql`
    query($id: ID!) {
      getUserById(id: $id) {
        _id
        id
        firstName
        lastName
        email
      }
    }
  `,
  getUsersByQuery: gql`
    query($query: String!, $limit: Int = 10) {
      getUsersByQuery(query: $query, limit: $limit) {
        _id
        id
        firstName
        lastName
        email
      }
    }
  `,
  getAllFriends: gql`
    query($userId: ID!) {
      getAllFriends(userId: $userId) {
        _id
        id
        firstName
        lastName
        email
      }
    }
  `,
  getFriendsByQuery: gql`
    query($userId: ID!, $query: String!, $limit: Int = 10) {
      getFriendsByQuery(userId: $userId, query: $query, limit: $limit) {
        _id
        id
        firstName
        lastName
        email
      }
    }
  `,
}
