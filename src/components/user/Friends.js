import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonItem,
  IonLabel,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";
import Select from 'react-select'
import authedComponent from "../common/AuthedComponent";import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from '../../graphql'
import firebase from 'firebase'

const friendSearchStyles = {
  menu: (provided, state) => ({
    ...provided,
    background: 'white',
    zIndex: '100 !important',
  }),
  option: (provided, state) => ({
    ...provided,
  }),
}

function FriendRequestList() {
  const {loading, error, data} = useQuery(gql.getFriendRequestsByUser, {variables: {userId: firebase.auth().currentUser.uid}, pollInterval: 100})
  const [rejectFriendRequest] = useMutation(gql.rejectFriendRequest)
  const [acceptFriendRequest] = useMutation(gql.acceptFriendRequest)

  if (loading) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Loading. . .</h3>
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  if (error) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Error!</h3>
            <p>{error.message}</p>
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  if (data.getFriendRequestsByUser.length <= 0) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>No new Friend Requests</h3>
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  return (
    <IonList>
      {data.getFriendRequestsByUser.map(req => {
        return (
          <IonItemSliding>
            <IonItem key={req.id}>
              <IonLabel>
                <p>From: {req.from.firstName} {req.from.lastName}</p>
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger" onClick={() => {
                rejectFriendRequest({variables: {id: req.id}})
              }}>
                Reject
              </IonItemOption>
              <IonItemOption onClick={() => {
                acceptFriendRequest({variables: {id: req.id}})
              }}>
                Accept
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        )
      })}
    </IonList>
  )


}

function MyFriendsList() {
  const {loading, error, data} = useQuery(gql.getAllFriends, {variables: {userId: firebase.auth().currentUser.uid}, pollInterval: 100})
  const [removeFriend] = useMutation(gql.removeFriend)

  if (loading) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Loading. . .</h3>
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  if (error) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Error!</h3>
            <p>{error.message}</p>
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  if (data.getAllFriends.length <= 0) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>No Friends :(</h3>
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  return (
    <IonList>
      {data.getAllFriends.map(f => {
        return (
          <IonItemSliding>
            <IonItem>
              <IonLabel>
                <p>{f.firstName} {f.lastName}</p>
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger" onClick={() => {
                removeFriend({variables: {userId: firebase.auth().currentUser.uid, friendId: f.id}})
              }}>
                Delete
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        )
      })}
    </IonList>
  )
}

function Friends() {
  const [friendObj, setFriendObj] = useState(null)
  const {loading, error, data} = useQuery(gql.getAllUsers)
  const [createFriendRequest] = useMutation(gql.createFriendRequest)

  const handleFriendSearchChange = friendObj => {
    setFriendObj(friendObj)
  }

  const users = (loading || error ? [{id: 0, firstName: 'Loading', lastName: ' Friends. . .'}] : data.getAllUsers)

  users.map((obj) => {
    obj.value = obj.id
    obj.label = `${obj.firstName} ${obj.lastName}`
    return obj
  })

  return (
    <IonPage className="bl-page">
      <IonContent>
      <IonCard className="bl-card-padding">
          <h1 style={{ paddingBottom: "20px" }}>New Friend Requests</h1>
          <FriendRequestList/>
        </IonCard>
        <IonCard className="bl-card-padding">
          <h1 style={{ paddingBottom: "20px" }}>My Friends</h1>
          <MyFriendsList/>
        </IonCard>
        <IonCard className="bl-card-padding">
          <h1 style={{ paddingBottom: "20px" }}>Add Friend</h1>
          <Select
            value={friendObj}
            placeholder='Search Friends'
            styles={friendSearchStyles}
            onChange={handleFriendSearchChange}
            noOptionsMessage={() => 'Friend not found'}
            isClearable
            isSearchable
            name="friends"
            // TODO: set this up to not use mock state (options are label, value)
            options={users}
          />
            <IonButton color="success" strong type="button"
            className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={() => {
              if (friendObj) {
                createFriendRequest({variables: {
                  senderId: firebase.auth().currentUser.uid,
                  recipientId: friendObj.id
                }})
              }
            }}>
              Send Friend Request
            </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default authedComponent(Friends);
