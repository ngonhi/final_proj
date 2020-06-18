import React, { Component } from 'react'

class Login extends Component {
   handleSubmit = (event) => {
    event.preventDefault()
    const {username, password} = event.target.elements
    const user = {
        "username": username.value,
        "password": password.value
    }

    const url = window.$domain + '/login'
    console.log(url)
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
      if(Object.keys(this.props.error).length !== 0) {
        console.log(this.props.error)
        this.props.history.push('/login')
      } else {
      this.props.history.push('/categories')
      }
    })
    //event.target.reset(); // To clear form content
  }

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
  
  render() {
    let error
    if (this.props.error) {
      if (Object.keys(this.props.error).length !== 0) {
        const {message, status, statusText} = this.props.error
        error = <div className='error'> {status} - {statusText} - {message} </div>
      } else {
        error = null
      }
    }
    return (
      <div>
        <div className='form'>
                <form onSubmit={this.handleSubmit}> 
                    <input type='text' placeholder='username' name='username'></input>
                    <input type='text' placeholder='password' name='password'></input>
                    <button> Login </button>
                </form>
        </div>
        {error}
      </div>
    )
  }
}

export default Login

{/* <div> {this.props.error ? this.props.error.map((value, index) =>
          {return <center><li key={index}>{value}</li></center> }) : null} </div> */}