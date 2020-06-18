import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Logout extends Component {
    state = {navigate: false}

    logout = () => {
        localStorage.clear()
        this.setState({navigate: true})
        this.props.userLogout()
        this.props.history.push('/')
    }

    render() {
        return <button className='logout-button' onClick={this.logout}> Log Out </button>
    }
}

export default Logout
//https://dev.to/calier/implementing-client-side-logout-with-react-router-v4-3a84