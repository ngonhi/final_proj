import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Handle submit event when user logs in
  handleSubmit(event) {
    event.preventDefault()
    const user = {
        "username": event.target.elements.username.value,
        "password": event.target.elements.password.value
    }
    this.props.startLoadingToken(user, 'login', `/Login`, this.props)
    //event.target.reset(); // To clear form content
  }
  
  render() {
    return (
      <div>
        <div className='form'>
                <form onSubmit={this.handleSubmit}> 
                    <input type='text' placeholder='username' name='username'></input>
                    <input type='text' placeholder='password' name='password'></input>
                    <button> Login </button>
                </form>
        </div>
        <div> {this.props.error ? this.props.error.map((value, index) =>
          {return <center><li key={index}>{value}</li></center> }) : null} </div>
      </div>
    )
  }
}

export default Login