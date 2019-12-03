import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea
} from "@ionic/react";
import authedComponent from "../common/AuthedComponent";

function Friends() {
  return (
    <IonPage className="bl-page">
      <IonCard className="bl-card-padding">
        <h1 style={{ paddingBottom: "20px" }}>New Friend</h1>
        <IonItem style={{ marginTop: "20px" }}>
          <IonLabel position="floating"></IonLabel>
          <IonTextarea
            rows={1}
            cols={20}
            autoGrow={true}
            placeholder={"Search by E-mail"}
          ></IonTextarea>
        </IonItem>
        <IonButton style={{ marginTop: '20px' }} onClick={() => {

        }}>
          Search
        </IonButton>
      </IonCard>
    </IonPage>
  );
}

export default authedComponent(Friends);
