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
     let { serverResponseData, } = this.props;

    return (
      
      <main>
        {serverResponseData.length > 0 ? (

          <p>Weather Forecast</p>
          
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