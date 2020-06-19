import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Categories from '../components/Categories/index';
import AddCategory from '../components/Categories/AddCategory';
import Category from '../components/Categories/Category';
import SingleCat from '../components/Categories/SingleCat';

configure({ adapter: new Adapter() });

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
  match: { params: {} },
  category: {
    description: 'Electronics Laptop', updated: null, id: 1, name: 'Laptop', created: null,
  },
  setCatId: jest.fn(),
  loadCategories: jest.fn(),
  access_token: '10',
};

describe('<Categories /> shallow rendering', () => {
  const wrapper = shallow(<Categories {...props} />);
  it('should have proper snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('calls componentDidMount', () => {
    const spy = jest.spyOn(Categories.prototype, 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalledTimes(1);
    const url = `${window.$domain}/categories/?offset=NaN&limit=undefined`;
    const type = 'START_LOADING_CATEGORIES';
    expect(props.fetchRequestObj).toHaveBeenCalledWith(type, url);
  });
  it('contains pagination', () => {
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });
});

describe('<Category /> shallow rendering', () => {
  const wrapper = shallow(<Category {...props} />);
  it('should have proper snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should contain link', () => {
    expect(wrapper.find('.category')).toHaveLength(1);
  });
  it('should contain class category', () => {
    const cat_id = props.category.id;
    console.log(cat_id);
    expect(wrapper.find('Link').props().to).toBe(`/category/${cat_id}`);
  });
});

describe('<AddCategory /> shallow rendering', () => {
  it('should have proper snapshot', () => {
    const wrapper = shallow(<AddCategory {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('<SingleCat /> shallow rendering', () => {
  const wrapper = shallow(<SingleCat {...props} />);
  it('should have proper snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should setCat after mounting', () => {
    const spy = jest.spyOn(SingleCat.prototype, 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalledTimes(1);
    console.log(wrapper.debug());
    expect(props.setCatId).toHaveBeenCalledTimes(1);
  });
});
