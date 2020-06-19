import React from 'react'
import {Link} from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='button-container'>
            <Link to='/categories' className='button'> Categories </Link>
            <Link to='/' className='button'> Logout </Link>
        </div>
    )
}

export default NavBar