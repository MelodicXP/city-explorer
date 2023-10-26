import React from 'react';
import Col from 'react-bootstrap/Col';

class WeatherDay extends React.Component {

  constructor (props) {

    super(props); // Activates React.Component

  }

  render() {
    const { date, description } = this.props;
    
    return (
      <Col xs={6} md={4} className='forecast-data'>
        <ul className='forecast-data-ul'>
          <li>Date: {date}</li>
          <li>Conditions: {description}</li>
        </ul>
      </Col>
    );
  }
}

export default WeatherDay