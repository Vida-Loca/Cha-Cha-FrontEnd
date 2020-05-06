import React from "react";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop";
import {Button} from "../Button";
import "./Modal.scss";

const Modal = ({ show, modalClose, children }) => {
  return (
    <>
      <div className="modal-container" >
        <div className={show ? `modal  modal-open` : `modal`} >
          <Button classes="close-btn" clicked={modalClose}><i className="fas fa-times"/></Button>
          {children}
        </div>
      </div>
      <Backdrop show={show} clicked={modalClose} />
    </>
  );
};

Modal.defaultProps = {
  children: ""
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;
