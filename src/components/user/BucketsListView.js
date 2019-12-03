import React from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonRow,
  IonCard,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import authedComponent from "../common/AuthedComponent";
import BucketsPreview from './BucketsPreview'
import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from '../../graphql'
import firebase from 'firebase'

export function ListOfBuckets({ onSelected }) {
  const { loading, error, data } = useQuery(gql.getListsByUser, { variables: { id: firebase.auth().currentUser.uid } })

  if (loading) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            Loading Buckets ...
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
              {data.getListsByUser.map((bucket, index) => {
                return (
                  <IonSelectOption value={bucket.id} key={bucket.id}>
                    {bucket.title}
                  </IonSelectOption>
                )
              })}
            </IonSelect>
          </>
        ) : (
            <IonLabel>
              No Buckets yet, go make one!
          </IonLabel>
          )}
      </IonItem>
    </IonList>
  )
}

function Buckets() {
  const [creatingBucket, setCreatingBucket] = useState(false)
  const [bucketName, setBucketName] = useState('')
  const [createList] = useMutation(gql.createList, {
    onCompleted() {
      setCreatingBucket(false)
      setBucketName('')
    }
  })

  const lists = useQuery(gql.getListsByUser, {
    variables: { id: firebase.auth().currentUser.uid }
  })

  const openAddBucket = () => {
    setCreatingBucket(true)
  }

  const submitNewBucket = (event) => {
    event.preventDefault();
    createList({
      variables: {
        title: bucketName,
        userId: firebase.auth().currentUser.uid
      }
    })
  }

  const cancelAddBucket = () => {
    setBucketName('');
    setCreatingBucket(false)
  }

  async function doRefresh(e) {
    await lists.refetch()
    e.detail.complete()
  }

  return (
    <IonPage className="bl-page">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh} style={{zIndex: "100"}}>
          <IonRefresherContent
            pullingIcon="arrow-dropdown"
            pullingText="Pull to refresh">
          </IonRefresherContent>
        </IonRefresher>
        <BucketsPreview {...lists} />
        <IonCard className="bl-card-padding">
          {creatingBucket && (
            <IonRow>
              <form onSubmit={submitNewBucket} style={{ width: '100%' }}>
                <IonItem>
                  <IonLabel position="floating">Bucket Name</IonLabel>
                  <IonInput required placeholder="e.g. Summer Goals" value={bucketName} onIonChange={e => setBucketName(e.target.value)} />
                </IonItem>
                <IonButton color="danger" strong className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={cancelAddBucket}>
                  Cancel
              </IonButton>
                <IonButton color="success" strong type="submit" className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn">
                  Add Bucket
                </IonButton>
              </form>
            </IonRow>
          )}
          {!creatingBucket && (
            <IonButton color="success" strong type="button"
              className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={openAddBucket}>
              + New Bucket
            </IonButton>
          )}
        </IonCard>
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(Buckets);