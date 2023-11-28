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
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
          <br />
          <a href="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>Calendar</a>
          {' '}
          <br />
          <a href="/thisweek" style={{ textDecoration: 'none', color: 'inherit' }}>This Week</a>
          <br />
          <a href="/postevent" style={{ textDecoration: 'none', color: 'inherit' }}>Post an Event</a>
        </Col>
        <Col sm={1}>
          <b>The Team</b>
          {' '}
          <br />
          <a href="https://www.github.com/happeningatmanoa" style={{ textDecoration: 'none', color: 'inherit' }}>Github</a>
          <br />
          <a href="https://www.happeningatmanoa.github.io" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a>
          <br />
          <a href="/contactus" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
