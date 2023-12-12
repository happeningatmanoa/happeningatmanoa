import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Event';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

const MyEvents = () => {
  const { ready, events } = useTracker(() => {
    // Get access to Events documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    const allEvents = Events.collection.find({}).fetch();
    return {
      ready: subscription.ready(),
      events: allEvents,
    };
  }, []);
  // Get the event documents for this user.
  const userEvents = events.filter(event => event.rsvpList.includes(Meteor.userId));
  return (ready ? (
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
      <Container className="py-3">
        <Row xs={1} md={2} lg={3} className="g-4">
          {userEvents.map((event, index) => (<Col key={index}><EventCard event={event} /></Col>))}
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default MyEvents;
