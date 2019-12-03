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
import { ListOfBuckets } from '.';

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
  const selfOption = { value: self.id, label: 'Myself' };
  const [friendObj, setFriendObj] = useState(selfOption)
  const [selectedBucket, changeSelectedBucket] = useState('')
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
      const itemObj = {
        senderId: firebase.auth().currentUser.uid,
        recipientId: friendObj.id,
        message: message
      };
      if (selectedBucket) {
        createItem({
          variables: { ...itemObj, listId: selectedBucket }
        })
      } else {
        createItem({
          variables: itemObj
        })
      }
    }
  }

  const friends = (loading || error || data.getAllFriends.length <= 0 ? [{ id: 0, firstName: 'No', lastName: ' Friends :(' }] : data.getAllFriends)

  friends.map((obj) => {
    obj.value = obj.id
    obj.label = `${obj.firstName} ${obj.lastName}`
    return obj
  })

  return (
    <IonPage className="bl-page">
      <IonCard className="bl-card-padding">
        <h1 style={{ paddingBottom: '20px' }}>New Drop</h1>
        <form onSubmit={handleSubmit}>
          <Select
            value={friendObj}
            placeholder='Search Friends'
            styles={friendSearchStyles}
            onChange={handleFriendSearchChange}
            noOptionsMessage={() => 'Friend not found'}
            isClearable
            isSearchable
            name="friends"
            options={[selfOption, ...friends]}
          />

          <IonItem style={{ marginTop: '20px' }}>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput placeholder="e.g. go on an adventure" required onIonChange={(e) => setMessage(e.target.value)} value={message} />
          </IonItem>
          {friendObj.firstName === 'Myself' && (
            <IonItem>
              <ListOfBuckets onSelected={changeSelectedBucket} />
            </IonItem>
          )}
          <IonButton color="success" strong type="button" type="submit"
            className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" style={{ marginTop: '20px' }}>
            Send Drop
          </IonButton>
        </form>
      </IonCard>
    </IonPage>
  )
}

export default authedComponent(NewDrop)
