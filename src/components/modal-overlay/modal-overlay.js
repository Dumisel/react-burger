import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ onClose }) => {
  return ReactDOM.createPortal(
  (
  <div
    className={modalOverlayStyles.overlay}
    onClick={ onClose }
    onKeyDown={ onClose }
  />),
  modalRoot
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;