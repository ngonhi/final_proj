import React from 'react'
import {Logout} from '../components/user/index'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

describe('<Logout /> shallow rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<Logout />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})