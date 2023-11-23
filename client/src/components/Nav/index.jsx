import { Link, useLocation } from 'react-router-dom';

function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/Home"
          className={currentPage === '/Home' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Login"
          className={currentPage === '/Login' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Signup"
          className={currentPage === '/Signup' ? 'nav-link active' : 'nav-link'}
        >
           Signup  
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Event"
          className={currentPage === '/Event' ? 'nav-link active' : 'nav-link'}
        >
          Event
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
