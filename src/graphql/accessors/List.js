import { gql } from 'apollo-boost'

export default {
  getListsByUser: gql`
    query($id: ID!) {
      getListsByUser(userId: $id) {
        id
        title
        items {
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
    }
  `,
  getListsByQuery: gql`
    query($userId: ID!, $query: String!, $limit: Int = 10) {
      getListsByQuery(userId: $userId, query: $query, limit: $limit) {
        id
        title
        items {
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
    }
  `,
  getListById: gql`
    query($id: ID!) {
      getListById(id: $id) {
        id
        title
        items {
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
    }
  `
}
