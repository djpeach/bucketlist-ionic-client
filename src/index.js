import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import keys from './conf/keys'
import App from './App'

const httpLink = new HttpLink({
  uri: 'http://167.172.219.73/graphql',
})

const client = new ApolloClient({
  link: httpLink,
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
