import React from 'react';
import '../App.css';

const Modal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Please Log In</h2>
        <p>You need to log in to view the photo details.</p>
        <button onClick={() => window.location.href = '/login'}>Go to Login</button>
      </div>
    </div>
  );
};

export default Modal;
