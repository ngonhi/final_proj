import React, { Component } from 'react'
import Popup from './Popup'

class Login extends Component {
  state = {
    seen: false
  };
  
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.togglePop = this.togglePop.bind(this)
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

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
      if ('access_token' in data) {
        this.props.insertToken(data)
        this.props.onHistory.push(`/Categories`) 
      } else {
        console.log(data);
        this.props.onHistory.push(`/Login`);
        //return <div> {data.message} </div>;
        //return <Popup message={data.message} onHistory={this.props.onHistory} toggle={this.togglePop}/>
      }
    })
    .catch(error => console.log(error))
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