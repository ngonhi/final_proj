import React from 'react'
import {Link} from 'react-router-dom'

function User(props) {
    return (
        <div className='button-container'>
            <Link to='/Register' className='button'> Register </Link>
            <Link to='/Login' className='button'> Login </Link>
        </div>
    )
}

export default User