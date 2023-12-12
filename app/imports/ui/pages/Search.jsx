import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useLocation } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Form, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Event';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Search = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryParam = queryParams.get('category');
  const locationParam = queryParams.get('location');
  const [categorySelection, setCategorySelection] = useState([]);
  const [locationSelection, setLocationSelection] = useState([]);
  const [venueSelection, setVenueSelection] = useState([]);

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, events } = useTracker(() => {
    const subscription = Meteor.subscribe(Events.userPublicationName);
    const rdy = subscription.ready();

    const eventItems = Events.collection.find({}).fetch();

    if (categoryParam) {
      setCategorySelection([categoryParam]);
    }

    if (locationParam) {
      setLocationSelection([locationParam]);
    }

    return {
      events: eventItems,
      ready: rdy,
    };
  }, [categoryParam, locationParam]);

  const [filters, setFilters] = useState({ orgName: '', eventName: '', location: '', venue: '', category: '', rsvp: null, startDate: null, endDate: null, link: '', orgEmail: '', images: '' });
  const [data, setData] = useState(events);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

  const handleFilterChange = (name, value, type) => {
    if (type === 'text' || type === 'date') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    } else if (type === 'category') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value.length > 0 ? value[0] : '',
      }));
    }
  };

  const handleTypeaheadChange = (name, selected) => {
    switch (name) {
    case 'location':
      setLocationSelection(selected);
      handleFilterChange(name, selected, 'category');
      break;
    case 'venue':
      setVenueSelection(selected);
      handleFilterChange(name, selected, 'category');
      break;
    case 'category':
      setCategorySelection(selected);
      handleFilterChange(name, selected, 'category');
      break;
    default:
      break;
    }
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
    if (ready) {
      handleTypeaheadChange('location', locationSelection);
      handleTypeaheadChange('category', categorySelection);
      // Apply filters when the data is ready
      applyFilters();
    }
  }, [ready, filters, events, categoryParam, locationParam]);
  const resetFilters = () => {
    setFilters({
      orgName: '',
      eventName: '',
      location: '',
      venue: '',
      category: '',
      rsvp: null,
      startDate: null,
      endDate: null,
      link: '',
      orgEmail: '',
      images: '',
    });

    setCategorySelection([]);
    setLocationSelection([]);
    setVenueSelection([]);
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
                onChange={(e) => handleFilterChange(e.target.name, e.target.value, 'text')}
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
                onChange={(e) => handleFilterChange(e.target.name, e.target.value, 'text')}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typeahead
              className="mt-2"
              name="location"
              type="category"
              onChange={(selected) => handleTypeaheadChange('location', selected)}
              options={['Campus Center', 'RISE Co-Working', 'T.C Ching Field', 'Shidler College of Business']}
              placeholder="Select a location..."
              selected={locationSelection}
              value={locationSelection}
            />
          </Col>
          <Col>
            <Typeahead
              className="mt-2"
              name="venue"
              type="category"
              onChange={(selected) => handleTypeaheadChange('venue', selected)}
              options={['On-Campus', 'Off-Campus', 'Online']}
              placeholder="Select a venue..."
              selected={venueSelection}
              value={venueSelection}
            />
          </Col>
          <Col>
            <Typeahead
              className="mt-2"
              name="category"
              type="category"
              onChange={(selected) => handleTypeaheadChange('category', selected)}
              options={['Informational', 'Sports', 'Activities', 'Educational']}
              placeholder="Select a category..."
              selected={categorySelection}
              value={categorySelection}
            />
          </Col>
          <Col>
            <Form.Control
              className="mt-2"
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value, 'date')}
            />
          </Col>
        </Row>
        <Button variant="secondary" className="mt-3" onClick={resetFilters}>Reset Filters</Button>
      </Form>
      <Row className="mt-4">
        {data.map((item, index) => (
          <Col key={index} sm={1} md={2} lg={3} className="mb-4">
            <Card style={{ height: '30rem', width: '18rem' }}>
              <Card.Header>
                <Card.Title>{item.eventName}</Card.Title>
                <Card.Subtitle>{item.category}</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>{months[(item.startDate.getMonth())]}, {item.startDate.getDate()} to {months[(item.endDate.getMonth())]}, {item.endDate.getDate() + 1}</Card.Text>
                <p>Ends: {item.startDate.getHours()}:{item.startDate.getMinutes()} (Military Time)</p>
                <Card.Text>At: {item.venue}, {item.location}</Card.Text>
                <a href={item.link}>Link to Event</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Search;
