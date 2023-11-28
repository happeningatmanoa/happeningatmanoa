import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const ContactUs = () => (
  <div>
    <div
      style={{
        backgroundImage: 'url(/images/lowercampus_waikiki.jpg)',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <h1 className="p-5">CONTACT US</h1>
    </div>
    <Container>
      <h3 className="pt-4 text-center">Questions? Email Us!</h3>
      <Row className="p-3">
        <Col className="text-center">
          <h4><a href="mailto:alee91@hawaii.edu">Anthony Lee</a></h4>
        </Col>
        <Col className="text-center">
          <h4><a href="leahyana@hawaii.edu">Leah Yanagisawa</a></h4>
        </Col>
        <Col className="text-center">

          <h4><a href="bcc@hawaii.edu">Benjamin Crawford</a></h4>
        </Col>
      </Row>
      <Row className="p-3">
        <Col className="text-center">
          <h4><a href="em47@hawaii.edu">Erin Murata</a></h4>
        </Col>
        <Col className="text-center">
          <h4><a href="ravenmq@hawaii.edu">Raven Quiddaoen</a></h4>
        </Col>
      </Row>
    </Container>
    <Container>
      <h3 className="pt-4 text-center">Requesting Admin Access (for clubs only)</h3>
      <Row className="p-3">
        <Col className="text-center">
          <h4>All clubs who want to post events, please email one of the emails above with the following information:</h4>
          <h4>Club Name</h4>
          <h4>Club Email (MUST be a hawaii.edu account</h4>
          <h4>Password</h4>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ContactUs;
