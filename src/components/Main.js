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

  constructor() {
    super()
    this.insertToken = this.insertToken.bind(this)
  }
  // Load all categories.
  // How to update limit. In API?
  componentDidMount() {
    this.props.startLoadingCats()
    .then(() => this.setState({loading: false}))
    console.log('mounted')
  }

  insertToken(token) {
    this.setState({access_token: token})
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <h1> <Link to='/'> Categories Catalog </Link> </h1>

        <Route exact path="/" component={User}/>
        
        <Route path='/Register' render={({history}) => 
          <Register {...this.props} onHistory={history} insertToken={this.insertToken}/>}/>

        <Route path='/Login' render={({history}) => 
          <Login {...this.props} onHistory={history} insertToken={this.insertToken}/>}/>

        <Route path='/Categories' render={() => (
          <Categories loading={this.state.loading} categories={this.props.categories}/> 
        )}/>

        <Route path='/AddCategory' render = {({history}) => (
          <AddCategory onHistory={history}/>
        )}/>

        <Route path='/Category/:id' render = {(params) =>// params include id and history
          <Single loading={this.state.loading} {...this.props} {...params}/>
        }/>

      </div>
    )
    }
}

export default Main