import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'

import AddCategory from './Categories/AddCategory'
import Categories from './Categories/index'
import SingleCat from './Categories/SingleCat'
import User from './User/index'
import Login from './User/Login'
import Register from './User/Register'
import SingleItem from './Items/SingleItem'
import AddItem from './Items/AddItem'
import EditItem from './Items/EditItem'

class Main extends Component {
  state = {
    loading: true,
    item_loading: true,
    cat_id: 0
  }

  constructor() {
    super()
    this.setCatId = this.setCatId.bind(this)
  }
  
  componentDidMount() {
    const url = window.$domain + "/categories/?offset=0"
    this.props.fetchRequestObj("START_LOADING_CATEGORIES", url)
    .then(() => this.setState({loading: false}))
  }

  componentDidUpdate() {
    if (this.state.loading && Object.keys(this.props.categories).length !== 0) {
      this.setState({loading: false})
    }

    if (this.state.item_loading && Object.keys(this.props.items).length !== 0) {
      this.setState({item_loading: false})
    }
  }

  updateStates = () => {
    // if (this.state.cat_id !== 0) { // Add if item is empty then
    //   console.log('load item')
    //   const url = window.$domain + "/categories/" + this.state.cat_id + "/items/?offset=0"
    //   this.props.fetchRequestObj("START_LOADING_ITEMS", url)
    //   .then(() => this.setState({item_loading: false}))
    // }

    if (this.props.access_token && Object.keys(this.props.user).length === 0) {
      console.log('load user')
      const url = window.$domain + '/me' 
      const option = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.props.access_token,
          'Content-Type': 'application/json'
        }
      }
      this.props.fetchRequestObj("START_LOADING_USER", url, option)
    }

  }

  setCatId(id) {
    this.setState({cat_id: id})
  }


  setLoadingItem = () => {
    this.setState({item_loading: false})
  }


  render () {
    this.updateStates()
    console.log(this.props)
    console.log(this.state)
    return (
      <div>
        <h1> <Link to='/'> Categories Catalog </Link> </h1>

        <Route exact path='/' component={User}/>
        
        <Route path='/Register' render={() => 
          <Register {...this.props}/>}/>

        <Route path='/Login' render={() => 
          <Login {...this.props}/>}/>

        <Route path='/Categories' render={() => (
          <Categories loading={this.state.loading} categories={this.props.categories} 
                      access_token={this.props.access_token} history={this.props.history}/> 
        )}/>

        <Route path='/AddCategory' render = {() => (
          <AddCategory {...this.props}/>
        )}/>

        <Route path='/Category/:cat_id/AddItem' render = {(params) => 
              <AddItem {...this.props} {...params} cat_id={this.state.cat_id}/>}/> 

        <Route path='/Category/:cat_id/EditItem/:item_id/:index' render = {(params) => 
              <EditItem {...this.props} {...params} cat_id={this.state.cat_id}/>}/>         

        <Route exact path='/Category/:id' render = {(params) =>
          <SingleCat loading={this.state.loading} {...this.props} {...params} 
                     item_loading={this.state.item_loading} setCatId={this.setCatId}
                     setLoadingItem={this.setLoadingItem}/>
        }/>

        <Route path='/Category/:cat_id/Item/:item_id' render = {(params) =>
          <SingleItem item_loading={this.state.item_loading} {...this.props} {...params} setCatId={this.setCatId}/>
        }/>
      </div>
    )
    }
}

export default Main