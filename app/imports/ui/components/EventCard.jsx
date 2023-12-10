import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const months = ["Jan", "Feb", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

//<Card.Img src={event.thumbnail} alt="Card Image" />
const EventCard = ({ event }) => (
  <Card style={{ height: '30rem', width: '18rem' }}>
    <Card.Header>
      <Card.Title>{event.eventName}</Card.Title>
      <Card.Subtitle>{event.category}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{months[(event.startDate.getMonth())]}, {event.startDate.getDate()} to {months[(event.endDate.getMonth())]}, {event.endDate.getDate() + 1}</Card.Text>
      <p>Ends: {event.startDate.getHours()}:{event.startDate.getMinutes()} (Military Time)</p>
      <Card.Text>At: {event.venue}, {event.location}</Card.Text>
      <a href={event.link}>Link to Event</a>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    location: PropTypes.string,
    venue: PropTypes.string,
    category: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    link: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default EventCard;
