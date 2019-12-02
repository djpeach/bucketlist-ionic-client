import React from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonModal,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonItem,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
} from "@ionic/react";
import authedComponent from "../common/AuthedComponent";
import NewDropsPreview from './NewDropsPreview'
import ListsPreview from './ListsPreview'
import {useState} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from '../../graphql'
import firebase from 'firebase'

function ListOfLists({onSelected}) {
  const {loading, error, data} = useQuery(gql.getListsByUser, {variables: {id: firebase.auth().currentUser.uid}})

  if (loading) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            Loading Lists ...
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
           Error: {error.message}
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  return (
    <IonList>
      <IonItem>
        {data.getListsByUser.length > 0 ? (
            <>
              <IonLabel>Your Buckets: </IonLabel>
              <IonSelect placeholder="Select a Bucket" okText="Select" cancelText="Cancel" onIonChange={(e) => onSelected(e.target.value)}>
                {data.getListsByUser.map((list, index) => {
                  return (
                      <IonSelectOption value={list.id} key={list.id}>
                        {list.title}
                      </IonSelectOption>
                  )
                })}
              </IonSelect>
            </>
        ) : (
          <IonLabel>
          No Buckets yet, go back and make one!
          </IonLabel>
        )}
      </IonItem>
    </IonList>
  )
}

function BucketSelectModal({acceptingItem, drop, setAcceptingItem}) {
  const [selectedBucket, changeSelectedBucket] = useState('')
  const [assignItemToList] = useMutation(gql.assignItemToList, {
    onCompleted() {
      setAcceptingItem(false)
    }
  })

  return (
    <IonModal isOpen={acceptingItem}>
      <IonContent>
        <h1 className="bl-list-title">Add New Drop to a Bucket</h1>
        <IonCard className="mt-5">
          <IonCardHeader>New Drop</IonCardHeader>
          <IonItem>
            {drop !== {} ? (
              <div>
                <p>From: {drop.from && drop.from.firstName} {drop.from && drop.from.lastName}</p>
                <h5>{drop.message}</h5>
              </div>
            ) : (
              <p>No Drops</p>
            )}
          </IonItem>
        </IonCard>
        <IonCard>
          <IonCardHeader>Select a Bucket</IonCardHeader>
          <ListOfLists onSelected={changeSelectedBucket}/>
        </IonCard>
        <IonButton className="bl-list-back-btn" onClick={() => {
          assignItemToList({variables: {
            id: drop.id,
            listId: selectedBucket
          }})
        }}>
          Add to Bucket
        </IonButton>
        <IonButton className="fix-to-bottom" color="danger" onClick={() => setAcceptingItem(false)}>Cancel</IonButton>
      </IonContent>
    </IonModal>
  )
}

function Dashboard() {
  const [acceptingItem, setAcceptingItem] = useState(false)
  const [drop, setDrop] = useState({})
  const [creatingBucket, setCreatingBucket] = useState(false)
  const [bucketName, setBucketName] = useState('')
  const [createList] = useMutation(gql.createList, {
    onCompleted() {
      setCreatingBucket(false)
      setBucketName('')
    }
  })

  return (
    <IonPage className="bl-page">
      <IonContent fullscreen>
        <BucketSelectModal acceptingItem={acceptingItem} drop={drop} setAcceptingItem={setAcceptingItem}/>
        <NewDropsPreview setAcceptingItem={setAcceptingItem} setDrop={setDrop}/>
        <ListsPreview/>
        {creatingBucket && <IonInput placeholder="Bucket Name" value={ bucketName }
               onInput={ e => setBucketName(e.target.value) } />}
        <IonButton color="success" strong type="button"
                  className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={() => {
                    if (creatingBucket) {
                      if (bucketName !== '') {
                        createList({variables: {
                          title: bucketName,
                          userId: firebase.auth().currentUser.uid
                        }})
                      }
                    } else {
                      setCreatingBucket(true)
                    }
                  }}>
          {creatingBucket ? 'Add Bucket' : '+ New Bucket'}
        </IonButton>
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(Dashboard);