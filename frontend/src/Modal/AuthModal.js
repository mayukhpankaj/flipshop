import React from 'react';
import Modal from './Modal';

const AuthModal = props => {
    return (
      <Modal
        onCancel={props.onClear}
        header={props.header}
        show={!!props.content}
      >
        {props.content}
      </Modal>
    );
  };
  
  export default AuthModal;
  