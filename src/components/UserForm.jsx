import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Explorer from './Explorer';
import Modal from 'react-bootstrap/Modal';

const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    // Initialize states
    this.state = {
      searchQuery: '', // User input
      location: null, // API location data based on query
      staticMapURL: null, // Static map url based on location
      showErrorModal: false, // Show error modal when true
      errorMessage: '', // Show 4xx error message in modal
    };
  }

  // Function to toggle value of showErrorModal (true and false)
  toggleErrorModal = () => {
    this.setState((prevState) => ({
      showErrorModal: !prevState.showErrorModal,
    }));
  };

  // Function to make API request and handle response/error
  makeApiRequest = (url) => {
    return axios.get(url)
      .then((response) => {
        console.log('SUCCESS!: ', response.data);
        this.setState({ location: response.data[0] }); // Set state of location to first element in response.data array
        this.updateStaticMapURL();
      })
      .catch((error) => {
        console.log('ERROR!:', error);
        this.setState({ errorMessage: error.message }); // Capture error message from console log and set to errorMessage variable

        // Check if showErrorModal is already true before toggling it (since passing in two urls)
        if (!this.state.showErrorModal) {
        this.toggleErrorModal();
      }
      });
  };

  // Function to update staticMapURL based on location
  updateStaticMapURL() {
    const { location } = this.state; // Access location property/data of this.state.location
    if (location) { // If location is truthy, assign latitude and longitude of location to staticMapURL
      this.setState({
        staticMapURL: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=9&size=600x600&markers=icon:large-blue-cutout%7C${location.lat},${location.lon}`,
      });
    }
  }

  // Function to handle form submission
  handleForm = (event) => {
    console.log('Form Submitted');
    event.preventDefault();

    // Make API requests
    const us1Url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`;
    const eu1Url = `https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`;

    // Promise.all() - allows for multiple promises to complete and then proceed with processing once all promises resolved
    Promise.all([this.makeApiRequest(us1Url), this.makeApiRequest(eu1Url)])
  };

  // Update state of query to value of input field (input by user)
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <>
        {/* Run handleForm when user clicks Explore! button */}
        <Form onSubmit={this.handleForm}>

          <Form.Group className="mb-3">
            <Form.Label>
              Search 
            </Form.Label>

            <Form.Control
              onChange={this.handleChange}
              name="city"
              type="text"
              placeholder="Enter name of city here"
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit">
              Explore!
          </Button>

        </Form>

        {/* Show modal when error caught, toggle error modal to false when modal closes */}
        <Modal 
          show={this.state.showErrorModal} 
          onHide={this.toggleErrorModal} 
          className="modal">

          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.errorMessage}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Please enter a valid name of the city.
          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={this.toggleErrorModal}>
              Close
            </Button>
          </Modal.Footer>

        </Modal>

        <Explorer
          displayName={this.state.location && this.state.location.display_name}
          latitude={this.state.location && this.state.location.lat}
          longitude={this.state.location && this.state.location.lon}
          staticMapURL={this.state.location && this.state.staticMapURL}
        />
      </>
    );
  }
}

export default UserForm;