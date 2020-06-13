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

    console.log(newUser)
    fetch("http://127.0.0.1:5000/registrations", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
      this.props.insertToken(data)
      this.props.onHistory.push(`/Categories`)
    })
    .catch(error => console.log(error.message)) // Use alert
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