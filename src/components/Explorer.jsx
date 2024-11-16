import axios from 'axios';
import { useState } from 'react';

import CityInfo from './CityInfo';
import ErrorModal from './ErrorModal';
import Movies from './Movies';
import UserForm from './UserForm';
import Weather from './Weather';
import '../css/explorer.css';

const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

/***************************************************** */
const Explorer = () => {
  // State hooks
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [mapImageUrl, setMapImageUrl] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [errorResponseBody, setErrorResponseBody] = useState('');
  const [show, setShow] = useState(false);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userInput) {
      getLocationInfo(API_KEY, userInput);
    }
  };

  // Function to fetch location info for city (map, weather, movies) based on user input and API key
  const getLocationInfo = async (API_KEY, city) => {
    try {
      // Fetch location data
      const locationInfo = await fetchLocationData(API_KEY, city);

      // Update state based on location data, and return data as object
      const locationObj = updateLocationState(locationInfo); 

      // Fetch weather and movie data
      const weather = await fetchWeatherData(locationObj);
      // Update weather and movie state 
      updateWeatherState(weather);
      
      const movies = await fetchMovieData(locationObj);
      updateMovieState(movies);
      
    } catch (error) {
      // Handle errors
      handleLocationError(error);
    }
  };

  // Function to make API request
  const fetchLocationData = async (API_KEY, city) => {
    // Make API request to get location info
    const API = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${city}&format=json`;
    const response = await axios.get(API);
    return response.data[0];
  };

  // Function to extract and set state from location data
  const updateLocationState = (locationInfo) => {
    // Create a city info object to store all values
    let cityInfoObject = {
      cityName: locationInfo.display_name,
      latitude: locationInfo.lat,
      longitude: locationInfo.lon,
    };

    // Destructure values from the cityInfoObject for easier readability
    const { cityName, latitude, longitude } = cityInfoObject;

    // Update state with data received
    setCityName(cityName);
    setLatitude(latitude);
    setLongitude(longitude);
    
    // Set image url after latitude and longitude are received
    const mapUrl = getMapURL(API_KEY, latitude, longitude);
    setMapImageUrl(mapUrl);
    
    return cityInfoObject; // Return the cityInfoObject with all the necessary details
  };

  // Function to generate map URL based on latitude and longitude
  const getMapURL = (API_KEY, latitude, longitude) => {
    return`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=9&size=600x400&markers=icon:large-blue-cutout%7C${latitude},${longitude}`
  };

  const fetchWeatherData = async (locationObj) => {
    const { cityName, latitude, longitude } = locationObj;
    const cityNameOnly = cityName.split(',')[0].trim(); // Remove city name only (ex. 'Seattle, King County, Washington, USA')

    // Make API request to get forecast info
    const API = `http://localhost:3001/weather?city_name=${cityNameOnly}&lat=${latitude}&lon=${longitude}`;
    const response = await axios.get(API);
    return response.data;
  };

  const fetchMovieData = async (locationObj) => {
    const { cityName } = locationObj;
    const cityNameOnly = cityName.split(',')[0].trim();

    // Make API request to get movie data
    const API = `http://localhost:3001/movies?query=${cityNameOnly}`;
    const response = await axios.get(API);
    return response.data;
  };
   
  // Function to update state of weather
  const updateWeatherState = (weatherInfo) => {
    const weather = weatherInfo;
    setWeatherData(weather);
  };  

  const updateMovieState = (moviesInfo) => {
    const movies = moviesInfo;
    setMovieData(movies);
  };

  // Function to handle errors
  const handleLocationError = (error) => {
    console.error('Error fetching location info:', error);
    setErrorResponse(error.message);
    setErrorResponseBody(error.response?.data?.error || 'An unknown error occurred');
    toggleModal();
  };

  const toggleModal = () => {
    setShow((prevShow) => !prevShow);
  };

  const hasValidCityData = () => {
    return cityName && latitude && longitude && mapImageUrl; // return true only if all values are truthy
  };
  
  return (
    <>
      <div className='form-container'>
        <UserForm 
          handleUserInput={handleUserInput} 
          handleFormSubmit={handleFormSubmit}
          userInput={userInput}
        />
      </div>

      <div className='cityInfo-container'>
        {hasValidCityData() && ( // render city info only if valid city data 
          <CityInfo 
            cityName={cityName} 
            latitude={latitude} 
            longitude={longitude} 
            mapImageUrl={mapImageUrl}
          />
        )}
      </div>

      <div className='weather-container'>
        <Weather 
          weatherData={weatherData}
        />
      </div>

      <div className='movies-container'>
        <Movies movieData={movieData}/>
      </div>

      <div className='modal-container'>
        <ErrorModal 
          errorTitle={errorResponse} 
          errorBody={errorResponseBody} 
          show={show}
          toggleModal={toggleModal}
        />
      </div>  
    </>
  );
};

