import React, { Component } from 'react'

class Login extends Component {
  state = {
    username: '',
    password: '',
    submit: false
  }

  // After logging in successfully, load the user
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

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  // Handle event when user 'Sign In'
  handleSubmit = (event) => {
    if (Object.keys(this.props.error).length !== 0) {
      this.props.clearError()
    }
    event.preventDefault()

    this.setState({submit: true})
    const {username, password} = event.target.elements
    const user = {
        "username": username.value,
        "password": password.value
    }

    const domain = process.env.REACT_APP_API_URL
    const url = domain + '/login'
    const option = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
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


  // How to show error message
  handleError = (error) => {
    if (Object.keys(error).length !== 0) {
      const message = error.message
      error = <div className='error'> {message} </div>
    } else {
      error = null
    }

    return error
  }


  // Disable submit button when not enough input
  canBeSubmitted = () => {
    const {username, password, submit} = this.state;
    return username.length > 0 && password.length > 0 && !submit;
  }
  

  render() {
    const isEnabled = this.canBeSubmitted()
    let error = this.props.error
    if (error) { error = this.handleError(error) }

    return (
      <div>
        <title> Login </title>
        <div className='form'>
                <form onSubmit={this.handleSubmit}> 
                    <input 
                      type='text' 
                      placeholder='username' 
                      name='username'
                      onChange={this.handleUsernameChange}></input>
                    <input 
                      type='text' 
                      placeholder='password' 
                      name='password'
                      onChange={this.handlePasswordChange}></input>
                    <button disabled={!isEnabled}> Login </button>
                </form>
        </div>
        {error}
      </div>
    )
  }
}

export default Login