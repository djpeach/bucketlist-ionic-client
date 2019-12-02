import React from 'react'
import {
  IonPage,
  IonButton,
  IonCard,
  IonContent,
} from '@ionic/react'
import firebase from 'firebase'
import routes from '../../conf/routes'
import gql from '../../graphql'
import authedComponent from '../common/AuthedComponent'
import {useQuery} from "@apollo/react-hooks";

function UserInfo() {
  const {loading, error, data} = useQuery(gql.getUserById, {
    variables: {id: firebase.auth().currentUser.uid}
  })

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }
  if (error) {
    return (
      <div>
        <p>Error!</p>
        <p>{error.message}</p>
      </div>
    )
  }

  const {getUserById: user} = data

  return (
    <div>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>MongoDB Id: {user._id}</p>
      <p>Firebase Id: {firebase.auth().currentUser.uid}</p>
    </div>
  )
}

function ProfileSettings(props) {

  const logout = () => {
    firebase.auth().signOut().then(() => {
      props.history.push(routes.auth.login)
    })
  }

  return (
    <IonPage className="bl-page">
      <IonContent>
        <IonCard className={"bl-card-padding"}>
          <h1> User Information </h1>
          <UserInfo/>
        </IonCard>
      </IonContent>
      <IonButton onClick={logout} style={{ marginBottom: '20px' }}>Logout</IonButton>
    </IonPage>
  )
}

export default authedComponent(ProfileSettings)
