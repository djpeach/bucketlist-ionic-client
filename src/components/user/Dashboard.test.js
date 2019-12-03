import React from 'react'
import { shallow } from 'enzyme'
import firebase from 'firebase'
import keys from '../../conf/keys'

firebase.initializeApp(keys.firebaseConfig)

import Dashboard from './Dashboard'

describe('Dashboard unit tests', () => {
  it('should render', () => {
    const component = shallow(<Dashboard />);
    expect(component).toMatchSnapshot();
  })
})
