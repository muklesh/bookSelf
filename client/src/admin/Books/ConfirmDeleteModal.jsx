import React from 'react';
import Modal from 'react-modal';
import style from './ConfirmDeleteModal.module.css';

Modal.setAppElement('#root'); // Ensure this is set to your app's root element

function ConfirmDeleteModal({isOpen, onRequestClose, onConfirm, bookTitle}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete the book titled <strong>{bookTitle}</strong>?</p>
      <div className={style.buttons}>
        <button onClick={onConfirm} className={style.confirmButton}>Yes, Delete</button>
        <button onClick={onRequestClose} className={style.cancelButton}>Cancel</button>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
