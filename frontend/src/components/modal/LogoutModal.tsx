import React from 'react';
import Modal from 'react-modal';

type LogoutModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onLogout: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onRequestClose, onLogout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      contentLabel="Logout Modal"
    >
      <h2>Logout Confirmation</h2>
      <p>Are you sure you want to logout?</p>
      <button onClick={onLogout}>Logout</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default LogoutModal;
