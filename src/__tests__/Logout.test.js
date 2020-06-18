import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Logout from '../components/User/Logout';

configure({ adapter: new Adapter() });

describe('<Logout /> shallow rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<Logout />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should clear localstorage', () => {
    const logout = jest.spyOn(Logout.prototype, 'logout');
    const wrapper = shallow((<Logout />));
    wrapper.find('.logout-button').simulate('click');
    wrapper.update();
    expect(logout).toHaveBeenCalled();
  });
});
