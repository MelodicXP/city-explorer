import React from 'react';
import Col from 'react-bootstrap/Col';

class Movie extends React.Component {

  constructor (props) {

    super(props); // Activates React.Component

  }

  render() {
    const { title, overview, voteAverage, voteCount, popularity, releaseDate, imageURL } = this.props;

    return (
      <Col xs={6} md={4} className='movie-data'>
        <ul className='forecast-data-ul'>
          <li id='movie-title'>{title}</li>
          <li>Overview: {overview}</li>
          <li>Average Votes: {voteAverage}</li>
          <li>Total Votes: {voteCount}</li>
          <li>Popularity: {popularity}</li>
          <li>Release Date: {releaseDate}</li>
          <li id='movie-li'><img id='movie-image' src={imageURL} alt={title} /></li>
        </ul>
      </Col>
    );
  }
}

export default Movie