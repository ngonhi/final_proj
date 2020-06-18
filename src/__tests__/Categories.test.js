import React from 'react'
import Categories from '../components/Categories/index'
import AddCategory from '../components/Categories/AddCategory'
import Category from '../components/Categories/Category'
import SingleCat from '../components/Categories/SingleCat'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

const props = {
    fetchRequestObj: jest.fn().mockResolvedValue({payload: {result: {}}}),
    categories: {
      'total_categories': 1, 
      'categories': [{"description": "Electronics Laptop", "updated": null, id: 1, "name": "Laptop", "created": null}]
    },
    items: {
      'total_items': 1, 
      'items': [{"category_id": 1, "created": null, "description": "This is a really good laptop", "id": 1,
        "name": "DellXPS", "price": 1500, "updated": null, "user_id": 1}]
    },
    match: {"params":{}},
    category: {"description": "Electronics Laptop", "updated": null, id: 1, "name": "Laptop", "created": null},
    setCatId: jest.fn()
  }

describe('<Categories /> shallow rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<Categories {...props}/>)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})

describe('<AddCategory /> shallow rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<AddCategory {...props}/>)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})

describe('<Category /> shallow rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<Category {...props}/>)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})

describe('<SingleCat /> shallow rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<SingleCat {...props}/>)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})