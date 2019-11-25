import React from "react";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";

const Modal = ({ show, modalClose, children }) => {
  return (
    <>
      {show ? <Backdrop clicked={modalClose} /> : null}
      <div
        className="ModalContainer"
        style={{ display: show ? "flex" : "none" }}
      >
        <div className="Modal" style={{ opacity: show ? "1" : "0" }}>
          {children}
        </div>
      </div>
    </>
  );
};

Modal.defaultPoprs = {
  children: ""
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;
