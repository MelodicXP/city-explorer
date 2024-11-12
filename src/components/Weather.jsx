import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WeatherDay from './WeatherDay';

const Weather = (props) => {
  const { weatherData } = props;

  return (
    <Container>
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
    </Container>
  );
};

Weather.propTypes = {
  weatherData: PropTypes.array.isRequired
};

export default Weather;


