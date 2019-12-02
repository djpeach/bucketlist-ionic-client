import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ReactComponent as BucketListIcon } from './bucketlist.svg'
import { list, addCircleOutline, person } from 'ionicons/icons'

import {
  Dashboard,
  List,
  NewSuggestion,
  More,
  Login,
  Register,
  AddFriend,
} from './components'
import routes from './conf/routes'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Custom success theme to work with BucketList logo / colors */
import './css/index.css'

// TODO: Write wrapper component for auth guards

export default function App() {
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <div className="bl-icon-div">
            <BucketListIcon className="bl-svg-icon"/>
          </div>
          <IonTitle className="bl-nav-title">BucketList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path={routes.auth.login} component={Login}/>
            <Route exact path={routes.auth.register} component={Register}/>
            <Route exact path={routes.home} component={Dashboard}/>
            <Route exact path={routes.lists.detail} component={List}/>
            <Route exact path={routes.suggestions.create} component={NewSuggestion}/>
            <Route exact path={routes.more} component={More}/>
            <Route exact path={routes.addFriend} component={AddFriend}/>
            <Redirect exact from={routes.index} to={routes.suggestions.create}/>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="lists" href={routes.home}>
              <IonIcon icon={list}/>
              <IonLabel>Your Lists</IonLabel>
            </IonTabButton>

            <IonTabButton tab="newSuggestion" href={routes.suggestions.create}>
              <IonIcon icon={addCircleOutline}/>
              <IonLabel>New Suggestion</IonLabel>
            </IonTabButton>

            <IonTabButton tab="more" href={routes.more}>
              <IonIcon icon={person}/>
              <IonLabel>Profile &amp; Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}
