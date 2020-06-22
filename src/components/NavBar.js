import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './User/Logout'

function NavBar(props) {
  return (
    <nav className="button-container">
      <NavLink to="/user" className="button" activeClassName="selected-link">User</NavLink>
      <NavLink to="/categories" className="button" activeClassName="selected-link"> Categories </NavLink>
      <Logout {...props}/>
    </nav>
  );
}

export default NavBar;
