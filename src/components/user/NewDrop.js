import {
  IonPage,
  IonCard,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react'
import Select from 'react-select';
import authedComponent from '../common/AuthedComponent'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from '../../graphql'
import firebase from 'firebase'
import routes from '../../conf/routes';

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

function NewDrop(props) {
  const self = { id: firebase.auth().currentUser.uid, firstName: 'Myself', lastName: '' };
  const [friendObj, setFriendObj] = useState(self)
  const [message, setMessage] = useState('')
  const { loading, error, data } = useQuery(gql.getAllFriends, { variables: { userId: firebase.auth().currentUser.uid } })
  const [createItem] = useMutation(gql.createItem, {
    onCompleted() {
      setMessage('')
      setFriendObj(self)
      props.history.push(routes.home)
    }
  })

  const handleFriendSearchChange = friendObj => {
    setFriendObj(friendObj)
  }

  const handleSubmit = () => {
    if (friendObj) {
      createItem({
        variables: {
          senderId: firebase.auth().currentUser.uid,
          recipientId: friendObj.id,
          message: message
        }
      })
    }
  }

  const friends = (loading || error || data.getAllFriends.length <= 0 ? [{ id: 0, firstName: 'No', lastName: ' Friends :(' }] : data.getAllFriends)

  if (!friends.some(f => f.firstName === 'Myself')) {
    friends.unshift(self)
  }
  friends.map((obj) => {
    obj.value = obj.id
    obj.label = `${obj.firstName} ${obj.lastName}`
    return obj
  })

  return (
    <IonPage className="bl-page">
      <IonCard className="bl-card-padding">
        <h1 style={{ paddingBottom: '20px' }}>New Drop</h1>

        <Select
          value={friendObj}
          placeholder='Search Friends'
          styles={friendSearchStyles}
          onChange={handleFriendSearchChange}
          noOptionsMessage={() => 'Friend not found'}
          isClearable
          isSearchable
          name="friends"
          options={friends}
        />

        <IonItem style={{ marginTop: '20px' }}>
          <IonLabel position="floating"></IonLabel>
          <IonInput placeholder={"Description"} onIonChange={(e) => setMessage(e.target.value)} value={message} />
        </IonItem>
        <IonButton color="success" strong type="button"
          className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" style={{ marginTop: '20px' }} onClick={handleSubmit}>
          Send Drop
        </IonButton>
      </IonCard>
    </IonPage>
  )
}

export default authedComponent(NewDrop)
