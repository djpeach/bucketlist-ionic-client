import {
  IonPage,
  IonContent,
  IonButton,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea
} from "@ionic/react";
import Select from 'react-select'
import authedComponent from "../common/AuthedComponent";import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from '../../graphql'

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

function Friends() {
  const [friendObj, setFriendObj] = useState(null)
  const {loading, error, data} = useQuery(gql.getAllUsers)

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
      <IonCard className="bl-card-padding">
        <h1 style={{ paddingBottom: "20px" }}>New Friend</h1>
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
      </IonCard>
    </IonPage>
  );
}

export default authedComponent(Friends);
