import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import {AddCategory, Categories, SingleCat} from './Categories/index'
import {User, Login, Register} from './User/index'
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
    this.props.startLoadingCats()
    .then(() => this.setState({loading: false}))
    //localStorage.setItem('cat_id', this.state.cat_id)
  }


  // Items are loaded when SingleCat is loaded
  componentDidUpdate() {
    //this.setState({cat_id: localStorage.getItem('cat_id')})
    if (this.state.cat_id !== 0 && Object.keys(this.props.items).length === 0) {
      console.log('loadItems')
      this.props.startLoadingItems(this.state.cat_id)
      .then(() => this.setState({item_loading: false}))
    }
  }

  setCatId(id) {
    //localStorage.clear('cat_id')
    //localStorage.setItem('cat_id', id)
    this.setState({cat_id: id})
  }

  render () {
    console.log('Main')
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
                     item_loading={this.state.item_loading} setCatId={this.setCatId}/>
        }/>

        <Route path='/Category/:cat_id/Item/:item_id' render = {(params) =>
          <SingleItem item_loading={this.state.item_loading} {...this.props} {...params} setCatId={this.setCatId}/>
        }/>
      </div>
    )
    }
}

export default Main