import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Movie from './Movie';

const Movies = (props) => {
  const { movieData } = props;

  // If movieData is empty or undefined, return a fallback placeholder.
  if (!movieData || movieData.length === 0) {
    return <p>No movie data available</p>;
  }

  // Todo - loop through array and display each movie
  // Otherwise, render the data for the first movie
  return (
    <div>
      <p>Movie Title: {movieData[0].title}</p>
      <p>Release Date: {movieData[0].releaseDate}</p>

      <Row className='align-items-center'>
        {movieData.map((movie, index) => (
          <Col key={index + 1} md={3}>
            <Movie 
              title={movie.title} 
              overview={movie.overview} 
              voteAverage={movie.voteAverage}
              voteCount ={movie.voteCount}
              imageURL={movie.imageURL}
              popularity={movie.popularity}
              releaseDate={movie.releaseDate}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

Movies.propTypes = {
  movieData: PropTypes.array.isRequired
};

export default Movies;