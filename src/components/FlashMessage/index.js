import React from "react";
import PropTypes from "prop-types";
import {Button} from "../Button";
import "./FlashMessage.scss";

const FlashMessage = ({ show, flashClose, message, messageState }) => {

 const fontAwesomeIcon = () =>{
     switch (messageState) {
         case "error":
             return "fas fa-exclamation-circle"
         case "warning":
             return "fas fa-exclamation-triangle"
         case "success":
             return "fas fa-check-circle"
         default:
             return ""
     }
 }

  return (
    <>
      <div className="flash-message-container" >
        <div className={`flash-message ${messageState} ${show ? "flash-message-open" : ""}`} >
          <Button classes="close-btn" clicked={flashClose}><i className="fas fa-times"/></Button>
          <div className="content">
            <i className={`${fontAwesomeIcon()}`} />
            <div className="text">
                {message}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FlashMessage.defaultPropTypes = {
    messageState: ""
}

FlashMessage.propTypes = {
  show: PropTypes.bool.isRequired,
  flashClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  messageState: PropTypes.string

};

export default FlashMessage;
