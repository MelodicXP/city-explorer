import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WeatherDay from './WeatherDay';

const Weather = () => {
  return (
    <Container>
      <Row>
        <Col>
          <WeatherDay />
        </Col>
      </Row>
    </Container>
  );
};

export default Weather;


