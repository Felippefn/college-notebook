import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className="app-navbar" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className='title-nav'>Basis</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/manage-notes">Notes</Nav.Link>
          <Nav.Link as={Link} to="/schedule">Schedule</Nav.Link>
          <Nav.Link as={Link} to="/event">Events</Nav.Link>
          <Nav.Link as={Link} to="/todo-list">To-do List</Nav.Link>
          {/* <Nav.Link as={Link} to="/list">List</Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
