import React from 'react'
import ReactDOM from 'react-dom'
import Main from '../components/Main'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router';
import { Link } from 'react-router-dom'

import {User, Register, Login} from '../components/user/index'
import {Categories, AddCategory, SingleCat} from '../components/categories/index'

configure({ adapter: new Adapter() })

describe('<Main /> component', () => {
    const props = {
      startLoadingCats: jest.fn().mockResolvedValue({payload: {result: {}}}),
      startLoadingItems: jest.fn().mockResolvedValue({payload: {result: {}}}),
      access_token: '',
      categories: {}
    }
    it('initial loading is false', () => {
      const wrapper = shallow(<Main {...props} />)
      expect(wrapper.state('loading')).toEqual(true)
    })
    it('should have proper snapshot', () => {
      const wrapper = shallow(<Main {...props} />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
    it('h1 contains correct text', () => {
      const wrapper = shallow(<Main {...props} />)
      expect(wrapper.find('h1').text().includes('Categories Catalog')).toBeTruthy()
    })
    it('h1 link to /', () => {
      const wrapper = shallow(<Main {...props} />)
      expect(wrapper.find(Link).props().to).toBe('/')
    })
    it('/ direct to User', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(User)).toHaveLength(1)
      wrapper.unmount()
    })
    it('/Register direct to Register', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Register']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(Register)).toHaveLength(1)
      wrapper.unmount()
    })
    it('/Login direct to Login', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Login']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(Login)).toHaveLength(1)
      wrapper.unmount()
    })
    it('/Categories direct to Categories', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Categories']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(Categories)).toHaveLength(1)
      wrapper.unmount()
    })
    it('/AddCategory direct to AddCategory', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/AddCategory']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(AddCategory)).toHaveLength(1)
      wrapper.unmount()
    })
    it('/Category/:id direct to SingleCat', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Category/:id']}>
          <Main {...props}/>
        </MemoryRouter>
      )
      expect(wrapper.find(SingleCat)).toHaveLength(1)
      wrapper.unmount()
    })
    it('calls componentDidMount', () => {
      jest.spyOn(Main.prototype, 'componentDidMount')
      const wrapper = shallow(<Main {...props}/>)
      expect(Main.prototype.componentDidMount.mock.calls.length).toBe(1)
      expect(props.startLoadingCats).toHaveBeenCalled()
    })
    it('update state after mounting', async() => {
      const wrapper = shallow(<Main {...props}/>)
      await props.startLoadingCats()
      expect(wrapper.state('loading')).toEqual(false)
    })
})