import React, {useRef, useState} from 'react';
import style from './Navbar.module.css';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const adminNavbarref = useRef();
  // const login = useSelector((state) => state.user);
  const [activeLink, setActiveLink] = useState('/admin/books');
  const logout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  const toggler = () => {
    if (adminNavbarref.current.style.width === '200px') {
      adminNavbarref.current.style.width = '0px';
    } else {
      adminNavbarref.current.style.width = '200px';
    }
  };

  return (
    <div ref={adminNavbarref} className={style.adminNavbar}>
      <h3>Admin Panel</h3>
      <div className={style.adminNavToggler} onClick={toggler}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link
            className={`${style.adminNavbarLink} ${
              activeLink === '/admin/books' ? style.active : ''
            }`}
            to="/admin/books"
            onClick={() => setActiveLink('/admin/books')}
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            className={`${style.adminNavbarLink} ${
              activeLink === '/admin/addbook' ? style.active : ''
            }`}
            to="/admin/addbook"
            onClick={() => setActiveLink('/admin/addbook')}
          >
            Add new Book
          </Link>
        </li>
        <li>
          <button
            className={style.adminNavbarLink}
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
