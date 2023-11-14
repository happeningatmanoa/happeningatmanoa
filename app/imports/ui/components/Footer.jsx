import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col sm={3} className="text-center">
          <h3>HappeningAtManoa</h3>
        </Col>
        <Col sm={3}>
          <b>Quick Links</b>
          {' '}
          <br />
          <a href="/">Home</a>
          <br />
          <a href="/calendar">Calendar</a>
          {' '}
          <br />
          <a href="/thisweek">This Week</a>
          <br />
          <a href="/postevent">Post an Event</a>
        </Col>
        <Col sm={1}>
          <b>The Team</b>
          {' '}
          <br />
          <a href="https://www.github.com/happeningatmanoa">Github</a>
          <br />
          <a href="/aboutus">About Us</a>
          <br />
          <a href="/contactus">Contact Us</a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
