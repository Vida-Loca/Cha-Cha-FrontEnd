import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";

const Modal = ({ show, modalClose, children }) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div
        className="ModalContainer"
        style={{ display: show ? "flex" : "none" }}
      >
        <div className="Modal" style={{ opacity: show ? "1" : "0" }}>
          {children}
        </div>
      </div>
      {show ? <Backdrop clicked={modalClose} /> : null}
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
