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

export default function NewDropsPreview({loading, error, data, refetch, setAcceptingItem, setDrop}) {
  const [deleteItem] = useMutation(gql.deleteItem)

  if (loading) {
    return (
      <IonCard>
      <IonCardHeader>
        <h1>New Drops</h1>
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
      <IonCard>
      <IonCardHeader>
        <h1>New Drops</h1>
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
    <IonCard>
    <IonCardHeader>
      <h1>New Drops</h1>
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
                <IonItemOption color="danger" onClick={ async () => {
                  deleteItem({variables: { id: item.id }})
                  refetch()
                  await document.querySelector("ion-item-sliding").closeOpened()
                }}>Reject</IonItemOption>
                <IonItemOption onClick={ async () => {
                  setDrop(item)
                  setAcceptingItem(true)
                  await document.querySelector("ion-item-sliding").closeOpened()
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