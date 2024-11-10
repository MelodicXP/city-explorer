import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ErrorModal = (props) => {
  const { errorTitle, errorBody } = props;
 
  return (
    <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Error: {errorTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Error Message: {errorBody}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
  );
};

// Define prop types
ErrorModal.propTypes = {
  errorTitle: PropTypes.string.isRequired,
  errorBody: PropTypes.string.isRequired
};

export default ErrorModal;