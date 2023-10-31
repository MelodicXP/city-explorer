import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Explorer from './Explorer';
import Weather from './Weather';
import Movies from './Movies';
import Modal from 'react-bootstrap/Modal';

const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
const SERVER = import.meta.env.VITE_SERVER;

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    // Initialize states
    this.state = {
      searchQuery: '', // User input
      location: null, // API location data based on query
      staticMapURL: null, // Static map url based on location
      showErrorModal: false, // Show error modal when true
      errorMessage: '', // Show 4xx error message in modal title
      errorMessageBody: '', // Message to show in body of modal
      serverResponseData: [], // Holds forecast data from server
      getForecastDataError: false, // Track errors in getForecastData()
      serverMovieResponseData: [],
    };
  }


  // Function to handle form submission
  handleForm = (event) => {
    
    event.preventDefault();

    const { searchQuery } = this.state;

    // Make API requests
    const us1Url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${searchQuery}&format=json`;
    const eu1Url = `https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${searchQuery}&format=json`;

    // Promise.all() - allows for multiple promises to complete and then proceed with 'then' processing once all promises resolved
    Promise.all([
      this.makeApiRequest(us1Url), 
      this.makeApiRequest(eu1Url)
    ])
      .then( () => {
        
        if (this.state.showErrorModal) { // If showErrorModal true, breakout of function
          return;
        } else { // Else get forecast data
          this.getForecastData() // Make call to server using query data
            .then(() => {
              
              if (this.state.showErrorModal) {
                return;
              } else {
                this.getMovieData(); // Make call to server to get movie data
              }
            });
        }
      });
  };

  // Function to make API request and handle response/error
    makeApiRequest = (url) => {
      return axios.get(url)
        .then((response) => {
          this.setState({ location: response.data[0] }); // Set state of location to first element in response.data array
          this.updateStaticMapURL();

        })
        // Catch error and toggle errorModal
        .catch((error) => {
          this.setState({ 
            errorMessage: error.message, 
            errorMessageBody: error.response.data.error, 
          }); // Capture error message from console log and set to errorMessage variable

          // Check if showErrorModal is already true before toggling it (since passing in two urls)
          if (!this.state.showErrorModal) {
            this.toggleErrorModal();
          }

        });
    };


  // Function - retrieve forecast data from server
  getForecastData = async () => {

    const { location } = this.state; // Access location property/data of this.state.location

    try {
      const response = await axios.get(`${SERVER}/weather?lat=${location.lat}&lon=${location.lon}`);

      const weather = response.data.data;
      const weatherTimeStamp = response.data.timestamp;
      
      // If the request is successful, update the state with the response data
      this.setState({ 
        serverResponseData: weather,
        serverWeatherTimeStamp: weatherTimeStamp, 
        errorMessage: '' });

    } catch (error) {
      // If there's an error, catch it and set errorMessage state
      console.error('Server Error:', error);

      this.setState({ 
        errorMessage: error.message, 
        serverResponseData: [],
        errorMessageBody: error.response.data.error, 
        getForecastDataError: true, // Set getForecastDataError to true
       });

       this.toggleErrorModal();

    }

  };


  // Function - retrieve movie data from server
  getMovieData = async () => {

    const { location } = this.state; // Access location property/data of this.state.location
    let displayName = location.display_name; // Retrieve display name of city (City,County, State)
    let cityNameOnly = displayName.split(',')[0].trim(); // Isolate name of city only, (first word before a comma)


    try {
      const response = await axios.get(`${SERVER}/movies?searchQuery=${cityNameOnly}`);

      const movies = response.data.data;
      const movieTimeStamp = response.data.timestamp;
      
      // If the request is successful, update the state with the response data
      this.setState({ 
        serverMovieResponseData: movies, 
        serverMovieTimestamp: movieTimeStamp,
        errorMessage: '' });

    } catch (error) {
      // If there's an error, catch it and set errorMessage state
      console.error('Server Error:', error);

      this.setState({ 
        errorMessage: error.message, 
        serverResponseData: [],
        errorMessageBody: error.response.data.error, 
        getForecastDataError: true, // Set getForecastDataError to true
       });

       this.toggleErrorModal();

    }

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


  // Update state of query to value of input field (input by user)
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };


  // Function to toggle value of showErrorModal (true and false)
  toggleErrorModal = () => {
    this.setState((prevState) => ({
      showErrorModal: !prevState.showErrorModal,
    }));
  };


  // Function to close modal
  closeModal = () => {
    this.setState({
      showErrorModal: false,
      getForecastDataError: false,
    });
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
              {this.state.errorMessageBody}
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

        <Weather 
        
          serverResponseData={this.state.serverResponseData && this.state.serverResponseData}
          serverWeatherTimeStamp = {this.state.serverResponseData && this.state.serverWeatherTimeStamp}
        
        />

        <Movies 
        
          serverMovieResponseData = {this.state.serverMovieResponseData && this.state.serverMovieResponseData}
          serverMovieTimestamp = {this.state.serverMovieResponseData && this.state.serverMovieTimestamp}
          cityName = {this.state.location && this.state.location.display_name}
        
        />

      </>
    );
  }
}

export default UserForm;