export default Explorer;

// class UserForm extends React.Component {
//   constructor(props) {
//     super(props);

//     // Initialize states
//     this.state = {
//       searchQuery: '', // User input
//       location: null, // API location data based on query
//       staticMapURL: null, // Static map url based on location
//       showErrorModal: false, // Show error modal when true
//       errorMessage: '', // Show 4xx error message in modal title
//       errorMessageBody: '', // Message to show in body of modal
//       serverResponseData: [], // Holds forecast data from server
//       getForecastDataError: false, // Track errors in getForecastData()
//       serverMovieResponseData: [],
//     };
//   }


//   // Function to handle form submission
//   handleForm = (event) => {
    
//     event.preventDefault();

//     const { searchQuery } = this.state;

//     // Make API requests
//     const us1Url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${searchQuery}&format=json`;
//     const eu1Url = `https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${searchQuery}&format=json`;

//     // Promise.all() - allows for multiple promises to complete and then proceed with 'then' processing once all promises resolved
//     Promise.all([
//       this.makeApiRequest(us1Url), 
//       this.makeApiRequest(eu1Url)
//     ])
//       .then( () => {
        
//         if (this.state.showErrorModal) { // If showErrorModal true, breakout of function
//           return;
//         } else { // Else get forecast data
//           this.getForecastData() // Make call to server using query data
//             .then(() => {
              
//               if (this.state.showErrorModal) {
//                 return;
//               } else {
//                 this.getMovieData(); // Make call to server to get movie data
//               }
//             });
//         }
//       });
//   };

//   // Function to make API request and handle response/error
//     makeApiRequest = (url) => {
//       return axios.get(url)
//         .then((response) => {
//           this.setState({ location: response.data[0] }); // Set state of location to first element in response.data array
//           this.updateStaticMapURL();

//         })
//         // Catch error and toggle errorModal
//         .catch((error) => {
//           this.setState({ 
//             errorMessage: error.message, 
//             errorMessageBody: error.response.data.error, 
//           }); // Capture error message from console log and set to errorMessage variable

//           // Check if showErrorModal is already true before toggling it (since passing in two urls)
//           if (!this.state.showErrorModal) {
//             this.toggleErrorModal();
//           }

//         });
//     };


//   // Function - retrieve forecast data from server
//   getForecastData = async () => {

//     const { location } = this.state; // Access location property/data of this.state.location

//     try {
//       const response = await axios.get(`${SERVER}/weather?lat=${location.lat}&lon=${location.lon}`);

//       const weather = response.data.data;
//       const weatherTimeStamp = response.data.timestamp;
      
//       // If the request is successful, update the state with the response data
//       this.setState({ 
//         serverResponseData: weather,
//         serverWeatherTimeStamp: weatherTimeStamp, 
//         errorMessage: '' });

//     } catch (error) {
//       // If there's an error, catch it and set errorMessage state
//       console.error('Server Error:', error);

//       this.setState({ 
//         errorMessage: error.message, 
//         serverResponseData: [],
//         errorMessageBody: error.response.data.error, 
//         getForecastDataError: true, // Set getForecastDataError to true
//        });

//        this.toggleErrorModal();

//     }

//   };


