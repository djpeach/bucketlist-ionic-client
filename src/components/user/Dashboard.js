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
  IonCol,
  IonRow
} from "@ionic/react";
import authedComponent from "../common/AuthedComponent";
import NewDropsPreview from './NewDropsPreview'
import BucketsPreview from './BucketsPreview'
import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from '../../graphql'
import firebase from 'firebase'
import { ListOfBuckets } from '.';

function BucketSelectModal({ acceptingItem, drop, setAcceptingItem }) {
  const [selectedBucket, changeSelectedBucket] = useState('')
  const [assignItemToList] = useMutation(gql.assignItemToList, {
    onCompleted() {
      setAcceptingItem(false)
    }
  })

  return (
    <IonModal isOpen={acceptingItem}>
      <IonContent>
        <IonRow style={{ height: '100%' }}>
          <IonCol className="ion-padding" style={{ height: '100%' }}>
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
              <ListOfBuckets onSelected={changeSelectedBucket} />
            </IonCard>
            <IonRow className="ion-align-items-center ion-justify-content-between bl-bottom-row">
              <IonButton color="danger" onClick={() => setAcceptingItem(false)}>Cancel</IonButton>
              <IonButton onClick={() => {
                if (selectedBucket !== '') {
                  assignItemToList({
                    variables: {
                      id: drop.id,
                      listId: selectedBucket
                    }
                  })
                }
              }}>
                Add to Bucket
              </IonButton>
            </IonRow>
          </IonCol>
        </IonRow>
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
        <BucketSelectModal acceptingItem={acceptingItem} drop={drop} setAcceptingItem={setAcceptingItem} />
        <NewDropsPreview setAcceptingItem={setAcceptingItem} setDrop={setDrop} />
        <BucketsPreview />
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(Dashboard);