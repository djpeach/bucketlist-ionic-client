import React from 'react'
import {
  IonPage,
  IonRouterLink,
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonText
} from '@ionic/react'
import firebase from 'firebase'
import routes from '../../conf/routes'
import unAuthedComponent from '../common/UnAuthedComponent'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = (event) => {
    console.log('logging in')
    event.preventDefault()
    // TODO: Form validation, check passwords match
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // TODO: Fetch user from server
        this.props.history.push(routes.home)
      })
      .catch((error) => {
        // TODO: User error and IonAlertControl or IonToast to show alert
      })
  }

  onChange = (id, event) => {
    this.setState({
      [id]: event.target.value,
    })
  }

  render() {
    return (
      <IonPage className="bl-page">
        <IonContent className="ion-padding-horizontal">
          <IonRow>
            <IonCol size={12} sizeSm={8} sizeMd={6} offsetSm={2} offsetMd={3}>
              <IonText> Login to BucketList</IonText>
              <form style={{ marginTop: 16 }} onSubmit={this.handleSubmit}>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    required
                    type="email"
                    value={this.state.email}
                    oninput={(e) => this.onChange('email', e)} />
                </IonItem>
                <IonItem className="ion-margin-bottom">
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    required
                    type="password"
                    value={this.state.password}
                    oninput={(e) => this.onChange('password', e)} />
                </IonItem>
                <IonRow className="ion-align-items-center ion-justify-content-between">
                  <IonRouterLink routerLink={routes.auth.register}>
                    Need an account? Register here.
                  </IonRouterLink>
                  <IonButton type="submit" style={{ float: 'right' }}>Login</IonButton>
                </IonRow>
              </form>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    )
  }
}

export default unAuthedComponent(Login)
