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
  thumbnail: {
    type: String,
    optional: true
  },
  images: {
    type: Array,
    optional: true
  },
  'images.$': String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddEvent = () => {

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');

  const uploadImage = async (e) => {
    const file = e.target.files;
    let convertedImages = [];
    for (let i = 0; i < file.length; i++) {
      if (!file[i].type === 'image/png' || file[i].type === 'image/jpeg') {
        swal('Error', 'Please upload a png or jpeg file', 'error');
        return;
      }
      const base64 = await convertBase64(file[i]);
      convertedImages.push(base64);
    }
    setImages(convertedImages);
    //console.log("base64", convertedImages);
  }

  const uploadThumbnail = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setThumbnail(base64);
    //console.log("base64", base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { orgName, eventName, location, venue, category, rsvp, startDate, endDate, link, orgEmail} = data;
    const imagesData = images;
    const thumbnailData = thumbnail;

    if (!Array.isArray(imagesData) || imagesData.length === 0) {
      swal('Error', 'Please upload at least one image', 'error');
      return;
    } else if (thumbnailData === '') {
      swal('Error', 'Please upload a thumbnail', 'error');
      return;
    }

    Events.collection.insert(
      { orgName, eventName, location, venue, category, rsvp, startDate, endDate, link, orgEmail, images: imagesData, thumbnail: thumbnailData },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event added successfully', 'success');
          formRef.reset();
          setImages([]);
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
                <label>Upload Thumbnail</label>
                <input
                  type="file"
                  onChange={(e) => {
                    uploadThumbnail(e);
                  }}
                  accept="image/png, image/jpeg"
                />
                <label>Upload Images</label>
                <input
                    type="file"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    accept="image/png, image/jpeg"
                    multiple
                />
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
