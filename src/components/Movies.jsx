import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Movie from './Movie';


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
          <Row className='row'>
          {serverMovieResponseData.map((item, index) => (
              // Movie component here
              <Movie
                key={index}
                title={item.title}
                overview={item.overview}
                voteAverage={item.voteAverage}
                voteCount={item.voteCount}
                popularity={item.popularity}
                releaseDate={item.releaseDate}
                imageURL={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item.imageURL}`}
              />
            ))}
          </Row>
        </Container>

      </>
                
    );

  }
}

export default Movies;