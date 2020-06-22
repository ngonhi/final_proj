import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {Route, Link, Switch} from 'react-router-dom'
import * as actions from '../redux/actions';

import AddCategory from './Categories/AddCategory'
import Categories from './Categories/index'
import SingleCat from './Categories/SingleCat'
import User from './User/index'
import Login from './User/Login'
import Register from './User/Register'
import SingleUser from './User/SingleUser'
import SingleItem from './Items/SingleItem'
import AddItem from './Items/AddItem'
import EditItem from './Items/EditItem'
import NotFound from './NotFound'

function mapStateToProps(state) {
  return {
    categories: state.categories,
    items: state.items,
    accessToken: state.accessToken,
    error: state.error,
    user: state.user,
  };
}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

class App extends Component {
  state = {
    cat_id: 0
  }

  setCatId = (id) => {
    this.setState({cat_id: id})
  }

  render () {
    return (
    <div>
      <h1> <Link to='/'> Multi-Categories Catalog </Link> </h1>
      <Switch>
        <Route exact path='/' render={() => (
          <User {...this.props}/>)}/>
            
        <Route path='/register' render={() => 
          <Register {...this.props}/>}/>

        <Route path='/login' render={() => 
          <Login {...this.props}/>}/>

        <Route path='/user' render={() => 
          <SingleUser {...this.props}/>}/>

        <Route path='/categories' render={() => 
          <Categories {...this.props}/>}/>

        <Route path='/addCategory' render = {() =>
          <AddCategory {...this.props}/>}/>

        <Route path='/category/:cat_id/addItem' render = {(params) => 
          <AddItem {...this.props} {...params} cat_id={this.state.cat_id}/>}/> 

        <Route path='/category/:cat_id/editItem/:item_id' render = {(params) => 
          <EditItem {...this.props} {...params} cat_id={this.state.cat_id}/>}/>         

        <Route exact path='/category/:id' render = {(params) =>
          <SingleCat {...this.props} {...params} setCatId={this.setCatId}/>}/>

        <Route path='/category/:cat_id/item/:item_id' render = {(params) =>
          <SingleItem {...this.props} {...params} setCatId={this.setCatId}/>}/>

        <Route component={NotFound}/>
      </Switch>
    </div>)
  }
}

App = withRouter(connect(mapStateToProps, mapDispatchtoProps)(App));
export default App;
