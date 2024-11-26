import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WeatherDay from './WeatherDay';

const Weather = (props) => {
  const { weatherData } = props;

  // If weatherData is empty or undefined, return a fallback placeholder.
  if (!weatherData || weatherData.length === 0) {
    return <p>No Weather data available</p>;
  }

  return (
      <Row className='align-items-center'>
        {weatherData.map((forecast, index) => (
          <Col key={index + 1} md={3}>
            <WeatherDay 
              date={forecast.date} 
              description={forecast.description} 
              dayNumber={index + 1}
            />
          </Col>
        ))}
      </Row>
  );
};

Weather.propTypes = {
  weatherData: PropTypes.array.isRequired
};

export default Weather;


