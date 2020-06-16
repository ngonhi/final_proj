import React from 'react'
import {Register} from '../components/user/index'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

describe('<Register /> shallow rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<Register />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})