import React from 'react'
import {Link} from 'react-router-dom'

function User(props) {
    return (
        <div className='button-container'>
            <Link to='/Register'> <button className='button'> Register </button></Link>
            <Link to='/Login'> <button className='button'> Login </button></Link>
        </div>
    )
}

export default User