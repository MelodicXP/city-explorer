import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const WeatherDay = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>ForeCast Day Number goes here</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>DATE Goes here</ListGroup.Item>
        <ListGroup.Item>Description goes here</ListGroup.Item>
        <ListGroup.Item>Maybe other info?</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default WeatherDay;