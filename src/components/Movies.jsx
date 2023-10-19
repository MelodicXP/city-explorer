import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Movies extends React.Component {
  
  constructor (props) {

    super(props); // Activates React.Component
    

  }

  render () {

     // Write props passed in from parent in one line, instead of 'this.props' everytime used
     let { serverMovieResponseData, cityName} = this.props;

    return (
      
      <>
        {serverMovieResponseData.length > 0 ? (

          <p>{`Movies set in ${cityName.split(',')[0]}`}</p>
          
        ) : null}

        <Container>
          <Row>
            {serverMovieResponseData.map((item, index) => (
              <Col xs={6} md={6} key={index} className='movie-data'>
                <ul className='forecast-data-ul'>
                  <li>Title: {item.title}</li>
                  <li>Overview: {item.overview}</li>
                  <li>Average Votes: {item.voteAverage}</li>
                  <li>Total Votes: {item.voteCount}</li>
                  <li>Popularity: {item.popularity}</li>
                  <li>Release Date: {item.releaseDate}</li>
                  <li id='movie-li'><img id='movie-image'src= {`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item.imageURL}`} alt={`Movies set in ${cityName.split(',')[0]}`}/></li>
                </ul>
              </Col>
            ))}
          </Row>
        </Container>

      </>
                
    );

  }
}

export default Movies;