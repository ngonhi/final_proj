import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Logout extends Component {
    state = {navigate: false}

    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout() {
        localStorage.clear()
        this.setState({navigate: true})
    }

    render() {
        console.log('Logout')
        if (this.state.navigate) {
            return <Redirect to="/" push={true}/>
        }

        return <button className='logout-button' onClick={this.logout}> Log Out </button>
    }
}

export default Logout
//https://dev.to/calier/implementing-client-side-logout-with-react-router-v4-3a84