import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, DateField, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Events } from '../../api/event/Event';
import LoadingSpinner from '../components/LoadingSpinner';
import { connectField } from 'uniforms';

const bridge = new SimpleSchema2Bridge(Events.schema);

function Image({ onChange, value }) {
  return (
    <div className="ImageField">
      <label htmlFor="file-input">
        <div>Choose your Thumbnail</div>
        <img
          alt=""
          src={value || 'https://picsum.photos/150?grayscale'}
          style={{ cursor: 'pointer', width: '150px', height: '150px' }}
        />
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={({ target: { files } }) => {
          if (files && files[0]) {
            onChange(URL.createObjectURL(files[0]));
          }
        }}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  );
}

const ImageField = connectField(Image);

/* Renders the EditStuff page for editing a single document. */
const EditEvent = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Events.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { orgName, eventName, location, venue, category, rsvp, startDate, endDate, link, orgEmail } = data;
    Events.collection.update(_id, { $set: { orgName, eventName, location, venue, category, rsvp, startDate, endDate, link, orgEmail } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Event updated successfully', 'success')));
  };

  // Insert Field-CodeBlock below when upload implementation is found for thumbnail and image(s)
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Event</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="orgName" placeholder="Organization's Name"/>
                <TextField name="eventName" placeholder="Event's Name"/>
                <TextField name="location" placeholder="Location"/>
                <TextField name="venue" placeholder="Venue"/>
                <SelectField name="category" />
                <BoolField name="rsvp" />
                <DateField name="startDate" />
                <DateField name="endDate" />
                <TextField name="link" placeholder="Link to Event Page" />
                <TextField name="orgEmail" placeholder="Organization's Contact E-Mail" />
                <ImageField name="thumbnail" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEvent;
