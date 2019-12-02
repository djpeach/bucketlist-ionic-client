import { gql } from 'apollo-boost'

export default {
  getItemsByList: gql`
    query($listId: ID!) {
      getItemsByList(listId: $listId) {
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
  getNewItemsByUser: gql`
    query($userId: ID!) {
      getNewItemsByUser(userId: $userId) {
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
