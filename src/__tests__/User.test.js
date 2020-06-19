import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Register from '../components/User/Register';
import Login from '../components/User/Login';

import User from '../components/User/index';

configure({ adapter: new Adapter() });

const props = {
  fetchRequestObj: jest.fn().mockResolvedValue({ payload: { result: {} } }),
  error: [],
  clearError: jest.fn(),
};

describe('<User />', () => {
  const wrapper = shallow(<User />);
  it('should contain button-container element', () => {
    expect(wrapper.find('.button-container').exists()).toBeTruthy();
  });
  it('button-container should contain two children', () => {
    expect(wrapper.find('.button-container').children().length).toBe(2);
  });
  it('should have proper snapshot', () => {
    const wrapper = shallow(<User />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('link should render correctly', () => {
    const wrapper = shallow(<User />);
    expect(wrapper.find(Link).at(0).props().to).toBe('/register');
    expect(wrapper.find(Link).at(1).props().to).toBe('/login');
  });
});


describe('<Login /> rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<Login />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should call fetchRequestObj when submit', () => {
    const wrapper = mount(<Login {...props} />);
    wrapper.find('form').simulate('submit');
    const inputEle = wrapper.find('input');
    const user = {
      username: inputEle.at(0).instance().value,
      password: inputEle.at(1).instance().value,
    };

    const url = `${window.$domain}/login`;
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const type = 'START_LOADING_TOKEN';
    expect(props.fetchRequestObj).toHaveBeenCalledWith(
      type, url, option,
    );
    wrapper.unmount();
  });
  it('should contain .form class', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('.form').exists()).toBeTruthy();
  });
});


describe('<Register /> rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<Register />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should call fetchRequestObj when submit', () => {
    const wrapper = mount(<Register {...props} />);
    wrapper.find('form').simulate('submit');

    const inputEle = wrapper.find('input');
    const newUser = {
      username: inputEle.at(0).instance().value,
      name: inputEle.at(1).instance().value,
      email: inputEle.at(2).instance().value,
      password: inputEle.at(3).instance().value,
    };
    const url = `${window.$domain}/registrations`;
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    };
    const type = 'START_LOADING_TOKEN';
    expect(props.fetchRequestObj).toHaveBeenCalledWith(
      type, url, option,
    );
    wrapper.unmount();
  });
  it('should contain .form class', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('.form').exists()).toBeTruthy();
  });
});
