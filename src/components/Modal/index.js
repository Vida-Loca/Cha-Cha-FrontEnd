import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";

const Modal = ({ show, modalClose, message, children }) => {
  return (
    <>
      <div
        className="modal-container"
        style={{ display: show ? "flex" : "none" }}
      >
        <div className="modal" style={{ opacity: show ? "1" : "0" }}>
          <div className="flash-message">{message}</div>
          {children}
        </div>
      </div>
      {show ? <Backdrop clicked={modalClose} /> : null}
    </>
  );
};

Modal.defaultProps = {
  children: ""
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Modal;
