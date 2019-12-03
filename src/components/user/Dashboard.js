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
        <IonButton className="bl-list-back-btn" onClick={() => {
          if (selectedBucket !== '') {
            assignItemToList({variables: {
              id: drop.id,
              listId: selectedBucket
            }})
          }
        }}>
          Add to Bucket
        </IonButton>
        <IonButton className="fix-to-bottom" color="danger" onClick={() => setOpen(false)}>Cancel</IonButton>
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
        <BucketSelectModal modalIsOpen={acceptingItem} drop={drop} setOpen={setAcceptingItem} />
        <NewDropsPreview setAcceptingItem={setAcceptingItem} setDrop={setDrop} />
        <BucketsPreview />
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(Dashboard);