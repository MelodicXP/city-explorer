import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const CityInfo = (props) => {
  const { cityName, latitude, longitude, mapImageUrl } = props;

  return (
    <Card style={{ width: '50rem' }}>
      <Card.Img 
        variant="top" 
        src={mapImageUrl || "No Image"}
        alt={`map of ${cityName}` || "No Image"}
      />
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
  longitude: PropTypes.string.isRequired,
  mapImageUrl: PropTypes.string.isRequired
};

export default CityInfo;