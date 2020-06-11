import React, {Component} from 'react'
import Categories from './Categories'
import {Route, Link} from 'react-router-dom'
//import Single from './Single'

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
      fetch("http://127.0.0.1:5000/categories?offset=0&limit=5").
      then(res => res.json()).
      then(data => {this.setState({categories: data, loading: false})}).
      catch((error) =>  {console.log(error)})
    }

    render () {
        // Categories
        // Single Category
        // Add Category
        return (
          <div>
            <h1> <Link to='/'> Categories Catalog </Link> </h1>
            <Route exact path='/' render={() => (
              <div> <Categories loading={this.state.loading} categories={this.state.categories}/> 
              </div> )}/>
          </div>
        )
    }
}

export default App