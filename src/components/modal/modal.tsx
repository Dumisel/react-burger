import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

type TModal = {
  children: ReactNode;
  header: string;
  onClose: () => void;
  headerStyle?: string;
};

const modalRoot = document.getElementById('react-modals') as HTMLElement;

export const Modal: FC<TModal> = ({ children, header, onClose, headerStyle }) => {
  React.useEffect(() => {
    const closeEsc = (e: { key: string }) => {
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
      <>
        <ModalOverlay onClick={ onClose } />
        <div className={ modalStyles.container }>
          <div className={ modalStyles.header }>
            <h3 className={ headerStyle || 'text text_type_main-large'}>{ header }</h3>
            <CloseIcon type="primary" onClick={ onClose } />
          </div>
        { children }
        </div>
      </>
    ), 
    modalRoot
  );
} 

export default Modal;