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

  componentDidUpdate() {
    // if (this.state.loading && Object.keys(this.props.categories).length !== 0) {
    //   this.setState({loading: false})
    // }

    if (this.state.item_loading && Object.keys(this.props.items).length !== 0) {
      this.setState({item_loading: false})
    }
  }

  setCatId = (id) => {
    this.setState({cat_id: id})
  }


  setLoadingItem = () => {
    this.setState({item_loading: false})
  }

  setLoading = () => {
    this.setState({loading: false})
  }


  render () {
    return (
      <div>
        <h1> <Link to='/'> Categories Catalog </Link> </h1>

        <Route exact path='/' component={User}/>
        
        <Route path='/register' render={() => 
          <Register {...this.props}/>}/>

        <Route path='/login' render={() => 
          <Login {...this.props}/>}/>

        <Route path='/categories' render={() => (
          <Categories loading={this.state.loading} {...this.props} setLoading={this.setLoading} /> 
        )}/>

        <Route path='/addCategory' render = {() => (
          <AddCategory {...this.props}/>
        )}/>

        <Route path='/category/:cat_id/addItem' render = {(params) => 
              <AddItem {...this.props} {...params} cat_id={this.state.cat_id}/>}/> 

        <Route path='/category/:cat_id/editItem/:item_id/:index' render = {(params) => 
              <EditItem {...this.props} {...params} cat_id={this.state.cat_id}/>}/>         

        <Route exact path='/category/:id' render = {(params) =>
          <SingleCat loading={this.state.loading} {...this.props} {...params} 
                     item_loading={this.state.item_loading} setCatId={this.setCatId}
                     setLoadingItem={this.setLoadingItem}/>
        }/>

        <Route path='/category/:cat_id/item/:item_id' render = {(params) =>
          <SingleItem item_loading={this.state.item_loading} {...this.props} {...params} setCatId={this.setCatId}/>
        }/>
      </div>
    )
    }
}

export default Main