import React from 'react';
import {
  IonPage,
  IonContent
} from "@ionic/react";
import authedComponent from "../common/AuthedComponent";

function AddFriend() {

  return (
    <IonPage className="bl-page">
      <IonContent fullscreen>
        <h3>Add Friend</h3>
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(AddFriend);