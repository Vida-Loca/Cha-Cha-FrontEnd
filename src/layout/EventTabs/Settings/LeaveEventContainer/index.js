import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../components/Button";
import { FormContext } from "../../../../context/FormContext";
import { FlashMessageContext } from "../../../../context/FlashMessageContext";
import { history } from "../../../../Authentication/helper";
import { eventService } from "../../../../Authentication/service";

import "./leaveEvent.scss";

const LeaveEventContainer = ({ eventId }) => {
  const [, setform] = useContext(FormContext);
  const [, setFlashMessage] = useContext(FlashMessageContext);

  const cancelAction = () => {
    setform({ show: false, renderForm: "" });
  };

  const leaveEvent = () => {
    eventService.leaveEvent(eventId)
      .then(() => {
        setform({ show: false, renderForm: "" });
        history.push("/");
        setFlashMessage({
          message: "suceffully left this event",
          show: true,
          messageState: "success",
        });
      }, (err) => {
        console.log(err);
        setFlashMessage({
          message: "error",
          show: true,
          messageState: "error",
        });
      });
  };
  return (
    <div className="leave-event-container">
      <h3>Do you wan to leave th is event ?</h3>
      <div className="leave-btn-group">
        <Button clicked={leaveEvent} classes="btn-blueGradient btn-md">
          YES
        </Button>
        <Button clicked={cancelAction} classes="btn-orangeGradient btn-md">
          NO
        </Button>
      </div>
    </div>
  );
};

LeaveEventContainer.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default LeaveEventContainer;
