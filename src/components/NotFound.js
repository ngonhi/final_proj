import React from 'react'
import User from './User/index'

function NotFound(props) {
    return(
    <div>
        <title> Not Found </title>
        <User/>
        <div className='loader'>Page Not Found</div> 
    </div>)
}

export default NotFound