import React from 'react'
import NavBar from '../NavBar'

function SingleUser(props) {
    const user = props.user
    return (
        <div>
            <title> User </title>
            <NavBar {...props}/>
            <center>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Username:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            </center>
        </div>
    )
}

export default SingleUser