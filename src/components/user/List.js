import React, {useState} from 'react'
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
} from '@ionic/react'
import MdArrowDropleft from 'react-ionicons/lib/MdArrowDropleft'
import routes from '../../conf/routes'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from '../../graphql'

function ListView({setTitle, id}) {
  const {loading, error, data} = useQuery(gql.getListById, { variables: {id: id}, pollInterval: 100})
  const [deleteItem] = useMutation(gql.deleteItem)

  if (loading) {
    setTitle('Loading ...')
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            Loading Lists ...
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  if (error) {
    setTitle('Error!')
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

  setTitle(data.getListById ? data.getListById.title : '')

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
          <IonItemSliding>
            <IonItem>
              <IonLabel>
                <p>From: {item.from.firstName} {item.from.lastName}</p>
                <h3>{item.message}</h3>
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="secondary" onClick={() => {
                deleteItem({variables: {id: item.id}})
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


function List(props) {
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
              routerLink={routes.home}
              className="bl-list-back-btn">
              <MdArrowDropleft /> Back
            </IonButton>
            <IonCard>
              <IonTitle className="bl-list-title">{title}</IonTitle>
              <ListView setTitle={setTitle} id={props.match.params.id}/>
            </IonCard>
            <IonButton color="danger" strong type="button"
              className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn" onClick={() => {
                deleteList({variables: {id: props.match.params.id}})
              }}>
            Delete Bucket
          </IonButton>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(List)
