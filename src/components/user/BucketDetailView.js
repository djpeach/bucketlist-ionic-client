import React, { useState } from 'react'
import authedComponent from '../common/AuthedComponent'
import {
  IonPage,
  IonTitle,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonCol,
  IonButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from '@ionic/react'
import { arrowRoundBack } from 'ionicons/icons'
import MdArrowDropleft from 'react-ionicons/lib/MdArrowDropleft'
import routes from '../../conf/routes'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from '../../graphql'

function BucketView(props) {
  const { loading, error, data } = useQuery(gql.getListById, { variables: { id: props.id }, pollInterval: 100 })
  const [deleteItem] = useMutation(gql.deleteItem)

  if (loading) {
    props.setTitle('Loading ...')
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            Loading Bucket ...
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  if (error) {
    props.setTitle('Error!')
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

  props.setTitle(data.getListById ? data.getListById.title : '')

  if (!data.getListById) {
    return ''
  }

  if (data.getListById.items.length <= 0) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            No Drops in the Bucket yet
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  return (
    <IonList>
      {data.getListById.items.map(item => {
        return (
          <IonItemSliding key={item.id}>
            <IonItem key={item.id}>
              <IonLabel>
                <p>From: {item.from.firstName} {item.from.lastName}</p>
                <h3>{item.message}</h3>
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="primary" onClick={ async () => {
                props.history.push({
                  pathname: routes.drops.create,
                  state: { message: item.message }
                })
                await document.querySelector("ion-item-sliding").closeOpened()
              }}>
                Share
              </IonItemOption>
              <IonItemOption color="secondary" onClick={() => {
                deleteItem({ variables: { id: item.id } })
              }}>
                Complete
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        )
      })}
    </IonList>
  )
};


function Bucket(props) {
  const [title, setTitle] = useState('')
  const [deleteList] = useMutation(gql.deleteList, {
    onCompleted() {
      props.history.push(routes.home)
    }
  })
  return (
    <IonPage className="bl-page">
      <IonContent>
        <IonGrid>
          <IonCol size="12" size-sm="6">
            <IonButton
              color="light"
              type="button"
              routerLink={routes.buckets.list}
              routerDirection="back"
              className="bl-list-back-btn">
              <IonIcon icon={arrowRoundBack} style={{paddingRight: '10px'}}/> Back
            </IonButton>
            <IonCard className="bl-card-padding">
          <h1 style={{ paddingBottom: "20px" }}>{title}</h1>
              <BucketView setTitle={setTitle} id={props.match.params.id} history={props.history} />
            </IonCard>
            <IonButton color="danger" strong type="button"
              className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={() => {
                deleteList({ variables: { id: props.match.params.id } })
              }}>
              Delete Bucket
          </IonButton>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(Bucket)
