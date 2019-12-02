import { gql } from 'apollo-boost'

export default {
  createItem: gql`
    mutation(
      $senderId: ID!
      $recipientId: ID!
      $message: String!
      $link: String
      $listId: ID
    ) {
      createItem(
        senderId: $senderId
        recipientId: $recipientId
        message: $message
        link: $link
        listId: $listId
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
        message
        link
      }
    }
  `,
  assignItemToList: gql`
    mutation($id: ID!, $listId: ID!) {
      assignItemToList(id: $id, listId: $listId) {
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
        message
        link
      }
    }
  `,
  deleteItem: gql`
    mutation($id: ID) {
      deleteItem(id: $id) {
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
        message
        link
      }
    }
  `,
}
