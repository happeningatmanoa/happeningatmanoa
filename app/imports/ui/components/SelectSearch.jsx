import React, { useState } from 'react';
import {Container, Col, Form, Row, Button} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

// component for the Search feature header
// TODO: add search functionality via GET call to database
const SelectSearch = ({title}) => {
    const [categorySelection, setCategorySelection] = useState([]);
    const [locationSelection, setLocationSelection] = useState([]);

    // TODO: pull data from database rather than hardcoded
    const categoryArray = ['Concerts', 'Sports', 'Activities', 'Educational'];
    const locationArray = ['Campus Center', 'RISE Co-Working', 'Frear Dorms', 'Shidler College of Business']

    return(
        <header>

                <div
                    className="p-5 text-center bg-image"
                    style={{ backgroundImage: "url('/images/landing-page-banner-1.png')", height: '50vh', backgroundSize: "cover" }}
                >
                    <h1 style={{ color: 'white' }} className="pt-5"><b>{title.toUpperCase()}</b></h1>
                    <div className="pt-5">
                        <Row className="justify-content-center">
                            <Col sm={2} className="pr-5">
                                <Form.Group>
                                    <Typeahead
                                        id="category-typeahead"
                                        labelKey="name"
                                        onChange={setCategorySelection}
                                        options={categoryArray}
                                        placeholder="Select a category..."
                                        selected={categorySelection}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={2} >
                                <Form.Group>
                                    <Typeahead
                                        id="location-typeahead"
                                        labelKey="name"
                                        onChange={setLocationSelection}
                                        options={locationArray}
                                        placeholder="Select a location..."
                                        selected={locationSelection}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={1} className="pr-5">
                                <Button variant="primary" type="submit">Search</Button>
                            </Col>
                        </Row>
                    </div>
                </div>

        </header>
    );
}

export default SelectSearch;