import React, {useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Button} from "../Button";
import {FlashMessageContext} from "../../context/FlashMessageContext";
import "./FlashMessage.scss";

const FlashMessage = ({ show, flashClose, message, messageState }) => {
const[flashMessage,setFlashMessage] = useContext(FlashMessageContext);
  useEffect(() =>{
    if(show){
      setTimeout(() => {
        setFlashMessage({...flashMessage, show: false});
      }, 6000);
    }
  }, []);

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
            <i className={`${fontAwesomeIcon()}`} />
            <div className="text">
                {message}
            </div>
            <Button classes="close-btn" clicked={flashClose}><i className="fas fa-times"/></Button>
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
