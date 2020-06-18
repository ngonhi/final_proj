import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Items from '../components/Items/index';
import AddItem from '../components/Items/AddItem';
import EditItem from '../components/Items/EditItem';
import Item from '../components/Items/Item';
import SingleItem from '../components/Items/SingleItem';

configure({ adapter: new Adapter() });

const props = {
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
  match: { params: {} },
  category: {
    description: 'Electronics Laptop', updated: null, id: 1, name: 'Laptop', created: null,
  },
  setCatId: jest.fn(),
};

describe('<Items /> shallow rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<Items {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('<AddItem /> shallow rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<AddItem {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('<EditItem /> shallow rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<EditItem {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('<SingleItem /> shallow rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<SingleItem {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
