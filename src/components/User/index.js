import React from 'react'
import {Link} from 'react-router-dom'

function User(props) {
    return (
        <div className='button-container'>
            <Link to='/register' className='button'> Register </Link>
            <Link to='/login' className='button'> Login </Link>
        </div>
    )
}

export default User