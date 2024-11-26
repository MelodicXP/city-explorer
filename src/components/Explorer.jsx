import axios from 'axios';
import { useState } from 'react';

import CityInfo from './CityInfo';
import ErrorModal from './ErrorModal';
import Movies from './Movies';
import UserForm from './UserForm';
import Weather from './Weather';
import '../css/explorer.css';

const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
const SERVER = import.meta.env.VITE_SERVER;

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

  // Handle user input in form
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  }
  
  // Handle when form submitted (starts entire sequence)
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userInput) {
      fetchAndinitializeData(API_KEY, userInput);
    }
  };

  // Fetch location info and initialize data
  const fetchAndinitializeData = async (API_KEY, city) => {
      // Fetch location data (city name, lat, and lon)
      const locationInfo = await fetchLocationData(API_KEY, city);

      // Update state based on location data (return as object)
      const locationObj = updateLocationState(locationInfo); 

      // Fetch related data
      await fetchWeatherAndMovieData(locationObj);
  };

  // Fetch location data
  const fetchLocationData = async (API_KEY, city) => {
    // Make API request to get location info
    try {
      const API = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${city}&format=json`;
      const response = await axios.get(API);
      return response.data[0];
    } catch (error) {
      handleError(error, 'Location Data');
    }
  };

  // Set location state (return data as object)
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

  // Generate map URL based on latitude and longitude
  const getMapURL = (API_KEY, latitude, longitude) => {
    return`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=9&size=600x400&markers=icon:large-blue-cutout%7C${latitude},${longitude}`
  };

  // Fetch related data (weather and movies)
  const fetchWeatherAndMovieData = async (locationObj) => {
      const weather = await fetchWeatherData(locationObj);
      updateWeatherState(weather);
      
      const movies = await fetchMovieData(locationObj);
      updateMovieState(movies);
  };

  const fetchWeatherData = async (locationObj) => {
    const { cityName, latitude, longitude } = locationObj;
    const cityNameOnly = cityName.split(',')[0].trim(); // Remove city name only (ex. 'Seattle, King County, Washington, USA')

    // Make API request to get forecast info
    try {
      const API = `${SERVER}/weather?city_name=${cityNameOnly}&lat=${latitude}&lon=${longitude}`;
      const response = await axios.get(API);
      return response.data;
    } catch (error) {
      handleError(error, 'Weather Data');
    }
  };

  const fetchMovieData = async (locationObj) => {
    const { cityName } = locationObj;
    const cityNameOnly = cityName.split(',')[0].trim();

    // Make API request to get movie data
    try {
      const API = `${SERVER}/movies?query=${cityNameOnly}`;
      const response = await axios.get(API);
      return response.data;
    } catch (error) {
      handleError(error, 'Movie Data');
    }
  };
   
  const updateWeatherState = (weatherInfo) => {
    const weather = weatherInfo;
    setWeatherData(weather);
  };  

  const updateMovieState = (moviesInfo) => {
    const movies = moviesInfo;
    setMovieData(movies);
  };

  // Handle errors
  const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    setErrorResponse(`${context}: ${error.message}`);
    setErrorResponseBody(error.response?.data?.error || 'An unknown error occurred');
    setShow(true); // Explicitly open the modal
  };

  const toggleModal = () => {
    setShow((prevShow) => {
      const newShowState = !prevShow;
      return newShowState;
    });
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
