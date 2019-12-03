import React from 'react';
import {
  IonTitle,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonCardHeader,
} from "@ionic/react";
import routes, { routeWithParams } from "../../conf/routes";
import { useQuery } from "@apollo/react-hooks";
import gql from '../../graphql';
import firebase from "firebase";

export default function BucketsPreview() {
  const { loading, error, data } = useQuery(gql.getListsByUser, {
    variables: { id: firebase.auth().currentUser.uid },
    pollInterval: 100
  })
  if (loading) {
    return (
      <IonCard>
        <IonCardHeader>
          <h1>Your Buckets</h1>
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
          <h1>Your Buckets</h1>
        </IonCardHeader>
        <IonList>
          <IonItem>
            <IonLabel>
              <h3>Error!</h3>
              <p>{error.message}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCard>
    )
  }

  return (
    <IonCard>
      <IonCardHeader>
        <h1>Your Buckets</h1>
      </IonCardHeader>
      <IonList>
        {data.getListsByUser.length > 0 ? data.getListsByUser.map(list => {
          return (
            <IonItem routerLink={routeWithParams(routes.buckets.detail, list.id)} detail key={list.id}>
              <IonLabel>
                <p>{list.title}</p>
              </IonLabel>
              <IonLabel slot="end">
                <p>
                  {
                    (list.items.length > 0) ?
                      (list.items.length === 1 ? list.items.length + ' drop' : list.items.length + ' drops') :
                      'No drops'
                  }
                </p>
              </IonLabel>
            </IonItem>
          );
        }) : (
            <IonItem>
              <IonLabel>
                <h3>No Buckets yet, create one!</h3>
              </IonLabel>
            </IonItem>
          )}
      </IonList>
    </IonCard>
  )
}