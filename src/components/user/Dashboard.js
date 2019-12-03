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
  IonRow,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import authedComponent from "../common/AuthedComponent";
import NewDropsPreview from './NewDropsPreview'
import BucketsPreview from './BucketsPreview'
import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from '../../graphql'
import firebase from 'firebase'
import { ListOfBuckets } from '.';

function BucketSelectModal({ modalIsOpen, setOpen, drop }) {
  const [selectedBucket, changeSelectedBucket] = useState('')
  const [assignItemToList] = useMutation(gql.assignItemToList, {
    onCompleted() {
      setOpen(false)
    }
  })

  return (
    <IonModal isOpen={modalIsOpen}>
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
              <IonButton color="danger" onClick={() => setOpen(false)}>Cancel</IonButton>
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
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const [createList] = useMutation(gql.createList, {
    onCompleted() {
      setCreatingBucket(false)
      setBucketName('')
    }
  })
  const {loading, error, data, refetch} = useQuery(gql.getNewItemsByUser, {
    variables: {userId: firebase.auth().currentUser.uid}
  });

  async function doRefresh(e) {
    await refetch()
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

        <BucketSelectModal modalIsOpen={acceptingItem} drop={drop} setOpen={setAcceptingItem} />
        <NewDropsPreview setAcceptingItem={setAcceptingItem} setDrop={setDrop} loading={loading} error={error} data={data} refetch={refetch} />
        <BucketsPreview />
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(Dashboard);