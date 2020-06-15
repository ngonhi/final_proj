import React, { Component } from 'react'

class Register extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const newUser = {
        "email": event.target.elements.email.value,
        "username": event.target.elements.username.value,
        "password": event.target.elements.password.value,
        "name": event.target.elements.name.value
    }

    this.props.startLoadingToken(newUser, 'registrations', `/Register`, this.props.history)
  }

  render() {
    return (
        <div className='form'>
                <form onSubmit={this.handleSubmit}> 
                    <input type='text' placeholder='username' name='username'></input>
                    <input type='text' placeholder='name' name='name'></input>
                    <input type='text' placeholder='email' name='email'></input>
                    <input type='text' placeholder='password' name='password'></input>
                    <button> Register </button>
                </form>
            </div>
    )
  }
}

export default Register