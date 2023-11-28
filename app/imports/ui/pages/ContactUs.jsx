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
      <h2 className="pt-4 text-center">Questions? Email Us!</h2>
      <Row className="p-3">
        <Row className="text-center">
          <h4><a href="mailto:alee91@hawaii.edu">Anthony Lee</a></h4>
        </Row>
        <Row className="text-center">
          <h4><a href="mailto:leahyana@hawaii.edu">Leah Yanagisawa</a></h4>
        </Row>
        <Row className="text-center">
          <h4><a href="mailto:bcc@hawaii.edu">Benjamin Crawford</a></h4>
        </Row>
        <Row className="text-center">
          <h4><a href="mailto:em47@hawaii.edu">Erin Murata</a></h4>
        </Row>
        <Row className="text-center">
          <h4><a href="mailto:ravenmq@hawaii.edu">Raven Quiddaoen</a></h4>
        </Row>
      </Row>
    </Container>
    <Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
    <Container>
      <h2 className="pt-4 text-center">Requesting Admin Access (for clubs only)</h2>
      <Row className="p-3">
        <Col className="text-center">
          <h5>All clubs who want to post events, please email one of the emails above with the following information:</h5>
          <h5>1. Club Name</h5>
          <h5>2. Club Email (MUST be a hawaii.edu account) </h5>
          <h5>3. Password</h5>
        </Col>
      </Row>
    </Container>
    <Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  </div>
);

export default ContactUs;
