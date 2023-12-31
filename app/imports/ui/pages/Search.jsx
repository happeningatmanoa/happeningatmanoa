import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Form, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Event';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Search = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, events } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const eventItems = Events.collection.find({}).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  const [filters, setFilters] = useState({ orgName: '', eventName: '', location: '', venue: '', category: '', rsvp: null, startDate: null, endDate: null, link: '', orgEmail: '', images: '' });
  const [data, setData] = useState(events);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filteredData = events;

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filteredData = filteredData.filter(item => item[key].toLowerCase().includes(filters[key].toLowerCase()));
      }
    });

    setData(filteredData);
  };

  useEffect(() => {
    // Apply filters when the data is ready
    if (ready) {
      applyFilters();
    }
  }, [ready, filters, events]);
  const resetFilters = () => {
    setFilters({ orgName: '', eventName: '', location: '', venue: '', category: '', rsvp: null, startDate: null, endDate: null, link: '', orgEmail: '', images: '' });
    setData(events);
  };

  return (ready ? (
    <Container>
      <Form>
        <Row className="py-5">
          <h1 className="text-center">SEARCH</h1>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                className="mt-2"
                type="text"
                name="eventName"
                placeholder="Event Name"
                value={filters.eventName}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                className="mt-2"
                type="text"
                name="orgName"
                placeholder="Organization"
                value={filters.orgName}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Select className="mt-2">
              <option>Location</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select className="mt-2">
              <option>Venue</option>
              <option value="1">On-Campus</option>
              <option value="2">Off-Campus</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              className="mt-2"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option>Category</option>
              <option value="1">Informational</option>
              <option value="2">Cultural</option>
              <option value="3">Job Faire</option>
              <option value="3">Music</option>
              <option value="3">Miscellaneous</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              className="mt-2"
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </Col>
        </Row>
        <Button variant="secondary" className="mt-3" onClick={resetFilters}>Reset Filters</Button>
      </Form>
      <Row className="mt-4">
        {data.map((item, index) => (
          <Col key={index} sm={6} md={4} lg={6} className="mb-4">
            <Card className="h-100 shadow grow-on-hover">
              <Card.Body style={{ color: 'black' }}>
                <Card.Title><h1>{item.eventName}</h1></Card.Title>
                <Card.Text>
                  <h3>{item.orgName}</h3>
                  event info goes here
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Search;
