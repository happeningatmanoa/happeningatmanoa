import React, { useState } from 'react';
import SelectSearch from '../components/SelectSearch';
import { Card, Col, Container, Image, Row, Form, Dropdown } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */

const Landing = () => {
    return(
        <div>
            <SelectSearch title="What's Happening in Manoa" />
            <Container className="pb-5">
              <Row className="pt-5 pb-3">
                <Col sm={8}>
                  <h2>Browse by Category</h2>
                </Col>
                <Col sm={4} className="justify-content-end text-end">
                  <p>View All (10)</p>
                </Col>
              </Row>

              {/* Category Card Carousel */}
              {/* TODO: Implement images and data from database */}
              {/* TODO: Implement Carousel */}
              <Row>
                <Col md={3}>
                  <Card style={{ width: "18rem", border: "none"}}>
                    <Card.Img variant="top" style={{ backgroundColor: "black", width: "18rem", height: "13rem", borderRadius: "10px" }} />
                    <Card.Body>
                      <Card.Title><b>MUSIC & CONCERTS</b></Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card style={{ width: "18rem", border: "none"}}>
                    <Card.Img variant="top" style={{ backgroundColor: "black", width: "18rem", height: "13rem", borderRadius: "10px" }} />
                    <Card.Body>
                      <Card.Title><b>ACTIVITIES</b></Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card style={{ width: "18rem", border: "none"}}>
                    <Card.Img variant="top" style={{ backgroundColor: "black", width: "18rem", height: "13rem", borderRadius: "10px" }} />
                    <Card.Body>
                      <Card.Title><b>SPORTS</b></Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card style={{ width: "18rem", border: "none"}}>
                    <Card.Img variant="top" style={{ backgroundColor: "black", width: "18rem", height: "13rem", borderRadius: "10px" }} />
                    <Card.Body>
                      <Card.Title><b>EDUCATIONAL</b></Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Venue Card Carousel */}
              {/* TODO: Implement images and data from database */}
              {/* TODO: Implement Carousel */}
              <Row className="pt-5 pb-3">
                <Col sm={8}>
                  <h2>Browse by Venue</h2>
                </Col>
                <Col sm={4} className="justify-content-end text-end">
                  <p>View All (10)</p>
                </Col>
              </Row>
                <Row>
                  <Col md={3}>
                    <Card style={{ width: "18rem", border: "none"}}>
                      <Card.Img variant="top" style={{ backgroundColor: "black", width: "18rem", height: "13rem", borderRadius: "10px" }} />
                      <Card.Body>
                        <Card.Title><b>CAMPUS CENTER</b></Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card style={{ width: "18rem", border: "none"}}>
                      <Card.Img variant="top" style={{ backgroundColor: "black", width: "18rem", height: "13rem", borderRadius: "10px" }} />
                      <Card.Body>
                        <Card.Title><b>RISE CO-WORKING</b></Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card style={{ width: "18rem", border: "none"}}>
                      <Card.Img variant="top" style={{ backgroundColor: "black", width: "18rem", height: "13rem", borderRadius: "10px" }} />
                      <Card.Body>
                        <Card.Title><b>T.C CHING FIELD</b></Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card style={{ width: "18rem", border: "none"}}>
                      <Card.Img variant="top" style={{ backgroundColor: "black", width: "18rem", height: "13rem", borderRadius: "10px" }} />
                      <Card.Body>
                        <Card.Title><b>SHIDLER COLLEGE OF BUSINESS</b></Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="pt-5 pb-3">
                  <h2>Featured Events</h2>
                </Row>
                <Row>
                  <div
                    className="p-5 text-center bg-image"
                    style={{ backgroundColor: "black", height: '30rem', backgroundSize: "cover", borderRadius: "10px" }}
                  ></div>
                </Row>
            </Container>
        </div>
    );
}



export default Landing;
