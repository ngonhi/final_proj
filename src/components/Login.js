import React, { Component } from 'react'
import Popup from './Popup'

class Login extends Component {
  state = {
    seen: false
  };
  
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.togglePop = this.togglePop.bind(this)
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  handleSubmit(event) {
    console.log(this.props)
    event.preventDefault()

    const user = {
        "username": event.target.elements.username.value,
        "password": event.target.elements.password.value
    }

    this.props.startLoadingToken(user, 'login', `/Login`, this.props.history)
}
    

  render() {
    return (
        <div className='form'>
                <form onSubmit={this.handleSubmit}> 
                    <input type='text' placeholder='username' name='username'></input>
                    <input type='text' placeholder='password' name='password'></input>
                    <button> Login </button>
                </form>
            </div>
    )
  }
}

export default Login