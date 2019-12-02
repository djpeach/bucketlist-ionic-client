import React from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router'
import routes from '../../conf/routes'

function unAuthedComponent(WrappedComponent) {
  return class extends React.Component {
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return !firebase.auth().currentUser ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to={routes.index} />
      )
    }
  }
}

export default unAuthedComponent
