import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ErrorModal = (props) => {
  const { errorTitle, errorBody, show, toggleModal } = props;
 
  return (
    <>
      <Modal show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{errorTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={toggleModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Define prop types
ErrorModal.propTypes = {
  errorTitle: PropTypes.string.isRequired,
  errorBody: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ErrorModal;