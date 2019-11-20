import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";

const Modal = props => {
  return (
    <>
      {props.show ? <Backdrop clicked={props.modalClose} /> : null}
      <div
        className="ModalContainer"
        style={{ display: props.show ? "flex" : "none" }}
      >
        <div className="Modal" style={{ opacity: props.show ? "1" : "0" }}>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Modal;
