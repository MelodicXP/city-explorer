import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';


class Explorer extends React.Component {
  
  constructor (props) {

    super(props); // Activates React.Component
    

  }

  render () {

     // Write props passed in from parent in one line, instead of 'this.props' everytime used
     let { displayName, latitude, longitude, staticMapURL } = this.props

    return (
      
      <main>

        <ul className='city-data'>
          <li>{displayName}</li>
            {latitude && <li>latitude: {latitude}</li>}
            {longitude && <li>longitude: {longitude}</li>}
        </ul>

        <Container>
          <Row className='map-row'>
            <Col xs={12} md={12} className='map-column'>

              {staticMapURL && (
                <Image 
                  src={staticMapURL} 
                  alt={`map image of ${displayName}`} 
                  roundedCircle
                  className='map-image'
                />
              )}
        
            </Col>
          </Row> 
        </Container>

      </main>
                
    );

  }
}

export default Explorer;