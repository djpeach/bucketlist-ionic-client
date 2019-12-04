import React from 'react'
import { shallow } from 'enzyme'
import firebase from 'firebase'
import keys from '../../conf/keys'
import routes from '../../conf/routes'


firebase.initializeApp(keys.firebaseConfig)

import Dashboard from './Dashboard'

let wrapper
let state

describe('Dashboard unit tests', () => {
  beforeEach(() => {
    wrapper = shallow(<Dashboard />)
  })
  it('should render', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('redirects to login if not logged in', () => {
    expect(wrapper.find('Redirect').prop('to')).toBe("/auth/login")
  })
})
