import React, { Component } from 'react'

class Register extends Component {
  componentDidUpdate() {
    if (this.props.access_token && Object.keys(this.props.user).length === 0) {
    const url = window.$domain + '/me' 
      const option = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.props.access_token,
          'Content-Type': 'application/json'
        }
      }
    this.props.fetchRequestObj("START_LOADING_USER", url, option)
    }
  }

  handleSubmit = (event) => {
    this.props.clearError()
    event.preventDefault()
    const {username, name, email, password} = event.target.elements
    const newUser = {
        "username": username.value,
        "name": name.value,
        "email": email.value,
        "password": password.value
    }

    const url = window.$domain + '/registrations'
    const option = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }
    this.props.fetchRequestObj("START_LOADING_TOKEN", url, option)
    .then(() => {
      if(Object.keys(this.props.error).length !== 0) {
        this.props.history.push('/register')
      } else {
      this.props.history.push('/categories')
      }
    })
  }

  handleError = (error) => {
    if (Object.keys(error).length !== 0) {
      const {message, status, statusText} = error
      const mess_list = Object.values(message)
      error = <div className='error'> {status} - {statusText} - {mess_list.join(' ')} </div>
    } else {
      error = null
    }

    return error
  }

  render() {
    let error = this.props.error
    if (error) { error = this.handleError(error) }

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
        {error}
      </div>
    )
  }
}

export default Register