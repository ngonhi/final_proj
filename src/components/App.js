import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import Categories from './Categories'
import AddCategory from './AddCategory'
import Login from './Login'
import Register from './Register'
import User from './User'

class App extends Component {
  state = {
    categories: {},
    loading: true}

  constructor() {
    super()
  }
  // Load all categories.
  // How to update limit. In API?
  componentDidMount() {
    fetch("http://127.0.0.1:5000/categories?offset=0")
      .then(res => res.json())
      .then(data => {this.setState({categories: data, loading: false})})
      .catch((error) =>  {console.log(error)})
    }

  render () {
        // Categories
        // Single Category
        // Add Category
    return (
      <div>
        <h1> <Link to='/'> Categories Catalog </Link> </h1>

        <Route exact path="/" component={User}/>
        
        <Route path='/Register' component={Register}/>

        <Route path='/Login' component={Login}/>

        <Route path='/Categories' render={() => (
          <div> <Categories loading={this.state.loading} categories={this.state.categories}/> 
        </div> )}/>

        <Route path='/AddCategory' render = {({history}) => (
          <AddCategory onHistory={history}/>
        )}/>

      </div>
    )
    }
}

export default App