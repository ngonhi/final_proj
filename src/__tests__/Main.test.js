import React from 'react'
import ReactDOM from 'react-dom'
import Main from '../components/Main'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router';

import {User, Register, Login} from '../components/user/index'
import {Categories, AddCategory, SingleCat} from '../components/categories/index'

configure({ adapter: new Adapter() })

describe('<Main /> shallow rendering', () => {
    it('should have proper snapshot', () => {
      const wrapper = shallow(<Main startLoadingCats={jest.fn().mockResolvedValue({payload: {result: {}}})} />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
    it('h1 contains correct text', () => {
      const wrapper = shallow(<Main startLoadingCats={jest.fn().mockResolvedValue({payload: {result: {}}})} />)
      expect(wrapper.find('h1').text().includes('Categories Catalog')).toBeTruthy()
    })
    it('/ direct to User', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <Main startLoadingCats={jest.fn().mockResolvedValue({payload: {result: {}}})}/>
        </MemoryRouter>
      )
      expect(wrapper.find(User)).toHaveLength(1)
    })
    it('/Register direct to Register', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Register']}>
          <Main startLoadingCats={jest.fn().mockResolvedValue({payload: {result: {}}})}/>
        </MemoryRouter>
      )
      expect(wrapper.find(Register)).toHaveLength(1)
    })
    it('/Login direct to Login', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Login']}>
          <Main startLoadingCats={jest.fn().mockResolvedValue({payload: {result: {}}})}/>
        </MemoryRouter>
      )
      expect(wrapper.find(Login)).toHaveLength(1)
    })
    it('/Categories direct to Categories', () => {
      const props = {
        startLoadingCats: jest.fn().mockResolvedValue({payload: {result: {}}}),
        access_token: '',
        categories: {}
      }
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Categories']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(Categories)).toHaveLength(1)
    })
    it('/AddCategory direct to AddCategory', () => {
      const props = {
        startLoadingCats: jest.fn().mockResolvedValue({payload: {result: {}}}),
        access_token: '',
        categories: {}
      }
      const wrapper = mount(
        <MemoryRouter initialEntries={['/AddCategory']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(AddCategory)).toHaveLength(1)
    })
    it('/Category/:id direct to SingleCat', () => {
      const props = {
        startLoadingCats: jest.fn().mockResolvedValue({payload: {result: {}}}),
        startLoadingItems: jest.fn().mockResolvedValue({payload: {result: {}}}),
        access_token: '',
        categories: {}
      }
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Category/:id']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(SingleCat)).toHaveLength(1)
    })
})

// describe('<Main /> mount rendering', () => {
//   it('should have proper snapshot', () => {
//     const wrapper = mount(<Main startLoadingCats={jest.fn().mockResolvedValue({payload: {result: {}}})} />)
//     expect(toJson(wrapper)).toMatchSnapshot()
//     wrapper.unmount()
//   })
//   it('h1 contains correct text', () => {
//     const wrapper = mount(<Main startLoadingCats={jest.fn().mockResolvedValue({payload: {result: {}}})} />)
//     expect(wrapper.find('h1').text().includes('Categories Catalog')).toBeTruthy()
//     wrapper.unmount()
//   })
// })