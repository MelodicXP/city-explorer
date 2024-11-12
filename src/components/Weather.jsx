import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WeatherDay from './WeatherDay';

const Weather = (props) => {
  const { date, description } = props;

  return (
    <Container>
      <Row>
        <Col>
          <WeatherDay date={date} description={description} dayNumber='Day 23'/>
        </Col>
      </Row>
    </Container>
  );
};

Weather.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Weather;


