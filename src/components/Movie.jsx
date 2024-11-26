import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/movies.css';

const Movie = (props) => {
  const { title, overview, voteAverage, voteCount, imageURL, popularity, releaseDate } = props;
  return (
    <div className='movie-card'>
      <Card>
        <Card.Header>Movie Title: {title}</Card.Header>
        <Card.Img 
          variant="top" 
          src={imageURL || "No Image"}
          alt={`image of movie named ${title}` || "No Image"}
        />

        <ListGroup variant="flush">
          <ListGroup.Item>Release Date: {releaseDate}</ListGroup.Item>
          <ListGroup.Item>Overview: {overview}</ListGroup.Item>
          <ListGroup.Item>Popularity: {popularity}</ListGroup.Item>
          <ListGroup.Item>Vote Count: {voteCount}</ListGroup.Item>
          <ListGroup.Item>Vote Average: {voteAverage}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  voteCount: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  releaseDate: PropTypes.string.isRequired,
};
  
export default Movie;