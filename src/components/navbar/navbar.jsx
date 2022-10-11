import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link } from 'react-router-dom';

import './navbar.scss';

export function NavBar() {
  let user = localStorage.getItem('user');

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open('/', '_self');
    props.onLoggedOut(user);
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar collapseOnSelect expand="xxl" variant="white">
      <div className='menu-head'>
        <div className='navbar-logo' href='/'>myFlix</div>
        <div className='menu'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'>Menu</Navbar.Toggle>
          <Navbar.Collapse id='responsive-navbar-nav' >
            <Nav className='ml-auto' >
              {isAuth() && (
                <Nav.Link href='/users/:Username'>{user}</Nav.Link>
              )}
              {isAuth() && <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>}
              {!isAuth() && <Nav.Link href='/'>Sign In</Nav.Link>}
              {!isAuth() && <Nav.Link href='/register'>Register</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
}