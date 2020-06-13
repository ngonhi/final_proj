import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    console.log(this.props)
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
    .then(data => {
      this.props.insertToken(data)
      this.props.onHistory.push(`/Categories`)
    })
    .catch(error => console.log(error.message))
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