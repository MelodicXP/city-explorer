import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
import Explorer from './Explorer';

class UserForm extends React.Component {

  constructor(props) {

    super(props); // Activates React.Component
    
    this.state = {

      searchQuery: '', // Initialize search value
      location: null, // Initiliaze location as null
      staticMapURL: null,

    };

  }


  // Function to get message if connection successful or error occurred
  handleForm = (event) => {

    console.log('Form Submitted');

    event.preventDefault();

    // console.log(API_KEY);

    axios.get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`)
      .then(response => {

        console.log('SUCCESS!: ', response.data);
        this.setState({ location: response.data[0] });
        this.setState( { 
          staticMapURL: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=9&size=600x600&markers=icon:large-blue-cutout%7C${this.state.location.lat},${this.state.location.lon}` 
        } );

      }).catch(error => {

        console.log('ERROR!:', error);

      });

    axios.get(`https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`)
      .then(response => {

        console.log('SUCCESS!: ', response.data);
        this.setState({ location: response.data[0] });
        this.setState( { 
        staticMapURL: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=9&size=600x600&markers=icon:large-blue-cutout%7C${this.state.location.lat},${this.state.location.lon}` 
      } );

      }).catch(error => {
        console.log('ERROR!:', error);
      });

  };


  // Update state of query to value of input field (input by user)
  handleChange = (event) => {
    this.setState ( { searchQuery: event.target.value} );
    console.log(this.state.searchQuery);
  }


  render() {

    return (
      <>
  
        <Form onSubmit={this.handleForm}>

          <Form.Group className="mb-3">
            <Form.Label>Search </Form.Label>
            <Form.Control onChange={this.handleChange} name="city" type="text" placeholder="Enter name of city here" /> 
          </Form.Group>

          <Button variant="primary" type="submit">Explore!</Button>

        </Form>

        <Explorer 

          displayName = {this.state.location && this.state.location.display_name}
          latitude = {this.state.location && this.state.location.lat}
          longitude = {this.state.location && this.state.location.lon}
          staticMapURL = {this.state.location && this.state.staticMapURL}
        />
        
      </>  
    );
  }
}

export default UserForm;