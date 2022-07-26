import React from "react";
import Button from '../FormElements/Button'
import Modal from 'react-bootstrap/Modal'

const ErrorModal = (props) => {
  return (
    <Modal show={!!props.error} onHide={props.onClear}>
        <Modal.Header closeButton>
          <Modal.Title>An error occurred!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.error}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClear}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default ErrorModal;
