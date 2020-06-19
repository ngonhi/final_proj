import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="button-container">
      <Link to="/user" className="button">User</Link>
      <Link to="/categories" className="button"> Categories </Link>
      <Link to="/" className="button"> Logout </Link>
    </div>
  );
}

export default NavBar;
