import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WeatherDay from './WeatherDay';


class Weather extends React.Component {
  
  constructor (props) {

    super(props); // Activates React.Component
    

  }

  render () {

     // Write props passed in from parent in one line, instead of 'this.props' everytime used
     let { serverResponseData, serverWeatherTimeStamp} = this.props;
     let date = new Date(serverWeatherTimeStamp);
    // Extract the components of timestamp (timestamp is in ms, convert to readable format)
    let day = date.getDate();       // Day of the month
    let month = date.getMonth() + 1; // Months are zero-based in JS
    let year = date.getFullYear();  // Year

    return (
      
      <main>
        {serverResponseData.length > 0 ? (

          <p>
            {`Weather Forecast as of ${month}/${day}/${year}`} <br />
            {'(weather updates every 24 hours)'}
          </p>
          
        ) : null}

        <Container>
          <Row>
          {serverResponseData.map((item, index) => (
              // WeatherDay component here
              <WeatherDay
                key={index}
                date={item.date}
                description={item.description}
              />
            ))}
          </Row>
        </Container>

      </main>
                
    );

  }
}

export default Weather;