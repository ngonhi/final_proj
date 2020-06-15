import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import Categories from './Categories'
import AddCategory from './AddCategory'
import Login from './Login'
import Register from './Register'
import User from './User'
import Single from './Single'

class Main extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.props.startLoadingCats()
    .then(() => this.setState({loading: false}))
  }

  render () {
    console.log(this.state)
    console.log(this.props)
    return (
      <div>
        <h1> <Link to='/'> Categories Catalog </Link> </h1>

        <Route exact path="/" component={User}/>
        
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

        <Route path='/Category/:id' render = {(params) =>// params include id and history
          <Single loading={this.state.loading} {...this.props} {...params}/>
        }/>
      </div>
    )
    }
}

export default Main