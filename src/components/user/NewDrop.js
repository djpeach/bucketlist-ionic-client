import {
  IonPage,
  IonCard,
  IonButton,
  IonItem,
  IonLabel,
  IonTextarea
} from '@ionic/react'
import Select from 'react-select';
import authedComponent from '../common/AuthedComponent'
import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
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

  const [friendObj, setFriendObj] = useState(null)
  const [message, setMessage] = useState('')
  const {loading, error, data} = useQuery(gql.getAllFriends, {variables: {userId: firebase.auth().currentUser.uid}})
  const [createItem] = useMutation(gql.createItem, {
    onCompleted() {
      props.history.push(routes.home)
      setFriendObj(null)
      setMessage('')
    }
  })

  const handleFriendSearchChange = friendObj => {
    setFriendObj(friendObj)
  }

  const handleDescriptionChange = (event) => {
    var description = event.target.value
    // Handle newlines in the description textarea (thinking either <br /> or \n)
    description = description.replace(/\r?\n/g, ' <br /> ')
    setMessage(description)
  }

  const friends = (loading || error || data.getAllFriends.length <= 0 ? [{id: 0, firstName: 'No', lastName: ' Friends :('}] : data.getAllFriends)

  if (!friends.some(f => f.firstName === 'Myself')) {
    friends.unshift({id: firebase.auth().currentUser.uid, firstName: 'Myself', lastName: ''})
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
          // TODO: set this up to not use mock state (options are label, value)
          options={friends}
        />
        <IonItem>
          <IonButton style={{ marginTop: '20px', height: '30px' }} href={routes.addFriend}>
            + New Friend
          </IonButton>
        </IonItem>


        <IonItem style={{ marginTop: '20px' }}>
          <IonLabel position="floating"></IonLabel>
          <IonTextarea rows={1} cols={20} autoGrow={true} placeholder={"Description"} onIonChange={handleDescriptionChange}></IonTextarea>
        </IonItem>
        <IonButton style={{ marginTop: '20px' }} onClick={() => {
          createItem({variables: {
            senderId: firebase.auth().currentUser.uid,
            recipientId: friendObj.id,
            message: message
          }})
        }}>
          Send Drop
        </IonButton>
      </IonCard>
    </IonPage>
  )
}

export default authedComponent(NewDrop)
