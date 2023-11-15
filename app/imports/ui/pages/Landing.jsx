import React, { useState } from 'react';
import SelectSearch from '../components/SelectSearch';
import { Col, Container, Image, Row, Form, Dropdown } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */

const Landing = () => {
    return(
        <div>
            <SelectSearch title="What's Happening in Manoa" />
            <Container>
                <h2>Browse by Category</h2>
                <h2>Browse by Location</h2>
                <h2>Featured Events</h2>
            </Container>
        </div>
    );
}



export default Landing;