//   // Function - retrieve movie data from server
//   getMovieData = async () => {

//     const { location } = this.state; // Access location property/data of this.state.location
//     let displayName = location.display_name; // Retrieve display name of city (City,County, State)
//     let cityNameOnly = displayName.split(',')[0].trim(); // Isolate name of city only, (first word before a comma)


//     try {
//       const response = await axios.get(`${SERVER}/movies?searchQuery=${cityNameOnly}`);

//       const movies = response.data.data;
//       const movieTimeStamp = response.data.timestamp;
      
//       // If the request is successful, update the state with the response data
//       this.setState({ 
//         serverMovieResponseData: movies, 
//         serverMovieTimestamp: movieTimeStamp,
//         errorMessage: '' });

//     } catch (error) {
//       // If there's an error, catch it and set errorMessage state
//       console.error('Server Error:', error);

//       this.setState({ 
//         errorMessage: error.message, 
//         serverResponseData: [],
//         errorMessageBody: error.response.data.error, 
//         getForecastDataError: true, // Set getForecastDataError to true
//        });

//        this.toggleErrorModal();

//     }

//   };
  

//   // Function to update staticMapURL based on location
//   updateStaticMapURL() {
//     const { location } = this.state; // Access location property/data of this.state.location
//     if (location) { // If location is truthy, assign latitude and longitude of location to staticMapURL
//       this.setState({
//         staticMapURL: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=9&size=600x600&markers=icon:large-blue-cutout%7C${location.lat},${location.lon}`,
//       });
//     }
//   }


//   // Update state of query to value of input field (input by user)
//   handleChange = (event) => {
//     this.setState({ searchQuery: event.target.value });
//   };


//   // Function to toggle value of showErrorModal (true and false)
//   toggleErrorModal = () => {
//     this.setState((prevState) => ({
//       showErrorModal: !prevState.showErrorModal,
//     }));
//   };


//   // Function to close modal
//   closeModal = () => {
//     this.setState({
//       showErrorModal: false,
//       getForecastDataError: false,
//     });
//   };
  

//   render() {
//     return (
//       <>
//         {/* Run handleForm when user clicks Explore! button */}
//         <Form onSubmit={this.handleForm}>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               Search 
//             </Form.Label>

//             <Form.Control
//               onChange={this.handleChange}
//               name="city"
//               type="text"
//               placeholder="Enter name of city here"
//             />
//           </Form.Group>

//           <Button 
//             variant="primary" 
//             type="submit">
//               Explore!
//           </Button>

//         </Form>

//         {/* Show modal when error caught, toggle error modal to false when modal closes */}
//         <Modal 
//           show={this.state.showErrorModal} 
//           onHide={this.toggleErrorModal} 
//           className="modal">

//           <Modal.Header closeButton>
//             <Modal.Title>
//               {this.state.errorMessage}
//             </Modal.Title>
//           </Modal.Header>

//           <Modal.Body>
//               {this.state.errorMessageBody}
//           </Modal.Body>

//           <Modal.Footer>
//             <Button 
//               variant="secondary" 
//               onClick={this.toggleErrorModal}>
//               Close
//             </Button>
//           </Modal.Footer>

//         </Modal>

//         <Explorer
//           displayName={this.state.location && this.state.location.display_name}
//           latitude={this.state.location && this.state.location.lat}
//           longitude={this.state.location && this.state.location.lon}
//           staticMapURL={this.state.location && this.state.staticMapURL}
//         />

//         <Weather 
        
//           serverResponseData={this.state.serverResponseData && this.state.serverResponseData}
//           serverWeatherTimeStamp = {this.state.serverResponseData && this.state.serverWeatherTimeStamp}
        
//         />

//         <Movies 
        
//           serverMovieResponseData = {this.state.serverMovieResponseData && this.state.serverMovieResponseData}
//           serverMovieTimestamp = {this.state.serverMovieResponseData && this.state.serverMovieTimestamp}
//           cityName = {this.state.location && this.state.location.display_name}
        
//         />

//       </>
//     );
//   }
// }
