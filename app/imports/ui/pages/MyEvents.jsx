import React from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';

/* TODO: Subscribe to events collection and user collection. */
/* TODO: Create cards for associated events. */

const MyEvents = () => (
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
      <h1 className="p-5">MY EVENTS</h1>
    </div>
    {/* TODO: Display subscribed events as cards */}
    <Container>
      <h2 className="p-3">UPCOMING:</h2>
      {/* Sample of a card. */}
      <Row>
        <Card>
          <Card.Header>THE DATE, MAYBE!</Card.Header>
          <Card.Body>
            <Card.Title>An Event!</Card.Title>
            <Card.Text>Here&apos;s some info!</Card.Text>
            <Button variant="outline-primary">See More Info!</Button>
          </Card.Body>
        </Card>
      </Row>
      {/* End of card sample. */}
    </Container>
    <Container>
      <h2 className="p-3">HISTORY:</h2>
    </Container>
  </div>
);

export default MyEvents;
