import React from 'react'
import {Login} from '../components/user/index'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

const props = {
  startLoadingToken: jest.fn()
}

describe('<Login /> rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<Login />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
    it('should call startLoadingToken when submit', () => {
      const wrapper = mount(<Login {...props}/>);
      wrapper.find('form').simulate('submit');
      const inputEle = wrapper.find('input')
      const user = {
        "username": inputEle.at(0).instance().value,
        "password": inputEle.at(1).instance().value,
      }
      
      expect(props.startLoadingToken).toHaveBeenCalledTimes(1);
      expect(props.startLoadingToken).toHaveBeenCalledWith(
        user, 'login', `/Login`, props)
      wrapper.unmount()
    })
    it('should contain .form class', () => {
      const wrapper = shallow(<Login/>)
      expect(wrapper.find('.form').exists()).toBeTruthy()
    })
})