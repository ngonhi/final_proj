import React, { Component } from 'react'

class Register extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    submit: false // State to prevent double submission
  }

  componentDidUpdate() {
    if (this.props.accessToken && Object.keys(this.props.user).length === 0) {
      const domain = process.env.REACT_APP_API_URL
      const url = domain + '/me' 
        const option = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + this.props.accessToken,
            'Content-Type': 'application/json'
          }
        }
      this.props.fetchRequestObj("START_LOADING_USER", url, option)
    }
  }

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  // Handle event when user register
  handleSubmit = (event) => {
    if (Object.keys(this.props.error).length !== 0) {
      this.props.clearError()
    }
    event.preventDefault()

    this.setState({submit: true})
    const {username, name, email, password} = event.target.elements
    const newUser = {
        "username": username.value,
        "name": name.value,
        "email": email.value,
        "password": password.value
    }

    const domain = process.env.REACT_APP_API_URL
    const url = domain + '/registrations'
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
      if(Object.keys(this.props.error).length === 0) {
        this.props.history.push('/categories')
      } else {
        this.setState({submit: false})
      }
    })
  }


  // How to show error messages
  handleError = (error) => {
    if (Object.keys(error).length !== 0) {
      const {message, status, statusText} = error
      let mess_list = JSON.stringify(message)
      mess_list = mess_list.replace(/[\[\]{}]/g, '')
      mess_list = mess_list.replace(/[",]/g, ' ')
      error = <div className='error'> {mess_list} </div>
    } else {
      error = null
    }

    return error
  }


  // Disable submit button when not enough input
  canBeSubmitted = () => {
    const {username, name, email, password, submit} = this.state;
    return username.length > 0 && name.length > 0 && email.length > 0 && password.length > 0 && !submit;
  }


  render() {
    const isEnabled = this.canBeSubmitted()
    let error = this.props.error
    if (error) { error = this.handleError(error) }

    return (
      <div>
        <title> Register </title>
        <div className='form'>
                <form onSubmit={this.handleSubmit}> 
                    <input 
                      type='text' 
                      placeholder='username' 
                      name='username'
                      onChange={this.handleUsernameChange}></input>
                    <input 
                      type='text' 
                      placeholder='name' 
                      name='name'
                      onChange={this.handleNameChange}></input>
                    <input 
                      type='text' 
                      placeholder='email' 
                      name='email'
                      onChange={this.handleEmailChange}></input>
                    <input 
                      type='text' 
                      placeholder='password' 
                      name='password'
                      onChange={this.handlePasswordChange}></input>
                    <button disabled={!isEnabled}> Register </button>
                </form>
        </div>
        {error}
      </div>
    )
  }
}

export default Register