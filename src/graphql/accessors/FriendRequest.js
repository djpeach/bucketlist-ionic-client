import { gql } from 'apollo-boost'

export default {
  getFriendRequestsByUser: gql`
    query(
      $userId: ID!
    ) {
      getFriendRequestsByUser(
        userId: $userId
      ) {
        id
        from {
          id
          firstName
          lastName
        }
        to {
          id
          firstName
          lastName
        }
      }
    }
  `
}