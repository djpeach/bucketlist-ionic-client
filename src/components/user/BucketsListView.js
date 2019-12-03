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
  IonCard,
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

  return (
    <IonPage className="bl-page">
      <IonContent fullscreen>
        <BucketsPreview />
        <IonCard className="bl-card-padding">
          {creatingBucket && (
            <IonItem>
              <IonLabel position="floating">Bucket Name</IonLabel>
              <IonInput placeholder="e.g. Summer Goals" value={bucketName} onInput={e => setBucketName(e.target.value)} />
            </IonItem>
          )}
          {creatingBucket && (
            <IonButton color="danger" strong type="button"
              className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={() => {
                setBucketName('');
                setCreatingBucket(false)
              }}>
              Cancel
              </IonButton>
          )}

          <IonButton color="success" strong type="button"
            className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={() => {
              if (creatingBucket) {
                createList({
                  variables: {
                    title: bucketName,
                    userId: firebase.auth().currentUser.uid
                  }
                })
              } else {
                setCreatingBucket(true)
              }
            }}>
            {creatingBucket ? 'Add Bucket' : '+ New Bucket'}

          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(Buckets);