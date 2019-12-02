import React from 'react';
import {
  IonTitle,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonCardHeader,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import {useQuery, useMutation} from "@apollo/react-hooks";
import gql from '../../graphql';
import firebase from "firebase";

export default function NewDropsPreview({setAcceptingItem, setDrop}) {
  const {loading, error, data} = useQuery(gql.getNewItemsByUser, {
    variables: {userId: firebase.auth().currentUser.uid},
    pollInterval: 100
  });
  const [deleteItem] = useMutation(gql.deleteItem)

  if (loading) {
    return (
      <IonCard className="mt-5">
      <IonCardHeader>
        <IonTitle>New Drops</IonTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Loading. . .</h3>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonCard>
    )
  }
  if (error) {
    return (
      <IonCard className="mt-5">
      <IonCardHeader>
        <IonTitle>New Drops</IonTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Error! {error.message}</h3>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonCard>
    )
  }
  return (
    <IonCard className="mt-5">
    <IonCardHeader>
      <IonTitle>New Drops</IonTitle>
    </IonCardHeader>
      <IonList>
        {data.getNewItemsByUser.length > 0 ? data.getNewItemsByUser.map((item) => {
          return (
            <IonItemSliding key={item.id}>
              <IonItem>
                <IonLabel>
                  <p>From: {item.from.firstName} {item.from.lastName}</p>
                  <h3>{item.message}</h3>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonItemOption color="danger" onClick={() => {
                  deleteItem({variables: { id: item.id }})
                }}>Reject</IonItemOption>
                <IonItemOption onClick={() => {
                  setDrop(item)
                  setAcceptingItem(true)
                }}>Accept</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          );
        }) : (
          <IonItem>
            <IonLabel>
              <h3>No New Drops</h3>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    </IonCard>
  )
}