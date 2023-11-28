import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const AboutUs = () => (
  <div>
    <div
      style={{
        backgroundImage: 'url(/images/landing-page-banner-1.png)',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <h1 className="p-5">ABOUT US</h1>
    </div>
    <Container>
      <h5 className="pt-4 text-center">Happening At Manoa is an application for members of the UH Manoa community to see what events are going on in their community as well as search for events that aligns with their interests.</h5>
      <h5 className="pb-4 text-center">Our goal is to help build connectivity within the UH Manoa community with an application that will make knowing about and attending events more convenient.</h5>
      <Row className="p-3">
        <Col className="text-center">
          <img src="/images/al-profile.png" width={300} alt="Anthony Lee's Profile" />
          <h4>Anthony Lee</h4>
        </Col>
        <Col className="text-center">
          <img src="/images/ly-profile.png" width={300} alt="Leah Yanagisawa's Profile" />
          <h4>Leah Yanagisawa</h4>
        </Col>
        <Col className="text-center">
          <img src="/images/bc-profile.png" width={300} alt="Benjamin Crawford's Profile" />
          <h4>Benjamin Crawford</h4>
        </Col>
      </Row>
      <Row className="p-3">
        <Col className="text-center">
          <img src="/images/em-profile.png" width={300} alt="Erin Murata's Profile" />
          <h4>Erin Murata</h4>
        </Col>
        <Col className="text-center">
          <img src="/images/rq-profile.png" width={300} alt="Raven Quiddaoen's Profile" />
          <h4>Raven Quiddaoen</h4>
        </Col>
      </Row>
    </Container>
  </div>
);

export default AboutUs;
