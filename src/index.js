import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import keys from './conf/secret-keys'
import App from './App'

const httpLink = new HttpLink({
  uri: 'http://bucketlist.us-east-2.elasticbeanstalk.com/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { authtoken: localStorage.getItem('authtoken') },
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

firebase.initializeApp(keys.firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  )
})
