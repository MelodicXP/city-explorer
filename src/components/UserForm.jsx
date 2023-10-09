import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class UserForm extends React.Component {

  constructor(props) {

    super(props); // Activates React.Component
    
    this.state = {

      // Todo - Initialize any needed values here

    };
  }


  // Todo - Function to handle what button does goes here
  handleSubmitButton = (event) => {

    // Retrieve value from dropdown
    let selectedSortValue = event.target.value;

    // Map selected value to numeric value in sortValues ('convert' to number)
    let sortValue = this.sortValues[selectedSortValue];

    // Pass value back to App.jsx via function from App.jsx
    this.props.handleSubmitButton(sortValue); // Todo - function from App goes here

  };

  render() {

    return (
      <>
      <Form.Group className="mb-3">
        <Form.Label>Search: </Form.Label>
        <Form.Control type="email" placeholder="Enter name of city here" />  
      </Form.Group>
      <Button variant="primary" type="submit">Explore</Button>
    </>
      
    );
  }
}

export default UserForm;