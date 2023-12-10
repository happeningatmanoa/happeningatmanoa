import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, DateField, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { connectField } from 'uniforms';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/Event';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  orgName: String,
  eventName: String,
  location: String,
  venue: String,
  category:  {
    type: String,
    allowedValues: ['Educational', 'Sports', 'Activities', 'Cultural', 'Job Faire', 'Music', 'Miscellaneous'],
    defaultValue: 'Miscellaneous',
  },
  rsvp: {
    type: Boolean,
    defaultValue: false,
  },
  startDate: Date,
  endDate: String,
  link: String,
  orgEmail: String,
  thumbnail: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

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

/* Renders the AddEvent page for adding a document. */
const AddEvent = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { orgName, eventName, location, venue, category, rsvp, startDate, endDate, link, orgEmail, thumbnail } = data;
    Events.collection.insert(
      { orgName, eventName, location, venue, category, rsvp, startDate, endDate, link, orgEmail, thumbnail },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  // Insert Field-CodeBlock below when upload implementation is found for thumbnail and image(s)

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>POST YOUR EVENT</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
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
  );
};

export default AddEvent;
