import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const user = {
        "username": event.target.elements.username.value,
        "password": event.target.elements.password.value
    }

    fetch("http://127.0.0.1:5000/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => console.log(data)) // Access token
    .catch(error => console.log(error))

    // Insert users into state
    this.props.history.push(`/Categories`)
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