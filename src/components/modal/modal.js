import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, header, onClose } ) => {
  React.useEffect(() => {
    const closeEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeEsc);

    return () => {
      document.removeEventListener('keydown', closeEsc);
    }
  }, []);

  return ReactDOM.createPortal(
    (
      <div className={ modalStyles.container }>
        <div className={ modalStyles.header }>
          <h3 className="text text_type_main-large">{ header }</h3>
          <CloseIcon type="primary" onClick={ onClose } />
        </div>
      { children }
      </div>
    ), 
    modalRoot
  );
} 

Modal.propTypes = {
  children: PropTypes.element,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;