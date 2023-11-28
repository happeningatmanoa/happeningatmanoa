import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/"><h2>HappeningAtManoa</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-end ms-5">
            <Nav.Link id="home-nav" as={NavLink} to="/" key="home">Home</Nav.Link>
            <Nav.Link id="calendar-nav" as={NavLink} to="/calendar" key="calendar">Calendar</Nav.Link>
            <Nav.Link id="thisweek-nav" as={NavLink} to="/thisweek" key="thisweek">This Week</Nav.Link>
            <Nav.Link id="postevent-nav" as={NavLink} to="/postevent" key="postevent">Post an Event</Nav.Link>
            {currentUser ? ([
              <Nav.Link id="myevents-nav" as={NavLink} to="/myevents" key="myevent">MyEvents</Nav.Link>,
            ]) : (
              <Nav.Link id="myevents-nav" as={NavLink} to="/signin" key="myevent">MyEvents</Nav.Link>
            )}
            {currentUser ? ([
              <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Stuff</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">List Stuff</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
            <Nav.Link id="contact-nav" as={NavLink} to="/contact" key="contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-login" as={NavLink} to="/signin">
                  <PersonFill />
                  {' '}Login
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-register" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  {' '}Register
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;
