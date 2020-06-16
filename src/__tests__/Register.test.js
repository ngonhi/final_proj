import React from 'react'
import {Register} from '../components/user/index'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

const props = {
  startLoadingToken: jest.fn(),
  access_token: '',
}

describe('<Register /> rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<Register />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
    it('should call startLoadingToken when submit', () => {
      const handleSubmit = jest.fn();
      const wrapper = mount(<Register {...props}/>);
      wrapper.find('form').simulate('submit');

      const inputEle = wrapper.find('input')
      const newUser = {
        "username": inputEle.at(0).instance().value,
        "name": inputEle.at(1).instance().value,
        "email": inputEle.at(2).instance().value,
        "password": inputEle.at(3).instance().value
      }
      
      expect(props.startLoadingToken).toHaveBeenCalledTimes(1);
      expect(props.startLoadingToken).toHaveBeenCalledWith(
        newUser, 'registrations', `/Register`, props)
      wrapper.unmount()
    })
    it('should contain .form class', () => {
      const wrapper = shallow(<Register/>)
      expect(wrapper.find('.form').exists()).toBeTruthy()
    })
})