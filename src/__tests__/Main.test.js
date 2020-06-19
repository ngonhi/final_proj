import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Main from '../components/Main';

import { User, Register, Login } from '../components/user/index';
import { Categories, AddCategory, SingleCat } from '../components/categories/index';

configure({ adapter: new Adapter() });

describe('<Main /> component', () => {
  const props = {
    fetchRequestObj: jest.fn().mockResolvedValue({ payload: { result: {} } }),
    categories: {
      total_categories: 1,
      categories: [{
        description: 'Electronics Laptop', updated: null, id: 1, name: 'Laptop', created: null,
      }],
    },
    items: {
      total_items: 1,
      items: [{
        category_id: 1,
        created: null,
        description: 'This is a really good laptop',
        id: 1,
        name: 'DellXPS',
        price: 1500,
        updated: null,
        user_id: 1,
      }],
    },
  };
  it('should have proper snapshot', () => {
    const wrapper = shallow(<Main {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('h1 contains correct text', () => {
    const wrapper = shallow(<Main {...props} />);
    expect(wrapper.find('h1').text().includes('Categories Catalog')).toBeTruthy();
  });
  it('h1 link to /', () => {
    const wrapper = shallow(<Main {...props} />);
    expect(wrapper.find(Link).props().to).toBe('/');
  });
  it('/ direct to User', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('User')).toHaveLength(1);
    wrapper.unmount();
  });
  it('/Register direct to Register', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/register']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('Register')).toHaveLength(1);
    wrapper.unmount();
  });
  it('/Login direct to Login', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('Login')).toHaveLength(1);
    wrapper.unmount();
  });
  it('/Categories direct to Categories', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/categories']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('Categories')).toHaveLength(1);
    wrapper.unmount();
  });
  it('/AddCategory direct to AddCategory', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/addCategory']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('AddCategory')).toHaveLength(1);
    wrapper.unmount();
  });
  it('/Category/:id direct to SingleCat', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/category/:id']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('SingleCat')).toHaveLength(1);
    wrapper.unmount();
  });
  it('route to EditItem', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/category/:cat_id/editItem/:item_id/:index']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('EditItem')).toHaveLength(1);
    wrapper.unmount();
  });
  it('route to AddItem', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/category/:cat_id/addItem']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('AddItem')).toHaveLength(1);
    wrapper.unmount();
  });
  it('route to SingleItem', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/category/:cat_id/item/:item_id']}>
        <Main {...props} />
      </MemoryRouter>,
    );
    expect(wrapper.find('SingleItem')).toHaveLength(1);
    wrapper.unmount();
  });
});
