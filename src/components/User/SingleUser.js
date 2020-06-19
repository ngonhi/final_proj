import React from 'react'
import NavBar from '../NavBar'

function SingleUser(props) {
    const user = props.user
    return (
        <div>
            <NavBar {...props}/>
            <center>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            </center>
        </div>
    )
}

export default SingleUser