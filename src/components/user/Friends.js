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
  IonItemOption,
  IonRefresher,
  IonRefresherContent,
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

function FriendRequestList({loading, error, data, refetch, updateFriends}) {
  const [rejectFriendRequest] = useMutation(gql.rejectFriendRequest, {
    async onCompleted() {
      await refetch()
    }
  })
  const [acceptFriendRequest] = useMutation(gql.acceptFriendRequest, {
    async onCompleted() {
      await refetch()
      await updateFriends()
    }
  })

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
          <IonItemSliding key={req.id}>
            <IonItem key={req.id}>
              <IonLabel>
                <p>From: {req.from.firstName} {req.from.lastName}</p>
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger" onClick={ async () => {
                await rejectFriendRequest({variables: {id: req.id}})
                await document.querySelector("ion-item-sliding").closeOpened()
              }}>
                Reject
              </IonItemOption>
              <IonItemOption onClick={ async () => {
                await acceptFriendRequest({variables: {id: req.id}})
                await document.querySelector("ion-item-sliding").closeOpened()
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

function MyFriendsList({loading, error, data, refetch}) {
  const [removeFriend] = useMutation(gql.removeFriend, {
    async onCompleted() {
      await refetch()
    }
  })

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
          <IonItemSliding key={f.id}>
            <IonItem>
              <IonLabel>
                <p>{f.firstName} {f.lastName}</p>
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger" onClick={ async () => {
                await removeFriend({variables: {userId: firebase.auth().currentUser.uid, friendId: f.id}})
                await document.querySelector("ion-item-sliding").closeOpened()
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
  const allUsers = useQuery(gql.getAllUsers)
  const allFriends = useQuery(gql.getAllFriends, {variables: {userId: firebase.auth().currentUser.uid}})
  const allFriendRequests = useQuery(gql.getFriendRequestsByUser, {variables: {userId: firebase.auth().currentUser.uid}})
  const [createFriendRequest] = useMutation(gql.createFriendRequest, {
    onCompleted() {
      setFriendObj(null) 
    }
  })

  const handleFriendSearchChange = friendObj => {
    setFriendObj(friendObj)
  }

  const users = (allUsers.loading || allUsers.error ? [{id: 0, firstName: 'Loading', lastName: ' Friends. . .'}] : allUsers.data.getAllUsers)

  users.map((obj) => {
    obj.value = obj.id
    obj.label = `${obj.firstName} ${obj.lastName}`
    return obj
  })

  async function doRefresh(e) {
    await allUsers.refetch()
    await allFriends.refetch()
    await allFriendRequests.refetch()
    e.detail.complete()
  }

  return (
    <IonPage className="bl-page">
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh} style={{zIndex: "100"}}>
          <IonRefresherContent
            pullingIcon="arrow-dropdown"
            pullingText="Pull to refresh">
          </IonRefresherContent>
        </IonRefresher>
        <IonCard className="bl-card-padding">
          <h1 style={{ paddingBottom: "20px" }}>New Friend Requests</h1>
          <FriendRequestList updateFriends={allFriends.refetch} {...allFriendRequests}/>
        </IonCard>
        <IonCard className="bl-card-padding">
          <h1 style={{ paddingBottom: "20px" }}>My Friends</h1>
          <MyFriendsList {...allFriends}/>
        </IonCard>
        <IonCard className="bl-card-padding" style={{overflow: "unset", height: "250px", marginBottom: "150px"}}>
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
            options={users.filter(user => user.id !== firebase.auth().currentUser.id)}
          />
            <IonButton color="success" strong type="button"
            className="mt-3 ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={() => {
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
