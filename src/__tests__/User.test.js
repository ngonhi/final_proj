import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';

import User from '../components/User/index';

configure({ adapter: new Adapter() });

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
    expect(wrapper.find(Link).at(0).props().to).toBe('/Register');
    expect(wrapper.find(Link).at(1).props().to).toBe('/Login');
  });
});
