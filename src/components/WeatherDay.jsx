import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/weather.css';

const WeatherDay = (props) => {
  const { date, description, dayNumber } = props;

  return (
    <div className='weather-card'>
      <Card>
        <Card.Header>Forecast Day {dayNumber}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Date: {date}</ListGroup.Item>
          <ListGroup.Item>Desciption: {description}</ListGroup.Item>
          <ListGroup.Item>Maybe other info?</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

WeatherDay.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dayNumber: PropTypes.number.isRequired,

};

export default WeatherDay;