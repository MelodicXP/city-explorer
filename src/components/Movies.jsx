import PropTypes from 'prop-types';

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
    </div>
  );
};

Movies.propTypes = {
  movieData: PropTypes.array.isRequired
};

export default Movies;

// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Movie from './Movie';


// class Movies extends React.Component {
  
//   constructor (props) {

//     super(props); // Activates React.Component
    

//   }

//   render () {

//     // Write props passed in from parent in one line, instead of 'this.props' everytime used
//     let { serverMovieResponseData, cityName, serverMovieTimestamp} = this.props;
//     let date = new Date(serverMovieTimestamp);
//     // Extract the components of timestamp (timestamp is in ms, convert to readable format)
//     let day = date.getDate();       // Day of the month
//     let month = date.getMonth() + 1; // Months are zero-based in JS
//     let year = date.getFullYear();  // Year

//     return (
      
//       <>
//         {serverMovieResponseData.length > 0 ? (
//           <p>
//             {`Movies set in ${cityName.split(',')[0]}`} <br />
//             {`as of ${month}/${day}/${year}`} <br />
//             {'(list updates every 24 hours)'}
//           </p>
//         ) : null}

//         <Container>
//           <Row className='row'>
//           {serverMovieResponseData.map((item, index) => (
//               // Movie component here
//               <Movie
//                 key={index}
//                 title={item.title}
//                 overview={item.overview}
//                 voteAverage={item.voteAverage}
//                 voteCount={item.voteCount}
//                 popularity={item.popularity}
//                 releaseDate={item.releaseDate}
//                 imageURL={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item.imageURL}`}
//               />
//             ))}
//           </Row>
//         </Container>

//       </>
                
//     );

//   }
// }

// export default Movies;