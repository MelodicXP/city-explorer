import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const CityInfo = (props) => {
  const { cityName, latitude, longitude } = props;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{cityName || "Unknown City"}</Card.Title>
        <Card.Text>
          Latitude: {latitude || "N/A"}
          <br />
          Longitude: {longitude || "N/A"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Define prop types
CityInfo.propTypes = {
  cityName: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired
};

export default CityInfo;