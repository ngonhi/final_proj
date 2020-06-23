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

  handleValidation = () => {
    let formIsValid = true
    const {username, name, email, password} = this.state
    let errors = {}

    if(!username){
        formIsValid = false;
        errors["username"] = "Username cannot be empty";
    } else if(username.length < 5) {
        formIsValid = false;
        errors["username"] = "Username has to contain at least 5 characters"
    } else if (username.length > 30) {
        formIsValid = false;
        errors["username"] = "Username can only contain at most 30 characters"
    }

    if(!name) {
      formIsValid = false;
      errors["name"] = "Name cannot be empty"
    } else if (name.length > 40) {
      errors["name"] = "Name can only contain at most 40 characters"
    } 

    if(!email) {
      formIsValid = false;
      errors["email"] = "Email cannot be empty"
    }

    if(!password) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty"
    } else if(password.length < 8) {
        formIsValid = false;
        errors["password"] = "Password has to contain at least 8 characters"
    } else if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
        formIsValid = false;
        errors["password"] = "Password has to contain at least one letter and one number"
    }
    
    return {errors, formIsValid}
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
    const {errors, formIsValid} = this.handleValidation();
    const isEnabled = formIsValid && !this.state.submit;
    return {errors, isEnabled};
  }


  render() {
    const {errors, isEnabled} = this.canBeSubmitted()
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
        <div className='error'> {errors.username} </div> <br/><br/>
        <div className='error'> {errors.name} </div> <br/><br/>
        <div className='error'> {errors.email} </div> <br/><br/>
        <div className='error'> {errors.password} </div>
        {error}
      </div>
    )
  }
}

export default Register