import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Weather extends React.Component {
  
  constructor (props) {

    super(props); // Activates React.Component
    

  }

  render () {

     // Write props passed in from parent in one line, instead of 'this.props' everytime used
     let { serverResponseData } = this.props;

    return (
      
      <main>
        {serverResponseData.length > 0 ? (

          <p>Weather Forecast</p>
          
        ) : null}

        <Container>
          <Row>
            {serverResponseData.map((item, index) => (
              <Col xs={6} md={4} key={index} className='forecast-data'>
                <ul>
                  <li>Date: {item.date}</li>
                  <li>Conditions: {item.description}</li>
                </ul>
              </Col>
            ))}
          </Row>
        </Container>

      </main>
                
    );

  }
}

export default Weather;