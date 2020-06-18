import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Register from '../components/User/Register';

configure({ adapter: new Adapter() });

const props = {
  fetchRequestObj: jest.fn().mockResolvedValue({ payload: { result: {} } }),
  error: [],
};

describe('<Register /> rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<Register />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should call fetchRequestObj when submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<Register {...props} />);
    wrapper.find('form').simulate('submit');

    const inputEle = wrapper.find('input');
    const newUser = {
      username: inputEle.at(0).instance().value,
      name: inputEle.at(1).instance().value,
      email: inputEle.at(2).instance().value,
      password: inputEle.at(3).instance().value,
    };
    const url = `${window.$domain}/registration`;
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    };
    const type = 'START_LOADING_TOKEN';
    expect(props.fetchRequestObj).toHaveBeenCalledTimes(1);
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
