import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Image, Row, Form, Dropdown } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Event';
import EventCard from '../components/EventCard';
import SelectSearch from '../components/SelectSearch';
import LoadingSpinner from '../components/LoadingSpinner';

/* A simple static component to render some text for the landing page. */

const Landing = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, events } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Event documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Event documents
    const eventItems = Events.collection.find({}).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);
  const random = events[(Math.floor(Math.random() * events.length))];
  return (ready ? (
    <div>
      <SelectSearch title="What's Happening in Manoa"/>
      <Container className="pb-5">
        <Row className="pt-5 pb-3">
          <Col sm={8}>
            <h2>Browse by Category</h2>
          </Col>
          <Col sm={4} className="justify-content-end text-end">
            <a href="/search">View All (10)</a>
          </Col>
        </Row>

        {/* Category Card Carousel */}
        {/* TODO: Implement images and data from database */}
        {/* TODO: Implement Carousel */}
        <Row>
          <Col md={3}>
            <Card style={{ width: '18rem', border: 'none' }}>
              <a href="/search"><Card.Img variant="top" src="/images/concert.jpg" style={{ width: '18rem', height: '13rem', borderRadius: '10px' }} /></a>
              <Card.Body>
                <Card.Title><b>MUSIC & CONCERTS</b></Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: '18rem', border: 'none' }}>
              <a href="/search"><Card.Img variant="top" src="/images/activities.jpg" style={{ width: '18rem', height: '13rem', borderRadius: '10px' }} /></a>
              <Card.Body>
                <Card.Title><b>ACTIVITIES</b></Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: '18rem', border: 'none' }}>
              <a href="/search"><Card.Img variant="top" src="/images/sports.jpg" style={{ width: '18rem', height: '13rem', borderRadius: '10px' }} /></a>
              <Card.Body>
                <Card.Title><b>SPORTS</b></Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: '18rem', border: 'none' }}>
              <a href="/search"> <Card.Img variant="top" src="/images/educational.jpg" style={{ width: '18rem', height: '13rem', borderRadius: '10px' }} /></a>
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
            <a href="/search">View All (10)</a>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Card style={{ width: '18rem', border: 'none' }}>
              <a href="/search"><Card.Img variant="top" src="/images/campus-center.jpg" style={{ width: '18rem', height: '13rem', borderRadius: '10px' }} /></a>
              <Card.Body>
                <Card.Title><b>CAMPUS CENTER</b></Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: '18rem', border: 'none' }}>
              <a href="/search"><Card.Img variant="top" src="/images/rise-coworking.jpg" style={{ width: '18rem', height: '13rem', borderRadius: '10px' }} /></a>
              <Card.Body>
                <Card.Title><b>RISE CO-WORKING</b></Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: '18rem', border: 'none' }}>
              <a href="/search"><Card.Img variant="top" src="/images/tc-ching-complex.jpg" style={{ width: '18rem', height: '13rem', borderRadius: '10px' }} /></a>
              <Card.Body>
                <Card.Title><b>T.C CHING FIELD</b></Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: '18rem', border: 'none' }}>
              <a href="/search"><Card.Img variant="top" src="/images/shidler.jpg" style={{ width: '18rem', height: '13rem', borderRadius: '10px' }} /></a>
              <Card.Body>
                <Card.Title><b>SHIDLER COLLEGE OF BUSINESS</b></Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {events.length > 0 ? (
          <div>
            <Row className="pt-5 pb-3">
              <h2>Featured Event</h2>
            </Row>
            <Row>
                <div
                  className="bg-image"
                  style={{
                    backgroundColor: 'black',
                    backgroundImage: random.thumbnail,
                    height: '30rem',
                    backgroundSize: 'cover',
                    borderRadius: '10px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <EventCard event={random} />
                </div>
            </Row>
          </div>
        ) : (null)}
      </Container>
    </div>
  ) : <LoadingSpinner/>);
};

export default Landing;
