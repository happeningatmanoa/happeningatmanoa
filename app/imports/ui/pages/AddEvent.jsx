import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, DateField, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
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
    allowedValues: ['Informational', 'Cultural', 'Job Faire', 'Music', 'Miscellaneous'],
    defaultValue: 'Miscellaneous',
  },
  rsvp: Boolean,
  startDate: Date,
  endDate: String,
  link: String,
  orgEmail: String,
  
  /* Insert thumbnail value here when upload implementation exists
  Insert image value(s) here when upload implementation exists
   */
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddEvent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  }

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { orgName, eventName, location, venue, category, rsvp, startDate, endDate, link, orgEmail } = data;

    const fileInput = document.getElementById('inputFile');
    const files = fileInput.files;

    Meteor.call('imageUpload', orgName, eventName, files, (error, imageUrls) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
          const eventData = {
            orgName,
            eventName,
            location,
            venue,
            category,
            rsvp,
            startDate,
            endDate,
            link,
            orgEmail,
            images: imageUrls,
        };

        Events.collection.insert(eventData, (insertError) => {
          if (insertError) {
            swal('Error', insertError.message, 'error');
          } else {
            swal('Success', 'Event added successfully', 'success');
            formRef.reset();
          }
        });
      }
    }
    );

    /*
    Events.collection.insert(
      { orgName, eventName, location, venue, category, rsvp, startDate, endDate, link, orgEmail },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event added successfully', 'success');
          formRef.reset();
        }
      },
    );
    */
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
                <input type="file" id="inputFile" accept="image/png" />
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
