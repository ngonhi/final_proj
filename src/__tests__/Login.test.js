import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Login from '../components/User/Login';

configure({ adapter: new Adapter() });

const props = {
  fetchRequestObj: jest.fn().mockResolvedValue({ payload: { result: {} } }),
  error: [],
  clearError: jest.fn(),
};

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

    const domain = process.env.REACT_APP_API_URL
    const url = `${domain}/login`;
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const type = 'START_LOADING_TOKEN';

    expect(props.fetchRequestObj).toHaveBeenCalledTimes(1);
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
