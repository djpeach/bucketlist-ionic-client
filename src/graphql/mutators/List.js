import { gql } from 'apollo-boost'

export default {
  createList: gql`
    mutation($title: String!, $userId: ID!) {
      createList(title: $title, userId: $userId) {
        id
        title
      }
    }
  `,
  deleteList: gql`
    mutation($id: ID) {
      deleteList(id: $id) {
        id
        title
      }
    }
  `,
}
