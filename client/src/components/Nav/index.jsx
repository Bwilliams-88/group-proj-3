// client/src/components/Nav/index.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/login"
          className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/signup"
          className={currentPage === '/signup' ? 'nav-link active' : 'nav-link'}
        >
          Signup  
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/create-event"
          className={currentPage === '/create-event' ? 'nav-link active' : 'nav-link'}
        >
          Create Event
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/cart"
          className={currentPage === '/cart' ? 'nav-link active' : 'nav-link'}
        >
          Cart
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
