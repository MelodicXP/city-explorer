import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserForm = (props) => {
  const { handleUserInput, handleFormSubmit, userInput } = props;

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter name of city here"
          value={userInput}
          onChange={handleUserInput} 
        />
      </Form.Group>

      <Button variant="primary" type="submit" className='mb-3'>
        Explore!
      </Button>
    </Form>
  );
};

// Define prop types
UserForm.propTypes = {
  handleUserInput: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  userInput: PropTypes.string.isRequired
};
export default UserForm;