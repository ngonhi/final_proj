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

    this.props.startLoadingToken(newUser, 'registrations', `/Register`, this.props)
  }

  render() {
    return (
      <div>
        <div className='form'>
                <form onSubmit={this.handleSubmit}> 
                    <input type='text' placeholder='username' name='username'></input>
                    <input type='text' placeholder='name' name='name'></input>
                    <input type='text' placeholder='email' name='email'></input>
                    <input type='text' placeholder='password' name='password'></input>
                    <button> Register </button>
                </form>
        </div>
        <div> {this.props.error ? this.props.error.map((value, index) =>
          {return <center><li key={index}>{value}</li></center> }) : null} </div>
      </div>
    )
  }
}

export default Register