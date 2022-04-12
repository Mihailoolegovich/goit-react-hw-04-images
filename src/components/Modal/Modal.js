import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ activeModal, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        activeModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  function handleBackdropClick(e) {
    if (e.currentTarget === e.target) {
      activeModal();
    }
  }

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: propTypes.element,
  activeModal: propTypes.func,
};
