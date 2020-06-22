import React from 'react'
import {Link} from 'react-router-dom'

function User(props) {
    // When going back to homepage, clear all data
    if (props.accessToken) {
        if (props.accessToken.length !== 0) {
            props.userLogout()
        }
    }

    if (props.error) {
        if (Object.keys(props.error).length !== 0) {
            props.clearError()
        }
    }

    
    return (
        <div>
           <title>Multi-Categories Catalog </title>
            <div className='button-container'>
                <Link to='/register' className='button'> Register </Link>
                <Link to='/login' className='button'> Login </Link>
            </div>
        </div>
    )
}

export default User