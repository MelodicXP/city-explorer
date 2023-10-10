import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
import Explorer from './Explorer';
import Modal from 'react-bootstrap/Modal';

class UserForm extends React.Component {

  constructor(props) {

    super(props); // Activates React.Component
    
    this.state = {

      searchQuery: '', // Initialize search value
      location: null, // Initiliaze location as null
      staticMapURL: null, // Initialize map as null
      showErrorModal: false, // Initialize modal as false
      errorMessage: '', // Initialize intial error message (4xx error messages)
    };

  }


  // Function to toggle value of showErrorModal (true and false)
  toggleErrorModal = () => {

    this.setState( (prevState) => ({

      showErrorModal: !prevState.showErrorModal,

    }));

  }


  // Function - If press Explore! and no input value entered by user, toggleErrorModal to value of true, which activates Modal
  // Display console message if connection successful or error occurred and show user message if press Explore! button and no string entered in search box.
  handleForm = (event) => {

    console.log('Form Submitted');

    event.preventDefault();

    axios
      .get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`)

      .then(response => {

        console.log('SUCCESS!: ', response.data);
        this.setState({ location: response.data[0] });
        this.updateStaticMapURL();

      })

      .catch(error => {

        console.log('ERROR!:', error);
        this.setState({ errorMessage: error.message });
        this.toggleErrorModal();

      });

    axios
      .get(`https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`)

      .then(response => {

        console.log('SUCCESS!: ', response.data);
        this.setState({ location: response.data[0] });
        this.updateStaticMapURL();

      })
      
      .catch(error => {
        console.log('ERROR!:', error);
        this.setState({ errorMessage: error.message });
      });

  };

  updateStaticMapURL() {
    // Only build staticMapURL after location is set in state
    const { location } = this.state;
    if (location) {
      this.setState({
        staticMapURL: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=9&size=600x600&markers=icon:large-blue-cutout%7C${location.lat},${location.lon}`,
      });
    }
  }


  // Update state of query to value of input field (input by user)
  handleChange = (event) => {
    this.setState ( { searchQuery: event.target.value} );
  }


  render() {

    return (
      <>

        {/* Form - user click submit, handleChange() take user input/data and pass to handleForm() to retreive map API data*/}
        <Form onSubmit={this.handleForm}>

          <Form.Group className="mb-3">
            <Form.Label>Search </Form.Label>
            <Form.Control onChange={this.handleChange} name="city" type="text" placeholder="Enter name of city here" /> 
          </Form.Group>

          <Button variant="primary" type="submit">Explore!</Button>

        </Form>

        {/* Error Modal - display modal if showErroModal is 'truthy', change back to 'false' on close */}
        <Modal show={this.state.showErrorModal} onHide={this.toggleErrorModal} className="modal">

          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.errorMessage}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Please enter valid name of city
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleErrorModal}>
              Close
            </Button>
          </Modal.Footer>

        </Modal>

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