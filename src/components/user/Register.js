import React, { Component } from 'react'

class Register extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const newUser = {
        "username": event.target.elements.username.value,
        "name": event.target.elements.name.value,
        "email": event.target.elements.email.value,
        "password": event.target.elements.password.value
    }

    const url = window.$domain + '/registration'
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
        console.log(this.props.error)
        this.props.history.push('/Registration')
      } else {
      this.props.history.push('/Categories')
      }
    })
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