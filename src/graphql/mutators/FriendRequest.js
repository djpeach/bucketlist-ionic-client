import { gql } from 'apollo-boost'

export default {
  createFriendRequest: gql`
    mutation(
      $senderId: ID!
      $recipientId: ID!
    ) {
      createFriendRequest(
        senderId: $senderId
        recipientId: $recipientId
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
  `,
  acceptFriendRequest: gql`
    mutation(
      $id: ID!
    ) {
      acceptFriendRequest(
        id: $id
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
  `,
  rejectFriendRequest: gql`
    mutation($id: ID!) {
      rejectFriendRequest(id: $id) {
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
  `,
}
